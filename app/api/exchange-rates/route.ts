import { NextResponse } from 'next/server';

const API_KEY = '86d4b464d0ecd7c7e7d24356';
const BASE_URL = 'https://v6.exchangerate-api.com/v6';

export async function POST(request: Request) {
  try {
    const { amount, fromCurrency, toCurrency } = await request.json();

    if (!amount || !fromCurrency || !toCurrency) {
      return NextResponse.json(
        { error: 'Missing required parameters: amount, fromCurrency, and toCurrency' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${BASE_URL}/${API_KEY}/pair/${fromCurrency}/${toCurrency}/${amount}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Exchange rate API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to fetch exchange rates' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    if (!data.conversion_result) {
      return NextResponse.json(
        { error: 'Invalid response from exchange rate API' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      convertedAmount: data.conversion_result,
      rate: data.conversion_rate,
      timestamp: data.time_last_update_unix,
    });
  } catch (error) {
    console.error('Exchange rate API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 