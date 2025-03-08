import { useTranslations } from 'next-intl';
import Link from 'next/link';

export function Footer() {
  const t = useTranslations('common');
  const currentYear = new Date().getFullYear();

  const links = [
    {
      href: '/about',
      label: t('footer.about'),
    },
    {
      href: '/privacy',
      label: t('footer.privacy'),
    },
    {
      href: '/terms',
      label: t('footer.terms'),
    },
  ];

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="flex space-x-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            © {currentYear} {t('appName')}. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
} 