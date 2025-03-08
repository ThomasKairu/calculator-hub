import { NavigationItem } from '@/types/common';

export const mainNavigation: NavigationItem[] = [
  {
    href: '/calculators/currency',
    label: 'nav.currency',
    icon: 'currency',
  },
  {
    href: '/calculators/unit',
    label: 'nav.unit',
    icon: 'ruler',
  },
  {
    href: '/calculators/mortgage',
    label: 'nav.mortgage',
    icon: 'home',
  },
  {
    href: '/calculators/bmi',
    label: 'nav.bmi',
    icon: 'heart',
  },
];

export const footerNavigation: NavigationItem[] = [
  {
    href: '/about',
    label: 'footer.about',
  },
  {
    href: '/privacy',
    label: 'footer.privacy',
  },
  {
    href: '/terms',
    label: 'footer.terms',
  },
]; 