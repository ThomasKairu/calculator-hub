import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/server/rate-limiter';
import { logger } from '@/lib/server/logging';
import { APIError } from '@/types/api';

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
});

export async function GET(
  request: NextRequest,
  { params }: { params: { locale: string } }
) {
  try {
    // Apply rate limiting
    await limiter.check(request, 10, 'EXCHANGE_API');

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    // Validate parameters
    if (!from || !to) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_PARAMETERS',
            message: 'Missing required parameters: from and to',
            status: 400,
          },
        },
        { status: 400 }
      );
    }

    // Fetch exchange rate from external API
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${from}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.EXCHANGE_RATE_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch exchange rate');
    }

    const data = await response.json();
    const rate = data.rates[to];

    if (!rate) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'RATE_NOT_FOUND',
            message: 'Exchange rate not found for the specified currencies',
            status: 404,
          },
        },
        { status: 404 }
      );
    }

    // Log successful request
    logger.info('Exchange rate fetched successfully', {
      from,
      to,
      rate,
      locale: params.locale,
    });

    return NextResponse.json({
      success: true,
      data: {
        rate,
        timestamp: data.timestamp,
        source: 'exchangerate-api.com',
      },
    });
  } catch (error) {
    // Log error
    logger.error('Exchange rate API error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      locale: params.locale,
    });

    const apiError: APIError = {
      code: 'EXCHANGE_RATE_ERROR',
      message: 'Failed to fetch exchange rate',
      status: 500,
    };

    return NextResponse.json(
      { success: false, error: apiError },
      { status: 500 }
    );
  }
} 