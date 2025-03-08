import { ReactNode } from 'react';

interface CalculatorLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  sidebar?: ReactNode;
  className?: string;
}

export function CalculatorLayout({
  title,
  description,
  children,
  sidebar,
  className = '',
}: CalculatorLayoutProps) {
  return (
    <div className={`container mx-auto px-4 py-8 ${className}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">{description}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">{children}</div>
        {sidebar && (
          <div className="lg:w-80 space-y-6">
            <div className="sticky top-6">{sidebar}</div>
          </div>
        )}
      </div>
    </div>
  );
} 