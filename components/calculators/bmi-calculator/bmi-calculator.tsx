'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import { Select } from '@/components/ui/select/select';
import { calculateBMI } from '@/lib/calculators/bmi';
import { BMIResult } from '@/types/calculator';

const schema = z.object({
  height: z.number().positive(),
  weight: z.number().positive(),
  age: z.number().int().min(2).max(120),
  gender: z.enum(['male', 'female']),
  unit: z.enum(['metric', 'imperial']),
});

type FormData = z.infer<typeof schema>;

export function BMICalculator() {
  const t = useTranslations('bmi');
  const [result, setResult] = useState<BMIResult | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      unit: 'metric',
      gender: 'male',
      age: 30,
    },
  });

  const unit = watch('unit');

  const onSubmit = (data: FormData) => {
    const result = calculateBMI(data);
    setResult(result);
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Select
            label={t('form.unit')}
            options={[
              { value: 'metric', label: t('form.units.metric') },
              { value: 'imperial', label: t('form.units.imperial') },
            ]}
            error={errors.unit?.message}
            {...register('unit')}
          />

          <Input
            type="number"
            label={t('form.height')}
            placeholder={unit === 'metric' ? t('form.heightMetric') : t('form.heightImperial')}
            error={errors.height?.message}
            {...register('height', { valueAsNumber: true })}
          />

          <Input
            type="number"
            label={t('form.weight')}
            placeholder={unit === 'metric' ? t('form.weightMetric') : t('form.weightImperial')}
            error={errors.weight?.message}
            {...register('weight', { valueAsNumber: true })}
          />

          <Input
            type="number"
            label={t('form.age')}
            error={errors.age?.message}
            {...register('age', { valueAsNumber: true })}
          />

          <Select
            label={t('form.gender')}
            options={[
              { value: 'male', label: t('form.genders.male') },
              { value: 'female', label: t('form.genders.female') },
            ]}
            error={errors.gender?.message}
            {...register('gender')}
          />

          <Button type="submit" className="w-full">
            {t('form.calculate')}
          </Button>
        </form>
      </div>

      {result && (
        <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            {t('result.title')}
          </h3>

          <div className="mb-6">
            <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              {result.bmi.toFixed(1)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t(`result.categories.${result.category}`)}
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              {t('result.range.title')}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t('result.range.description', {
                min: result.healthyRangeMin.toFixed(1),
                max: result.healthyRangeMax.toFixed(1),
              })}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              {t('result.recommendations.title')}
            </h4>
            <ul className="list-disc pl-5 space-y-1">
              {result.recommendations.map((recommendation, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  {recommendation}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
} 