'use client';

import { useTranslations } from 'next-intl';
import { MortgageCalculator } from '@/components/calculators/mortgage-calculator/mortgage-calculator';

export default function MortgageCalculatorPage() {
  const t = useTranslations('mortgageCalculator');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        {t('pageTitle')}
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        {t('pageDescription')}
      </p>
      <MortgageCalculator />
    </div>
  );
} 