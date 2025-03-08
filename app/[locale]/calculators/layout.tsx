import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Calculator Hub',
    default: 'Calculator Hub',
  },
  description: 'Your all-in-one calculator solution',
};

export default function CalculatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 