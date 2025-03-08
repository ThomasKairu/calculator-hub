export const analyticsConfig = {
  enabled: process.env.NODE_ENV === 'production',
  trackingId: process.env.NEXT_PUBLIC_ANALYTICS_ID,
  debug: process.env.NODE_ENV === 'development',
  pageTracking: true,
  eventTracking: true,
  excludePaths: ['/privacy', '/terms'],
  sampleRate: 100,
  categories: {
    conversion: {
      currency: 'Currency Conversion',
      unit: 'Unit Conversion',
      mortgage: 'Mortgage Calculation',
      bmi: 'BMI Calculation',
    },
    interaction: {
      themeSwitch: 'Theme Switch',
      languageSwitch: 'Language Switch',
      navigation: 'Navigation',
      share: 'Share',
    },
    error: {
      api: 'API Error',
      validation: 'Validation Error',
      conversion: 'Conversion Error',
    },
  },
  dimensions: {
    theme: 'dimension1',
    locale: 'dimension2',
    calculator: 'dimension3',
  },
}; 