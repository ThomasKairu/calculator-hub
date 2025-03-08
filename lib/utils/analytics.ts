import { AnalyticsEvent } from '@/types/api';
import { analyticsConfig } from '@/config/analytics';

// Track page view
export async function trackPageView(path: string, title: string): Promise<void> {
  if (!analyticsConfig.enabled || !analyticsConfig.pageTracking) {
    return;
  }

  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'pageview',
        category: 'navigation',
        action: 'view',
        label: title,
        path,
        timestamp: Date.now(),
      } as AnalyticsEvent),
    });
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
}

// Track event
export async function trackEvent(
  category: string,
  action: string,
  label?: string,
  value?: number
): Promise<void> {
  if (!analyticsConfig.enabled || !analyticsConfig.eventTracking) {
    return;
  }

  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'event',
        category,
        action,
        label,
        value,
        timestamp: Date.now(),
      } as AnalyticsEvent),
    });
  } catch (error) {
    console.error('Failed to track event:', error);
  }
}

// Track conversion
export async function trackConversion(
  category: keyof typeof analyticsConfig.categories.conversion,
  value?: number
): Promise<void> {
  if (!analyticsConfig.enabled) {
    return;
  }

  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'conversion',
        category: analyticsConfig.categories.conversion[category],
        action: 'convert',
        value,
        timestamp: Date.now(),
      } as AnalyticsEvent),
    });
  } catch (error) {
    console.error('Failed to track conversion:', error);
  }
}

// Track error
export async function trackError(
  category: keyof typeof analyticsConfig.categories.error,
  error: Error | string
): Promise<void> {
  if (!analyticsConfig.enabled) {
    return;
  }

  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'error',
        category: analyticsConfig.categories.error[category],
        action: 'error',
        label: error instanceof Error ? error.message : error,
        timestamp: Date.now(),
      } as AnalyticsEvent),
    });
  } catch (error) {
    console.error('Failed to track error:', error);
  }
}

// Track user interaction
export async function trackInteraction(
  category: keyof typeof analyticsConfig.categories.interaction,
  action: string,
  label?: string
): Promise<void> {
  if (!analyticsConfig.enabled) {
    return;
  }

  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'interaction',
        category: analyticsConfig.categories.interaction[category],
        action,
        label,
        timestamp: Date.now(),
      } as AnalyticsEvent),
    });
  } catch (error) {
    console.error('Failed to track interaction:', error);
  }
}

// Initialize analytics
export function initAnalytics(): void {
  if (!analyticsConfig.enabled) {
    return;
  }

  // Track initial page view
  trackPageView(window.location.pathname, document.title);

  // Track route changes
  if (typeof window !== 'undefined') {
    const handleRouteChange = (url: string) => {
      trackPageView(url, document.title);
    };

    window.addEventListener('popstate', () => {
      handleRouteChange(window.location.pathname);
    });
  }
} 