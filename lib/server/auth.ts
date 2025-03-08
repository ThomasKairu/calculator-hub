import { NextRequest } from 'next/server';
import { createHash, timingSafeEqual } from 'crypto';

// Verify webhook signature
export function verifyWebhookSignature(
  request: NextRequest,
  signature: string
): boolean {
  const payload = request.body;
  const timestamp = request.headers.get('x-webhook-timestamp');
  const secret = process.env.WEBHOOK_SECRET;

  if (!secret || !timestamp || !payload) {
    return false;
  }

  // Create expected signature
  const expectedSignature = createHash('sha256')
    .update(`${timestamp}.${payload}`)
    .update(secret)
    .digest('hex');

  // Compare signatures using timing-safe comparison
  try {
    return timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch {
    return false;
  }
}

// Verify API key
export function verifyApiKey(request: NextRequest): boolean {
  const apiKey = request.headers.get('x-api-key');
  const validApiKey = process.env.API_KEY;

  if (!apiKey || !validApiKey) {
    return false;
  }

  try {
    return timingSafeEqual(
      Buffer.from(apiKey),
      Buffer.from(validApiKey)
    );
  } catch {
    return false;
  }
}

// Generate API key
export function generateApiKey(): string {
  return createHash('sha256')
    .update(Math.random().toString())
    .update(Date.now().toString())
    .update(process.env.API_KEY_SALT || '')
    .digest('hex');
}

// Generate session token
export function generateSessionToken(userId: string): string {
  return createHash('sha256')
    .update(userId)
    .update(Date.now().toString())
    .update(process.env.SESSION_SECRET || '')
    .digest('hex');
}

// Verify session token
export function verifySessionToken(token: string): boolean {
  // In a real application, you would verify against a database
  // and check expiration time
  return token.length === 64;
}

// CORS configuration
export const corsConfig = {
  allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || [],
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'x-api-key',
    'x-webhook-signature',
  ],
  maxAge: 86400, // 24 hours
};

// Check CORS
export function checkCors(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true;

  return corsConfig.allowedOrigins.includes(origin) ||
    corsConfig.allowedOrigins.includes('*');
}

// Rate limiting configuration
export const rateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
};

// IP-based rate limiting
const ipRequests = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const requestData = ipRequests.get(ip);

  if (!requestData || now > requestData.resetTime) {
    ipRequests.set(ip, {
      count: 1,
      resetTime: now + rateLimitConfig.windowMs,
    });
    return true;
  }

  if (requestData.count >= rateLimitConfig.max) {
    return false;
  }

  requestData.count++;
  return true;
} 