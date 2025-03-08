import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Navigation } from '../navigation/navigation';

export function Header() {
  const t = useTranslations('common');

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {t('appName')}
            </Link>
          </div>
          <Navigation />
        </div>
      </div>
    </header>
  );
} 