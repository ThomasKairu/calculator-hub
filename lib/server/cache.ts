import { NextRequest } from 'next/server';

interface CacheItem<T> {
  value: T;
  expiry: number;
}

interface CacheOptions {
  maxAge?: number; // in seconds
  staleWhileRevalidate?: number; // in seconds
  tags?: string[];
}

// In-memory cache store
const cache = new Map<string, CacheItem<any>>();

// Cache configuration
export const cacheConfig = {
  defaultMaxAge: 3600, // 1 hour
  defaultStaleWhileRevalidate: 300, // 5 minutes
  maxItems: 1000,
};

// Set cache item
export function setCacheItem<T>(
  key: string,
  value: T,
  options: CacheOptions = {}
): void {
  const maxAge = options.maxAge || cacheConfig.defaultMaxAge;
  const now = Date.now();

  // Ensure cache doesn't exceed max items
  if (cache.size >= cacheConfig.maxItems) {
    const oldestKey = Array.from(cache.keys())[0];
    cache.delete(oldestKey);
  }

  cache.set(key, {
    value,
    expiry: now + maxAge * 1000,
  });
}

// Get cache item
export function getCacheItem<T>(
  key: string,
  options: CacheOptions = {}
): T | null {
  const item = cache.get(key) as CacheItem<T>;
  const now = Date.now();

  if (!item) {
    return null;
  }

  const staleWhileRevalidate =
    options.staleWhileRevalidate || cacheConfig.defaultStaleWhileRevalidate;

  // Return value if not expired
  if (now < item.expiry) {
    return item.value;
  }

  // Return stale value if within staleWhileRevalidate window
  if (now < item.expiry + staleWhileRevalidate * 1000) {
    return item.value;
  }

  // Remove expired item
  cache.delete(key);
  return null;
}

// Clear cache
export function clearCache(tags?: string[]): void {
  if (!tags || tags.length === 0) {
    cache.clear();
    return;
  }

  // Clear items with matching tags
  for (const [key, item] of cache.entries()) {
    if (tags.some(tag => key.includes(tag))) {
      cache.delete(key);
    }
  }
}

// Generate cache key from request
export function generateCacheKey(request: NextRequest): string {
  const url = new URL(request.url);
  return `${request.method}:${url.pathname}${url.search}`;
}

// Check if request is cacheable
export function isCacheable(request: NextRequest): boolean {
  // Only cache GET requests
  if (request.method !== 'GET') {
    return false;
  }

  // Don't cache requests with authorization headers
  if (request.headers.has('authorization')) {
    return false;
  }

  return true;
}

// Cache middleware
export async function cacheMiddleware(
  request: NextRequest,
  handler: () => Promise<Response>,
  options: CacheOptions = {}
): Promise<Response> {
  if (!isCacheable(request)) {
    return handler();
  }

  const cacheKey = generateCacheKey(request);
  const cachedResponse = getCacheItem<Response>(cacheKey, options);

  if (cachedResponse) {
    return cachedResponse;
  }

  const response = await handler();
  setCacheItem(cacheKey, response, options);

  return response;
} 