import { Metadata } from 'next';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'Terms of Service | Calculator Hub',
  description: 'Read Calculator Hub\'s terms of service and learn about our commitment to providing reliable calculation tools while ensuring user responsibility and data accuracy.',
  openGraph: {
    title: 'Terms of Service | Calculator Hub',
    description: 'Read Calculator Hub\'s terms of service and learn about our commitment to providing reliable calculation tools while ensuring user responsibility and data accuracy.',
    type: 'website',
  },
};

export default function TermsPage() {
  const t = useTranslations('terms');

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              {t('title')}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {t('subtitle')}
            </p>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              {t('lastUpdated')}
            </p>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="space-y-16">
          {/* Agreement */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              {t('agreement.title')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {t('agreement.description')}
            </p>
          </section>

          {/* Services */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              {t('services.title')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {t('services.description')}
            </p>
            <ul className="mt-8 space-y-4 text-gray-600 dark:text-gray-300">
              <li className="flex gap-x-3">
                <span className="text-primary-600 dark:text-primary-400">•</span>
                {t('services.list.currency')}
              </li>
              <li className="flex gap-x-3">
                <span className="text-primary-600 dark:text-primary-400">•</span>
                {t('services.list.unit')}
              </li>
              <li className="flex gap-x-3">
                <span className="text-primary-600 dark:text-primary-400">•</span>
                {t('services.list.financial')}
              </li>
              <li className="flex gap-x-3">
                <span className="text-primary-600 dark:text-primary-400">•</span>
                {t('services.list.health')}
              </li>
            </ul>
          </section>

          {/* Acceptable Use */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              {t('usage.title')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {t('usage.description')}
            </p>
            <ul className="mt-8 space-y-4 text-gray-600 dark:text-gray-300">
              <li className="flex gap-x-3">
                <span className="text-primary-600 dark:text-primary-400">•</span>
                {t('usage.list.legal')}
              </li>
              <li className="flex gap-x-3">
                <span className="text-primary-600 dark:text-primary-400">•</span>
                {t('usage.list.accurate')}
              </li>
              <li className="flex gap-x-3">
                <span className="text-primary-600 dark:text-primary-400">•</span>
                {t('usage.list.responsible')}
              </li>
            </ul>
          </section>

          {/* Disclaimer */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              {t('disclaimer.title')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {t('disclaimer.description')}
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              {t('changes.title')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {t('changes.description')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 