'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import { Select } from '@/components/ui/select/select';
import { convertUnit } from '@/lib/calculators/unit';
import { unitCategories, getUnitsForCategory } from '@/lib/constants/units';
import type { UnitResult } from '@/types/calculator';

const schema = z.object({
  amount: z.number().positive('Amount must be greater than 0'),
  category: z.string().min(1, 'Please select a category'),
  fromUnit: z.string().min(1, 'Please select a unit'),
  toUnit: z.string().min(1, 'Please select a unit'),
});

type FormData = z.infer<typeof schema>;

export function UnitConverter() {
  const t = useTranslations('unit');
  const [result, setResult] = useState<UnitResult | null>(null);
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
      category: 'length',
      fromUnit: 'meter',
      toUnit: 'kilometer',
    },
  });

  const category = watch('category');
  const availableUnits = getUnitsForCategory(category);

  const categoryOptions = unitCategories.map((cat) => ({
    value: cat.id,
    label: t(`categories.${cat.id}`),
  }));

  const unitOptions = availableUnits.map((unit) => ({
    value: unit.id,
    label: t(`units.${unit.id}`),
  }));

  const onSubmit = async (data: FormData) => {
    try {
      setError(null);
      const convertedAmount = convertUnit(
        data.amount,
        data.fromUnit,
        data.toUnit,
        data.category
      );
      
      setResult({
        amount: data.amount,
        convertedAmount,
        fromUnit: data.fromUnit,
        toUnit: data.toUnit,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert units');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              type="number"
              label={t('form.amount')}
              error={errors.amount?.message}
              {...register('amount', { valueAsNumber: true })}
            />

            <Select
              label={t('form.category')}
              error={errors.category?.message}
              options={categoryOptions}
              {...register('category')}
            />

            <Select
              label={t('form.from')}
              error={errors.fromUnit?.message}
              options={unitOptions}
              {...register('fromUnit')}
            />

            <Select
              label={t('form.to')}
              error={errors.toUnit?.message}
              options={unitOptions}
              {...register('toUnit')}
            />

            <Button type="submit" className="w-full">
              {t('form.convert')}
            </Button>
          </form>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-6 dark:bg-red-900/50">
            <p className="text-red-600 dark:text-red-200">{error}</p>
          </div>
        )}

        {result && !error && (
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {t('result.title')}
            </h3>
            <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              {result.convertedAmount.toFixed(4)} {result.toUnit}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              {result.amount} {result.fromUnit} = {result.convertedAmount.toFixed(4)} {result.toUnit}
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 