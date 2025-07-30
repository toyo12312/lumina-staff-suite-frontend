import {
  useState,
  useEffect,
  type FC,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import { useTranslation } from 'react-i18next';

import type { Employee } from '../../types';
import type { UpdateEmployeeDto } from '../../features/employers/useEmployers';

const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

interface EmployeeFormProps {
  employee: Partial<Employee> | null;
  onSave: (data: UpdateEmployeeDto) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export const EmployeeForm: FC<EmployeeFormProps> = ({
  employee,
  onSave,
  onCancel,
  isSubmitting,
}) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<UpdateEmployeeDto>({});

  const isEditing = !!employee;

  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName || '',
        lastName: employee.lastName || '',
        email: employee.email || '',
        position: employee.position || '',
      });
    }
  }, [employee]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const inputClasses =
    'p-3 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors duration-300';

  return (
    <div className="bg-gray-50 dark:bg-slate-800/50 p-6 rounded-lg border border-gray-200 dark:border-slate-700 mb-6 transition-colors duration-300">
      <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-4">
        {isEditing
          ? t('employees.edit_form_title')
          : t('employees.add_form_title')}
      </h2>
      <form onSubmit={handleSubmit}>
        {}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="firstName"
            placeholder={t('employees.form_placeholder_firstname')}
            value={formData.firstName || ''}
            onChange={handleChange}
            className={inputClasses}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder={t('employees.form_placeholder_lastname')}
            value={formData.lastName || ''}
            onChange={handleChange}
            className={inputClasses}
            required
          />
          <input
            type="email"
            name="email"
            placeholder={t('employees.form_placeholder_email')}
            value={formData.email || ''}
            onChange={handleChange}
            className={`${inputClasses} md:col-span-2`}
            required
          />
          <input
            type="text"
            name="position"
            placeholder={t('employees.form_placeholder_position')}
            value={formData.position || ''}
            onChange={handleChange}
            className={`${inputClasses} md:col-span-2`}
            required
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="py-2 px-4 bg-gray-200 hover:bg-gray-300 dark:bg-slate-600 dark:hover:bg-slate-500 text-gray-800 dark:text-gray-200 rounded-lg transition-colors duration-300"
            disabled={isSubmitting}
          >
            {t('employees.button_cancel')}
          </button>
          <button
            type="submit"
            className="flex items-center justify-center py-2 px-4 w-32 bg-gray-800 hover:bg-gray-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner /> : t('employees.button_save')}
          </button>
        </div>
      </form>
    </div>
  );
};
