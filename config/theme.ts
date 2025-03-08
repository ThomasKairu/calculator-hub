import { Theme } from '@/types/common';

export const themeConfig = {
  defaultTheme: 'system' as Theme,
  storageKey: 'calculator-hub-theme',
  themes: ['light', 'dark', 'system'] as Theme[],
  mediaQuery: '(prefers-color-scheme: dark)',
};

export const colorSchemes = {
  light: {
    background: '#f9fafb',
    foreground: '#111827',
    primary: {
      DEFAULT: '#0ea5e9',
      foreground: '#ffffff',
    },
    secondary: {
      DEFAULT: '#8b5cf6',
      foreground: '#ffffff',
    },
    muted: {
      DEFAULT: '#f3f4f6',
      foreground: '#6b7280',
    },
    accent: {
      DEFAULT: '#f59e0b',
      foreground: '#ffffff',
    },
  },
  dark: {
    background: '#111827',
    foreground: '#f9fafb',
    primary: {
      DEFAULT: '#0ea5e9',
      foreground: '#ffffff',
    },
    secondary: {
      DEFAULT: '#8b5cf6',
      foreground: '#ffffff',
    },
    muted: {
      DEFAULT: '#1f2937',
      foreground: '#9ca3af',
    },
    accent: {
      DEFAULT: '#f59e0b',
      foreground: '#ffffff',
    },
  },
}; 