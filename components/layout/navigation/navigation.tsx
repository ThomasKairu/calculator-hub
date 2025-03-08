import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
  const t = useTranslations('common');
  const pathname = usePathname();

  const links = [
    {
      href: '/calculators/currency',
      label: t('nav.currency'),
    },
    {
      href: '/calculators/unit',
      label: t('nav.unit'),
    },
    {
      href: '/calculators/mortgage',
      label: t('nav.mortgage'),
    },
    {
      href: '/calculators/bmi',
      label: t('nav.bmi'),
    },
  ];

  return (
    <nav className="flex items-center space-x-4">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
            pathname === link.href
              ? 'text-primary-600 dark:text-primary-400'
              : 'text-gray-600 dark:text-gray-300'
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
} 