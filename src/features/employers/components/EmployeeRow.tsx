import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Edit, Trash2 } from 'lucide-react';
import { Employee } from '../../../types';
import { StatusBadge } from './StatusBadge';

interface EmployeeRowProps {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (employeeId: number) => void;
}

export const EmployeeRow: React.FC<EmployeeRowProps> = ({
  employee,
  onEdit,
  onDelete,
}) => {
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
  }, [dropdownRef]);

  return (
    <tr className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {employee.firstName} {employee.lastName}
      </th>
      <td className="px-6 py-4">{employee.position}</td>
      <td className="px-6 py-4">
        <StatusBadge status={employee.status} />
      </td>
      <td className="px-6 py-4">{employee.email}</td>
      <td className="px-6 py-4 text-right">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="p-1.5 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <MoreVertical size={18} />
          </button>
          {isDropdownOpen && (
            <div className="absolute w-40 bg-white dark:bg-gray-700 rounded-md shadow-lg z-20 ring-1 ring-black ring-opacity-5 right-full mr-2 top-1/2 -translate-y-1/2">
              <div className="py-1">
                <button
                  onClick={() => {
                    onEdit(employee);
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <Edit size={16} /> Редагувати
                </button>
                <button
                  onClick={() => {
                    onDelete(employee.id);
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <Trash2 size={16} /> Видалити
                </button>
              </div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};
