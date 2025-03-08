import pino from 'pino';
import { NextRequest } from 'next/server';

// Logger configuration
const loggerConfig = {
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label: string) => {
      return { level: label };
    },
  },
  timestamp: () => `,"time":"${new Date().toISOString()}"`,
};

// Create logger instance
export const logger = pino({
  ...loggerConfig,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: process.env.NODE_ENV === 'development',
    },
  },
});

// Log levels
export enum LogLevel {
  TRACE = 'trace',
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  FATAL = 'fatal',
}

// Log context interface
interface LogContext {
  requestId?: string;
  userId?: string;
  path?: string;
  method?: string;
  [key: string]: any;
}

// Create child logger with context
export function createContextLogger(context: LogContext) {
  return logger.child(context);
}

// Request logger middleware
export function logRequest(request: NextRequest) {
  const requestId = request.headers.get('x-request-id') || generateRequestId();
  const url = new URL(request.url);

  const context: LogContext = {
    requestId,
    method: request.method,
    path: url.pathname,
    query: Object.fromEntries(url.searchParams),
    userAgent: request.headers.get('user-agent'),
  };

  const requestLogger = createContextLogger(context);
  requestLogger.info('Incoming request');

  return { requestId, logger: requestLogger };
}

// Error logger
export function logError(
  error: Error,
  context: LogContext = {}
) {
  const errorLogger = createContextLogger(context);
  errorLogger.error({
    err: {
      message: error.message,
      stack: error.stack,
      name: error.name,
    },
    ...context,
  });
}

// Performance logger
export function logPerformance(
  operation: string,
  durationMs: number,
  context: LogContext = {}
) {
  const perfLogger = createContextLogger(context);
  perfLogger.info({
    operation,
    durationMs,
    ...context,
  });
}

// Audit logger
export function logAudit(
  action: string,
  details: any,
  context: LogContext = {}
) {
  const auditLogger = createContextLogger({
    type: 'audit',
    ...context,
  });
  auditLogger.info({
    action,
    details,
  });
}

// Security logger
export function logSecurity(
  event: string,
  details: any,
  context: LogContext = {}
) {
  const securityLogger = createContextLogger({
    type: 'security',
    ...context,
  });
  securityLogger.warn({
    event,
    details,
  });
}

// Generate request ID
function generateRequestId(): string {
  return Math.random().toString(36).substring(2, 15);
}

// Log rotation configuration
if (process.env.NODE_ENV === 'production') {
  const rotateConfig = {
    interval: '1d',
    size: '10M',
    compress: true,
    maxFiles: 7,
  };

  logger.info({ config: rotateConfig }, 'Log rotation configured');
}

// Export default logger
export default logger; 