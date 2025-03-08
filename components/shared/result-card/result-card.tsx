import { ReactNode } from 'react';

interface ResultCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function ResultCard({
  title,
  value,
  subtitle,
  icon,
  className = '',
  onClick,
}: ResultCardProps) {
  return (
    <div
      className={`rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 ${
        onClick ? 'cursor-pointer hover:shadow-xl transition-shadow' : ''
      } ${className}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="mt-2 text-3xl font-bold text-primary-600 dark:text-primary-400">
            {value}
          </p>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {subtitle}
            </p>
          )}
        </div>
        {icon && (
          <div className="text-gray-400 dark:text-gray-500">{icon}</div>
        )}
      </div>
    </div>
  );
} 