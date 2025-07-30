import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import type { Employee } from '../../types';
import { StatusBadge } from '../../features/employers/components/StatusBadge';
import { Edit, Trash2 } from 'lucide-react';

interface EmployeesListItemProps {
  employee: Employee;
  onDelete: (id: number | string) => void;
  onEdit: (employee: Employee) => void;
}

export const EmployeesListItem: FC<EmployeesListItemProps> = ({
  employee,
  onDelete,
  onEdit,
}) => {
  const { t } = useTranslation();

  return (
    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200">
      <td className="py-4 px-6 whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {employee.firstName} {employee.lastName}
      </td>
      <td className="py-4 px-6 whitespace-nowrap text-gray-600 dark:text-gray-400">
        {employee.position}
      </td>
      <td className="py-4 px-6 whitespace-nowrap text-gray-600 dark:text-gray-400">
        {employee.email}
      </td>
      <td className="py-4 px-6 whitespace-nowrap">
        <StatusBadge status={employee.status} />
      </td>
      <td className="py-4 px-6 whitespace-nowrap text-right text-sm font-medium flex justify-end items-center space-x-2">
        <button
          onClick={() => onEdit(employee)}
          className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition duration-200"
          title={t('employees.edit_tooltip')}
        >
          <Edit size={18} />
        </button>
        <button
          onClick={() => onDelete(employee.id)}
          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition duration-200"
          title={t('employees.delete_tooltip')}
        >
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
};

export default EmployeesListItem;
