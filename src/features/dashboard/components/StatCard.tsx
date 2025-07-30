import type { FC, ElementType } from 'react';
import type { LucideProps } from 'lucide-react';

interface StatCardProps {
  icon: ElementType<LucideProps>;
  title: string;
  value: number | string;
  isLoading: boolean;
}

export const StatCard: FC<StatCardProps> = ({
  icon: IconComponent,
  title,
  value,
  isLoading,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center gap-6">
      <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full">
        <IconComponent className="text-blue-600 dark:text-blue-300" size={28} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </p>
        {isLoading ? (
          <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mt-1"></div>
        ) : (
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
        )}
      </div>
    </div>
  );
};
