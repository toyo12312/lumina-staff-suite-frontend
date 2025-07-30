import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import type { EmployeeStatus } from '../../../types';

interface StatusBadgeProps {
  status: EmployeeStatus;
}

const statusStyles: Record<EmployeeStatus, string> = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  on_leave:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  terminated: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

export const StatusBadge: FC<StatusBadgeProps> = ({ status }) => {
  const { t } = useTranslation();

  const statusText: Record<EmployeeStatus, string> = {
    active: t('employees.status.active'),
    on_leave: t('employees.status.on_leave'),
    terminated: t('employees.status.terminated'),
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}
    >
      {statusText[status]}
    </span>
  );
};
