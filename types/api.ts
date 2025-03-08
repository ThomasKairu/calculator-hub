// Exchange Rate API Types
export interface ExchangeRateResponse {
  base: string;
  rates: Record<string, number>;
  timestamp: number;
}

export interface APIError {
  code: string;
  message: string;
  status: number;
}

// API Response Types
export type APIResponse<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: APIError;
};

// API Request Types
export interface APIRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
  cache?: RequestCache;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

// Analytics API Types
export interface AnalyticsEvent {
  type: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  timestamp: number;
}

// Rate Limiting Types
export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number;
} 