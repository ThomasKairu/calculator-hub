'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import { calculateMortgage } from '@/lib/calculators/mortgage';
import { MortgageResult } from '@/types/calculator';
import { formatCurrency } from '@/lib/utils/formatting';

const schema = z.object({
  principal: z.number().positive(),
  interestRate: z.number().min(0).max(100),
  loanTerm: z.number().int().positive(),
  downPayment: z.number().min(0),
  propertyTax: z.number().min(0).optional(),
  insurance: z.number().min(0).optional(),
});

type FormData = z.infer<typeof schema>;

export function MortgageCalculator() {
  const t = useTranslations('mortgageCalculator');
  const [result, setResult] = useState<MortgageResult | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      principal: 300000,
      interestRate: 3.5,
      loanTerm: 30,
      downPayment: 60000,
      propertyTax: 2400,
      insurance: 1200,
    },
  });

  const onSubmit = (data: FormData) => {
    const result = calculateMortgage(data);
    setResult(result);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            type="number"
            label={t('loanAmount')}
            error={errors.principal?.message}
            {...register('principal', { valueAsNumber: true })}
          />

          <Input
            type="number"
            label={t('interestRate')}
            error={errors.interestRate?.message}
            step="0.1"
            {...register('interestRate', { valueAsNumber: true })}
          />

          <Input
            type="number"
            label={t('loanTerm')}
            error={errors.loanTerm?.message}
            {...register('loanTerm', { valueAsNumber: true })}
          />

          <Input
            type="number"
            label={t('downPayment')}
            error={errors.downPayment?.message}
            {...register('downPayment', { valueAsNumber: true })}
          />

          <Input
            type="number"
            label={t('propertyTax')}
            error={errors.propertyTax?.message}
            {...register('propertyTax', { valueAsNumber: true })}
          />

          <Input
            type="number"
            label={t('insurance')}
            error={errors.insurance?.message}
            {...register('insurance', { valueAsNumber: true })}
          />

          <Button type="submit" className="w-full">
            {t('calculateButton')}
          </Button>
        </form>
      </div>

      {result && (
        <div className="space-y-8">
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
              {t('summaryTitle')}
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t('monthlyPayment')}
                </p>
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {formatCurrency(result.monthlyPayment)}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t('totalPayment')}
                </p>
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {formatCurrency(result.totalPayment)}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t('totalInterest')}
                </p>
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {formatCurrency(result.totalInterest)}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
              {t('amortizationTitle')}
            </h3>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={result.amortizationSchedule}
                  margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    label={{
                      value: t('yearLabel'),
                      position: 'insideBottom',
                    }}
                  />
                  <YAxis
                    label={{
                      value: t('balanceLabel'),
                      angle: -90,
                      position: 'insideLeft',
                    }}
                  />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    labelFormatter={(label: number) =>
                      t('monthLabel', { month: label })
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="balance"
                    stroke="#0ea5e9"
                    name={t('remainingBalance')}
                  />
                  <Line
                    type="monotone"
                    dataKey="interest"
                    stroke="#8b5cf6"
                    name={t('interestPaid')}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 