import { Metadata } from 'next';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'Privacy Policy | Calculator Hub',
  description: 'Learn about how Calculator Hub protects your privacy and handles your data with transparency and security.',
  openGraph: {
    title: 'Privacy Policy | Calculator Hub',
    description: 'Learn about how Calculator Hub protects your privacy and handles your data with transparency and security.',
    type: 'website',
  },
};

export default function PrivacyPage() {
  const t = useTranslations('privacy');

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
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              {t('introduction.title')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {t('introduction.description')}
            </p>
          </section>

          {/* Data Collection */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              {t('dataCollection.title')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {t('dataCollection.description')}
            </p>
            <ul className="mt-8 space-y-4 text-gray-600 dark:text-gray-300">
              <li className="flex gap-x-3">
                <span className="text-primary-600 dark:text-primary-400">•</span>
                {t('dataCollection.list.usage')}
              </li>
              <li className="flex gap-x-3">
                <span className="text-primary-600 dark:text-primary-400">•</span>
                {t('dataCollection.list.preferences')}
              </li>
              <li className="flex gap-x-3">
                <span className="text-primary-600 dark:text-primary-400">•</span>
                {t('dataCollection.list.technical')}
              </li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              {t('dataSecurity.title')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {t('dataSecurity.description')}
            </p>
          </section>

          {/* Cookie Policy */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              {t('cookies.title')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {t('cookies.description')}
            </p>
          </section>

          {/* User Rights */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              {t('rights.title')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {t('rights.description')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 