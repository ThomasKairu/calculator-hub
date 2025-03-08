import { useState } from 'react';
import { getExchangeRate } from '@/lib/api/exchange';

export function useExchangeRate() {
  const [isLoading, setIsLoading] = useState(false);

  const getRate = async (from: string, to: string): Promise<number> => {
    try {
      setIsLoading(true);
      const rate = await getExchangeRate(from, to);
      return rate;
    } catch (error) {
      console.error('Failed to fetch exchange rate:', error);
      return 1;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getRate,
    isLoading,
  };
} 