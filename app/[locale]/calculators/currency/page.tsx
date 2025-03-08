import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { CurrencyConverter } from '@/components/calculators/currency-converter/currency-converter';

export const metadata: Metadata = {
  title: 'Currency Converter | Calculator Hub',
  description: 'Convert currencies with real-time exchange rates'
};

export default function CurrencyConverterPage() {
  const t = useTranslations('currency');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        {t('title')}
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        {t('description')}
      </p>
      <CurrencyConverter />
    </div>
  );
} 