import React from 'react';
import { useTranslation } from 'react-i18next';
import { EmployeeStatus } from '../../../types';

export const StatusBadge = ({ status }: { status: EmployeeStatus }) => {
  const { t } = useTranslation();

  const statusStyles = {
    [EmployeeStatus.Active]:
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    [EmployeeStatus.OnLeave]:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    [EmployeeStatus.Terminated]:
      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  const statusText = {
    [EmployeeStatus.Active]: t('employees.status.active'),
    [EmployeeStatus.OnLeave]: t('employees.status.on_leave'),
    [EmployeeStatus.Terminated]: t('employees.status.terminated'),
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}
    >
      {statusText[status]}
    </span>
  );
};
