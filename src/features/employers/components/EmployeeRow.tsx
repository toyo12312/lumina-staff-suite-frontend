import { useState, useEffect, useRef, type FC } from 'react';
import { MoreVertical, Edit, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { Employee } from '../../../types';
import { StatusBadge } from './StatusBadge';

interface EmployeeRowProps {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
}

export const EmployeeRow: FC<EmployeeRowProps> = ({
  employee,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <tr className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {employee.firstName} {employee.lastName}
      </td>
      <td className="px-6 py-4">{employee.position}</td>
      <td className="px-6 py-4">{employee.email}</td>
      <td className="px-6 py-4">
        <StatusBadge status={employee.status} />
      </td>
      <td className="px-6 py-4 text-right">
        <div className="relative inline-block text-left" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <MoreVertical size={18} />
          </button>
          {isDropdownOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
              <div className="py-1">
                <button
                  onClick={() => {
                    onEdit(employee);
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Edit size={16} />
                  <span>{t('employees.button_edit')}</span>
                </button>
                <button
                  onClick={() => {
                    onDelete(Number(employee.id));
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Trash2 size={16} />
                  <span>{t('employees.button_delete')}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};
