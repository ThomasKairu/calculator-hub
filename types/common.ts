// Component Props Types
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

// Theme Types
export type Theme = 'light' | 'dark' | 'system';

// Locale Types
export type Locale = 'en' | 'es' | 'fr' | 'de';

// Form Types
export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'radio' | 'checkbox';
  required?: boolean;
  placeholder?: string;
  options?: Array<{
    value: string;
    label: string;
  }>;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

// Navigation Types
export interface NavigationItem {
  href: string;
  label: string;
  icon?: string;
  children?: NavigationItem[];
}

// Error Types
export interface AppError extends Error {
  code?: string;
  status?: number;
  details?: unknown;
}

// Analytics Types
export interface PageView {
  path: string;
  title: string;
  timestamp: number;
  locale: Locale;
  theme: Theme;
}

// User Preferences
export interface UserPreferences {
  theme: Theme;
  locale: Locale;
  currency: string;
  measurementSystem: 'metric' | 'imperial';
  notifications: boolean;
} 