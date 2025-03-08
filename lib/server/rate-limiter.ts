import { NextRequest } from 'next/server';
import { RateLimitInfo } from '@/types/api';

interface RateLimiterOptions {
  interval: number; // Time window in milliseconds
  uniqueTokenPerInterval?: number; // Max number of unique tokens per interval
}

interface TokenBucket {
  tokens: number;
  lastRefill: number;
}

// In-memory storage for rate limiting
const tokenBuckets = new Map<string, TokenBucket>();
const ipRequests = new Map<string, { count: number; resetTime: number }>();

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of tokenBuckets.entries()) {
    if (now - bucket.lastRefill > 3600000) { // 1 hour
      tokenBuckets.delete(key);
    }
  }
  for (const [ip, data] of ipRequests.entries()) {
    if (now > data.resetTime) {
      ipRequests.delete(ip);
    }
  }
}, 3600000); // Clean up every hour

export function rateLimit(options: RateLimiterOptions) {
  const { interval, uniqueTokenPerInterval = 500 } = options;

  return {
    check: async (
      request: NextRequest,
      limit: number,
      identifier = 'GLOBAL'
    ): Promise<RateLimitInfo> => {
      const ip = request.ip ?? 'unknown';
      const key = `${ip}:${identifier}`;
      const now = Date.now();

      // Get or create token bucket
      let bucket = tokenBuckets.get(key);
      if (!bucket) {
        bucket = {
          tokens: limit,
          lastRefill: now,
        };
        tokenBuckets.set(key, bucket);
      }

      // Calculate tokens to add based on time passed
      const timePassed = now - bucket.lastRefill;
      const tokensToAdd = Math.floor(timePassed * (limit / interval));
      bucket.tokens = Math.min(limit, bucket.tokens + tokensToAdd);
      bucket.lastRefill = now;

      // Check if request can be processed
      if (bucket.tokens < 1) {
        const resetTime = bucket.lastRefill + interval;
        throw new Error('Rate limit exceeded');
      }

      // Consume token
      bucket.tokens -= 1;

      // Track IP-based requests
      const ipData = ipRequests.get(ip) ?? {
        count: 0,
        resetTime: now + interval,
      };
      ipData.count += 1;
      ipRequests.set(ip, ipData);

      // Return rate limit info
      return {
        limit,
        remaining: bucket.tokens,
        reset: bucket.lastRefill + interval,
      };
    },

    isRateLimited: (ip: string): boolean => {
      const data = ipRequests.get(ip);
      if (!data) return false;

      const now = Date.now();
      if (now > data.resetTime) {
        ipRequests.delete(ip);
        return false;
      }

      return data.count >= uniqueTokenPerInterval;
    },
  };
}

// Middleware for rate limiting
export async function rateLimitMiddleware(
  request: NextRequest,
  limit: number,
  interval: number,
  identifier?: string
): Promise<RateLimitInfo> {
  const limiter = rateLimit({ interval });
  return limiter.check(request, limit, identifier);
}

// Helper to get remaining requests
export function getRemainingRequests(ip: string): number {
  const data = ipRequests.get(ip);
  if (!data) return Infinity;

  const now = Date.now();
  if (now > data.resetTime) {
    ipRequests.delete(ip);
    return Infinity;
  }

  return Math.max(0, data.count);
}

// Helper to reset rate limit for an IP
export function resetRateLimit(ip: string): void {
  ipRequests.delete(ip);
  for (const [key] of tokenBuckets.entries()) {
    if (key.startsWith(`${ip}:`)) {
      tokenBuckets.delete(key);
    }
  }
} 