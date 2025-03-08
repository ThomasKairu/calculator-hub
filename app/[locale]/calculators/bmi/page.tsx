'use client';

import { useTranslations } from 'next-intl';
import { BMICalculator } from '@/components/calculators/bmi-calculator/bmi-calculator';

export default function BMICalculatorPage() {
  const t = useTranslations('bmi');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        {t('title')}
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        {t('description')}
      </p>
      <BMICalculator />
    </div>
  );
} 