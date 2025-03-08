import { NextRequest } from 'next/server';
import { logger } from './logger';
import { checkDatabaseHealth } from './db';

// Metrics storage
const metrics = {
  requestCount: 0,
  errorCount: 0,
  responseTimeTotal: 0,
  lastMinuteRequests: [] as number[],
  statusCodes: {} as Record<number, number>,
};

// Health check types
interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  checks: {
    [key: string]: {
      status: 'up' | 'down';
      latency?: number;
      error?: string;
    };
  };
  timestamp: string;
}

// Performance metrics interface
interface PerformanceMetrics {
  requestsPerMinute: number;
  averageResponseTime: number;
  errorRate: number;
  statusCodeDistribution: Record<number, number>;
  timestamp: string;
}

// Monitor request
export async function monitorRequest(
  request: NextRequest,
  handler: () => Promise<Response>
): Promise<Response> {
  const startTime = Date.now();
  metrics.requestCount++;

  try {
    const response = await handler();
    const duration = Date.now() - startTime;

    // Update metrics
    metrics.responseTimeTotal += duration;
    metrics.statusCodes[response.status] = (metrics.statusCodes[response.status] || 0) + 1;
    metrics.lastMinuteRequests.push(Date.now());

    // Clean up old requests
    const oneMinuteAgo = Date.now() - 60000;
    metrics.lastMinuteRequests = metrics.lastMinuteRequests.filter(
      time => time > oneMinuteAgo
    );

    return response;
  } catch (error) {
    metrics.errorCount++;
    throw error;
  }
}

// Get health status
export async function getHealthStatus(): Promise<HealthStatus> {
  const checks: HealthStatus['checks'] = {};
  let overallStatus: HealthStatus['status'] = 'healthy';

  // Check database
  const dbStartTime = Date.now();
  try {
    const isHealthy = await checkDatabaseHealth();
    checks.database = {
      status: isHealthy ? 'up' : 'down',
      latency: Date.now() - dbStartTime,
    };
    if (!isHealthy) overallStatus = 'degraded';
  } catch (error: any) {
    checks.database = {
      status: 'down',
      error: error.message,
    };
    overallStatus = 'unhealthy';
  }

  // Check memory usage
  const memoryUsage = process.memoryUsage();
  const memoryThreshold = 0.9; // 90%
  const memoryUsageRatio = memoryUsage.heapUsed / memoryUsage.heapTotal;

  checks.memory = {
    status: memoryUsageRatio < memoryThreshold ? 'up' : 'down',
    latency: memoryUsageRatio,
  };

  if (memoryUsageRatio >= memoryThreshold) {
    overallStatus = overallStatus === 'healthy' ? 'degraded' : overallStatus;
  }

  return {
    status: overallStatus,
    checks,
    timestamp: new Date().toISOString(),
  };
}

// Get performance metrics
export function getPerformanceMetrics(): PerformanceMetrics {
  return {
    requestsPerMinute: metrics.lastMinuteRequests.length,
    averageResponseTime:
      metrics.requestCount > 0
        ? metrics.responseTimeTotal / metrics.requestCount
        : 0,
    errorRate:
      metrics.requestCount > 0
        ? (metrics.errorCount / metrics.requestCount) * 100
        : 0,
    statusCodeDistribution: metrics.statusCodes,
    timestamp: new Date().toISOString(),
  };
}

// Reset metrics
export function resetMetrics(): void {
  metrics.requestCount = 0;
  metrics.errorCount = 0;
  metrics.responseTimeTotal = 0;
  metrics.lastMinuteRequests = [];
  metrics.statusCodes = {};
}

// Monitor memory usage
let memoryCheckInterval: NodeJS.Timeout;

export function startMemoryMonitoring(
  threshold = 0.9,
  interval = 60000
): void {
  memoryCheckInterval = setInterval(() => {
    const memoryUsage = process.memoryUsage();
    const usageRatio = memoryUsage.heapUsed / memoryUsage.heapTotal;

    if (usageRatio > threshold) {
      logger.warn({
        type: 'memory_warning',
        heapUsed: memoryUsage.heapUsed,
        heapTotal: memoryUsage.heapTotal,
        usageRatio,
      });
    }
  }, interval);
}

// Stop memory monitoring
export function stopMemoryMonitoring(): void {
  if (memoryCheckInterval) {
    clearInterval(memoryCheckInterval);
  }
}

// Cleanup
process.on('exit', () => {
  stopMemoryMonitoring();
}); 