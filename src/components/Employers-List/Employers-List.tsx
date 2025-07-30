import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import type { Employee } from '../../types';
import { EmployeeRow } from '../../features/employers/components/EmployeeRow';

interface EmployeesListProps {
  employees: Employee[];
  onDelete: (id: number | string) => void;
  onEdit: (employee: Employee) => void;
}

export const EmployeesList: FC<EmployeesListProps> = ({
  employees,
  onDelete,
  onEdit,
}) => {
  const { t } = useTranslation();

  if (employees.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
        {t('employees.no_employees')}
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="min-w-full bg-white dark:bg-gray-800">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              {t('employees.table_header_name')}
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              {t('employees.table_header_position')}
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              {t('employees.table_header_email')}
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              {t('employees.table_header_status')}
            </th>
            <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              {t('employees.table_header_actions')}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {employees.map((employee) => (
            <EmployeeRow
              key={employee.id}
              employee={employee}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
