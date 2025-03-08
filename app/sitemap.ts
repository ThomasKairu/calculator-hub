import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url || 'https://calculatorhub.com'; // Fallback URL if not defined
  const lastModified = new Date();

  // Define supported locales
  const locales = ['en', 'es', 'fr', 'de'];

  // Define routes
  const routes = [
    '',
    '/calculators/currency',
    '/calculators/unit',
    '/calculators/mortgage',
    '/calculators/bmi',
    '/about',
    '/privacy',
    '/terms',
  ];

  // Generate sitemap entries for each locale and route combination
  const entries = locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified,
      changeFrequency: route === '' 
        ? 'daily' as const 
        : route.startsWith('/calculators')
          ? 'weekly' as const
          : 'monthly' as const,
      priority: route === ''
        ? 1.0
        : route.startsWith('/calculators')
          ? 0.8
          : 0.5,
    }))
  );

  return entries;
}