const API_KEY = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY;
const BASE_URL = 'https://api.exchangerate-api.com/v4/latest';

export async function getExchangeRate(from: string, to: string): Promise<number> {
  try {
    const response = await fetch(`${BASE_URL}/${from}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rate');
    }

    const data = await response.json();
    return data.rates[to] ?? 1;
  } catch (error) {
    console.error('Exchange rate API error:', error);
    return 1;
  }
} 