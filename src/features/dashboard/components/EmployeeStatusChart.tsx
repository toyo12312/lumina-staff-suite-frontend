import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { useTranslation } from 'react-i18next';
import { EmployeeStatus } from '../../../types';

interface ChartData {
  active: number;
  onLeave: number;
  terminated: number;
}

interface EmployeeStatusChartProps {
  data: ChartData;
  isLoading: boolean;
}

export const EmployeeStatusChart: React.FC<EmployeeStatusChartProps> = ({
  data,
  isLoading,
}) => {
  const { t } = useTranslation();
  const COLORS = {
    [EmployeeStatus.Active]: '#22c55e',
    [EmployeeStatus.OnLeave]: '#f59e0b',
    [EmployeeStatus.Terminated]: '#ef4444',
  };

  const chartData = [
    {
      name: t('dashboard.active'),
      value: data.active,
      status: EmployeeStatus.Active,
    },
    {
      name: t('dashboard.on_leave'),
      value: data.onLeave,
      status: EmployeeStatus.OnLeave,
    },
    {
      name: t('dashboard.terminated'),
      value: data.terminated,
      status: EmployeeStatus.Terminated,
    },
  ].filter((item) => item.value > 0);

  if (isLoading) {
    return (
      <div className="h-full w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
    );
  }

  if (chartData.length === 0) {
    return (
      <p className="text-gray-400">Немає даних для відображення діаграми.</p>
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
          activeShape={{ style: { outline: 'none' } }}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[entry.status]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
