export const locales = ['en', 'es', 'fr', 'de'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch'
}; 