export const adsConfig = {
  enabled: process.env.NODE_ENV === 'production',
  adSlots: {
    header: {
      id: 'calculator-hub-header',
      sizes: [[728, 90], [970, 90], [320, 50]],
      responsive: true,
    },
    sidebar: {
      id: 'calculator-hub-sidebar',
      sizes: [[300, 250], [300, 600]],
      responsive: true,
    },
    footer: {
      id: 'calculator-hub-footer',
      sizes: [[728, 90], [970, 90], [320, 50]],
      responsive: true,
    },
  },
  refreshInterval: 30000, // 30 seconds
  lazyLoadOffset: 100, // pixels
  excludePaths: ['/privacy', '/terms'],
  targeting: {
    calculator: 'calculator_type',
    language: 'user_language',
    theme: 'site_theme',
  },
  prebidConfig: {
    enabled: true,
    timeout: 1000,
    priceGranularity: 'dense',
  },
  consentRequired: true,
  gdprApplies: true,
  ccpaApplies: true,
  childDirected: false,
}; 