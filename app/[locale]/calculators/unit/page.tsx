'use client';

import { useTranslations } from 'next-intl';
import { UnitConverter } from '@/components/calculators/unit-converter/unit-converter';

export default function UnitConverterPage() {
  const t = useTranslations('unit');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        {t('title')}
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        {t('description')}
      </p>
      <UnitConverter />
    </div>
  );
} 