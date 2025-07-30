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

interface EmployeesEditFormProps {
  employee: Employee;
  onUpdate: (id: number | string, data: UpdateEmployeeDto) => void;
  onCancel: () => void;
}

export const EmployeesEditForm: FC<EmployeesEditFormProps> = ({
  employee,
  onUpdate,
  onCancel,
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<UpdateEmployeeDto>({});

  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        position: employee.position,
      });
    }
  }, [employee]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onUpdate(employee.id, formData);
  };

  const inputClasses =
    'w-full p-2 rounded-md bg-gray-900 border border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500';

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-700 p-6 rounded-lg shadow-md mb-8 border border-blue-500"
    >
      <h2 className="text-xl font-semibold text-white mb-4">
        {t('employees.edit_form_title')}: {employee.firstName}{' '}
        {employee.lastName}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            {t('employees.form_label_firstname')}
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName || ''}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            {t('employees.form_label_lastname')}
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName || ''}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>
        <div className="md:col-span-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            {t('employees.form_label_email')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>
        <div className="md:col-span-2">
          <label
            htmlFor="position"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            {t('employees.form_label_position')}
          </label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position || ''}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-md"
        >
          {t('employees.button_cancel')}
        </button>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md"
        >
          {t('employees.button_save_changes')}
        </button>
      </div>
    </form>
  );
};

export default EmployeesEditForm;
