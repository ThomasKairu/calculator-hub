# Calculator Hub

A comprehensive suite of calculators built with Next.js, featuring currency conversion, unit conversion, mortgage calculation, and BMI calculation.

## Features

- Real-time currency conversion with up-to-date exchange rates
- Comprehensive unit conversion across multiple domains
- Mortgage calculator with amortization visualization
- BMI calculator with health insights
- Internationalization support for multiple languages
- Dark mode support
- Responsive design
- Accessibility compliant

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- TanStack Query for server state
- React Hook Form with Zod validation
- Tailwind CSS for styling
- next-intl for internationalization
- Vitest for testing
- Playwright for E2E testing
- Storybook for component documentation

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/calculator-hub.git
cd calculator-hub
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with the following variables:
```
NEXT_PUBLIC_EXCHANGE_RATE_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run unit tests
- `npm run test:e2e` - Run E2E tests
- `npm run storybook` - Start Storybook
- `npm run build-storybook` - Build Storybook

## Project Structure

```
calculator-hub/
├── app/                    # Next.js App Router
├── components/            # React components
├── lib/                   # Utility functions and business logic
├── public/               # Static assets and translations
├── config/              # Configuration files
└── types/               # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 