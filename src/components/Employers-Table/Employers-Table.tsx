import type { FC } from 'react';

import type { Employee } from '../../types';
import { useTranslation } from 'react-i18next';

interface EmployeesTableProps {
  employees: Employee[];
  onEditClick: (employee: Employee) => void;
  onDeleteClick: (id: number | string) => void;
}

const EmployeesTable: FC<EmployeesTableProps> = ({
  employees,
  onEditClick,
  onDeleteClick,
}) => {
  const { t } = useTranslation();

  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'on_leave':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'terminated':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

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
            <tr
              key={employee.id}
              className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <td className="py-4 px-6 whitespace-nowrap font-medium text-gray-900 dark:text-gray-100">
                {employee.firstName} {employee.lastName}
              </td>
              <td className="py-4 px-6 whitespace-nowrap text-gray-600 dark:text-gray-400">
                {employee.position}
              </td>
              <td className="py-4 px-6 whitespace-nowrap text-gray-600 dark:text-gray-400">
                {employee.email}
              </td>
              <td className="py-4 px-6 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(employee.status)}`}
                >
                  {t(`employees.status.${employee.status}`)}
                </span>
              </td>
              <td className="py-4 px-6 whitespace-nowrap text-right text-sm font-medium flex justify-end items-center space-x-4">
                <button
                  onClick={() => onEditClick(employee)}
                  className="text-gray-400 hover:text-blue-600 transition"
                  title={t('employees.edit_tooltip')}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z"
                    ></path>
                  </svg>
                </button>
                <button
                  onClick={() => onDeleteClick(employee.id)}
                  className="text-gray-400 hover:text-red-600 transition"
                  title={t('employees.delete_tooltip')}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeesTable;
