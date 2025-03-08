export const siteConfig = {
  name: 'Calculator Hub',
  description: 'Your one-stop solution for all calculation needs',
  url: process.env.NEXT_PUBLIC_APP_URL,
  ogImage: '/images/og.png',
  links: {
    twitter: 'https://twitter.com/calculatorhub',
    github: 'https://github.com/calculatorhub',
  },
  creator: 'Calculator Hub Team',
  keywords: [
    'calculator',
    'currency converter',
    'unit converter',
    'mortgage calculator',
    'bmi calculator',
    'finance',
    'health',
    'tools',
  ],
  themeColor: '#0ea5e9',
  manifest: '/manifest.json',
  robots: '/robots.txt',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  verification: {
    google: 'your-google-site-verification',
    bing: 'your-bing-site-verification',
  },
}; 