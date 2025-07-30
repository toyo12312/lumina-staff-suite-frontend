import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { useTranslation } from 'react-i18next';
import type { EmployeeStatus } from '../../../types';
import type { FC } from 'react';

interface ChartData {
  active: number;
  onLeave: number;
  terminated: number;
}

interface EmployeeStatusChartProps {
  data: ChartData;
  isLoading: boolean;
}

const COLORS: Record<EmployeeStatus, string> = {
  active: '#22c55e',
  on_leave: '#f59e0b',
  terminated: '#ef4444',
};

export const EmployeeStatusChart: FC<EmployeeStatusChartProps> = ({
  data,
  isLoading,
}) => {
  const { t } = useTranslation();

  const chartData = [
    {
      name: t('dashboard.active'),
      value: data.active,
      status: 'active' as EmployeeStatus,
    },
    {
      name: t('dashboard.on_leave'),
      value: data.onLeave,
      status: 'on_leave' as EmployeeStatus,
    },
    {
      name: t('dashboard.terminated'),
      value: data.terminated,
      status: 'terminated' as EmployeeStatus,
    },
  ].filter((item) => item.value > 0);

  if (isLoading) {
    return (
      <div className="h-full w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
    );
  }

  if (chartData.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 py-10">
        {t('dashboard.no_chart_data')}
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Tooltip
          contentStyle={{
            background: 'rgba(31, 41, 55, 0.8)',
            borderColor: '#4b5563',
            borderRadius: '0.5rem',
            color: '#ffffff',
          }}
          itemStyle={{ color: '#d1d5db' }}
          cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
        />
        <Legend
          iconType="circle"
          formatter={(value) => (
            <span className="text-gray-700 dark:text-gray-300 ml-2">
              {value}
            </span>
          )}
        />
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[entry.status]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
