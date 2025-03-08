import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/server/rate-limiter';
import { logger } from '@/lib/server/logging';
import { AnalyticsEvent } from '@/types/api';
import { analyticsConfig } from '@/config/analytics';

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 1000,
});

export async function POST(
  request: NextRequest,
  { params }: { params: { locale: string } }
) {
  try {
    // Apply rate limiting
    await limiter.check(request, 50, 'ANALYTICS_API');

    // Check if analytics is enabled
    if (!analyticsConfig.enabled) {
      return NextResponse.json({ success: true });
    }

    // Get request body
    const event: AnalyticsEvent = await request.json();

    // Validate event data
    if (!event.type || !event.category || !event.action) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_EVENT',
            message: 'Missing required event data',
            status: 400,
          },
        },
        { status: 400 }
      );
    }

    // Add timestamp if not provided
    if (!event.timestamp) {
      event.timestamp = Date.now();
    }

    // Log event
    logger.info('Analytics event received', {
      event,
      locale: params.locale,
    });

    // Here you would typically send the event to your analytics service
    // For example, Google Analytics, Mixpanel, etc.
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to Google Analytics
      await fetch('https://www.google-analytics.com/mp/collect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: request.headers.get('x-client-id'),
          events: [{
            name: event.type,
            params: {
              category: event.category,
              action: event.action,
              label: event.label,
              value: event.value,
              locale: params.locale,
            },
          }],
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    // Log error
    logger.error('Analytics API error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      locale: params.locale,
    });

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'ANALYTICS_ERROR',
          message: 'Failed to process analytics event',
          status: 500,
        },
      },
      { status: 500 }
    );
  }
} 