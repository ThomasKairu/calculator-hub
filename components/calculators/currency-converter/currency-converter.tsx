'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import { Select } from '@/components/ui/select/select';
import { supportedCurrencies } from '@/lib/calculators/currency';
import type { CurrencyResult } from '@/types/calculator';

const schema = z.object({
  amount: z.number().positive('Amount must be greater than 0'),
  fromCurrency: z.string().min(1, 'Please select a currency'),
  toCurrency: z.string().min(1, 'Please select a currency'),
});

type FormData = z.infer<typeof schema>;

export function CurrencyConverter() {
  const t = useTranslations('currency');
  const [result, setResult] = useState<CurrencyResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: 1,
      fromCurrency: 'USD',
      toCurrency: 'EUR',
    },
  });

  const amount = watch('amount');
  const fromCurrency = watch('fromCurrency');
  const toCurrency = watch('toCurrency');

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      setError(null);
      setResult(null);

      const response = await fetch('/api/exchange-rates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Number(data.amount),
          fromCurrency: data.fromCurrency,
          toCurrency: data.toCurrency,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to convert currency');
      }

      const result = await response.json();
      setResult({
        amount: Number(data.amount),
        convertedAmount: result.convertedAmount,
        fromCurrency: data.fromCurrency,
        toCurrency: data.toCurrency,
        rate: result.rate,
      });
    } catch (err) {
      console.error('Currency conversion error:', err);
      setError(err instanceof Error ? err.message : 'Failed to convert currency');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Form Card */}
        <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5"></div>
          <form onSubmit={handleSubmit(onSubmit)} className="relative space-y-6">
            <div className="space-y-4">
              <Input
                type="number"
                label={t('form.amount')}
                error={errors.amount?.message}
                disabled={isLoading}
                className="text-2xl font-medium"
                {...register('amount', { 
                  valueAsNumber: true,
                  required: 'Amount is required' 
                })}
              />

              <div className="grid grid-cols-2 gap-4">
                <Select
                  label={t('form.fromCurrency')}
                  error={errors.fromCurrency?.message}
                  disabled={isLoading}
                  className="w-full"
                  {...register('fromCurrency')}
                >
                  {supportedCurrencies.map((currency) => (
                    <option key={currency.id} value={currency.id}>
                      {currency.flag} {currency.name}
                    </option>
                  ))}
                </Select>

                <Select
                  label={t('form.toCurrency')}
                  error={errors.toCurrency?.message}
                  disabled={isLoading}
                  className="w-full"
                  {...register('toCurrency')}
                >
                  {supportedCurrencies.map((currency) => (
                    <option key={currency.id} value={currency.id}>
                      {currency.flag} {currency.name}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full text-lg py-3"
              disabled={isLoading}
              variant="gradient"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('loading')}
                </div>
              ) : t('convert')}
            </Button>
          </form>
        </div>

        {/* Result Card */}
        <div className="relative min-h-[300px] rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5"></div>
          <div className="relative h-full">
            {error ? (
              <div className="flex h-full items-center justify-center">
                <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/50">
                  <p className="text-center text-red-600 dark:text-red-200">{error}</p>
                </div>
              </div>
            ) : result ? (
              <div className="flex h-full flex-col justify-between">
                <div>
                  <h3 className="mb-6 text-lg font-medium text-gray-900 dark:text-white">
                    {t('result.title')}
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{supportedCurrencies.find(c => c.id === fromCurrency)?.flag}</span>
                        <div>
                          <span className="text-3xl font-bold text-gray-900 dark:text-white">
                            {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                          <span className="ml-2 text-lg text-gray-600 dark:text-gray-300">{fromCurrency}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-700">
                        <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{supportedCurrencies.find(c => c.id === toCurrency)?.flag}</span>
                        <div>
                          <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                            {result.convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                          <span className="ml-2 text-lg text-gray-600 dark:text-gray-300">{toCurrency}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 border-t pt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium">{t('result.rate')}:</span>{' '}
                    1 {fromCurrency} = {result.rate.toFixed(4)} {toCurrency}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-center text-gray-500 dark:text-gray-400">
                  {t('result.placeholder')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 