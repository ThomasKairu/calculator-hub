import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Home() {
  const t = useTranslations('Home');
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl md:text-7xl">
              {t('title')}
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Calculator Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link 
            href="/calculators/currency" 
            className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="p-8">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-4">💱</span>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('currencyConverter')}</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{t('currencyDescription')}</p>
            </div>
          </Link>
          
          <Link 
            href="/calculators/unit" 
            className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="p-8">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-4">📏</span>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('unitConverter')}</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{t('unitDescription')}</p>
            </div>
          </Link>
          
          <Link 
            href="/calculators/mortgage" 
            className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="p-8">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-4">🏠</span>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('mortgageCalculator')}</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{t('mortgageDescription')}</p>
            </div>
          </Link>
          
          <Link 
            href="/calculators/bmi" 
            className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="p-8">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-4">⚖️</span>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('bmiCalculator')}</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{t('bmiDescription')}</p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
} 