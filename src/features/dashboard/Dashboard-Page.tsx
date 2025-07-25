import React from 'react';
import { Users, UserCheck, UserX, Briefcase } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// --- ОСНОВНА ЗМІНА: Імпортуємо наш новий, спеціалізований хук ---
import { useDashboardStats } from './useDashboardStats';

// Імпортуємо наші чисті компоненти
import { StatCard } from './components/StatCard';
import { EmployeeStatusChart } from './components/EmployeeStatusChart';

const DashboardPage = () => {
  const { t } = useTranslation();
  // --- ОСНОВНА ЗМІНА: Використовуємо новий хук ---
  // Компонент тепер не знає, звідки беруться дані, він просто отримує готову статистику.
  const { stats, isLoading, error } = useDashboardStats();

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
          {t('dashboard.title')}
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {t('dashboard.subtitle')}
        </p>
      </div>

      {error && (
        <div className="p-4 mb-4 text-center text-red-500 bg-red-100 dark:bg-red-900 rounded-lg">
          {error as string}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          title={t('dashboard.total_employees')}
          value={stats.total}
          isLoading={isLoading}
        />
        <StatCard
          icon={UserCheck}
          title={t('dashboard.active')}
          value={stats.active}
          isLoading={isLoading}
        />
        <StatCard
          icon={Briefcase}
          title={t('dashboard.on_leave')}
          value={stats.onLeave}
          isLoading={isLoading}
        />
        <StatCard
          icon={UserX}
          title={t('dashboard.terminated')}
          value={stats.terminated}
          isLoading={isLoading}
        />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
          {t('dashboard.status_distribution')}
        </h2>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md min-h-[348px] flex items-center justify-center">
          <EmployeeStatusChart data={stats} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
