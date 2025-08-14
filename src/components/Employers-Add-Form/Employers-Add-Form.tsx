import { useState, type FC, type ChangeEvent, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import type { UpdateEmployeeDto } from '../../features/employers/useEmployers';


interface EmployeesAddFormProps {
  UpdateEmployeeDto
  onSave: (employee: UpdateEmployeeDto) => void;
}


const initialState: UpdateEmployeeDto = {
  firstName: '',
  lastName: '',
  email: '',
  position: '',
};

const EmployeesAddForm: FC<EmployeesAddFormProps> = ({ onSave }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
    setFormData(initialState);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8"
    >
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        {t('employees.add_form_title')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Поле для імені */}
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {t('employees.form_label_firstname')}
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('employees.form_placeholder_firstname')}
            required
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {t('employees.form_label_lastname')}
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('employees.form_placeholder_lastname')}
            required
          />
        </div>
        {/* Поле для Email */}
        <div className="md:col-span-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {t('employees.form_label_email')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('employees.form_placeholder_email')}
            required
          />
        </div>
        {/* Поле для посади */}
        <div className="md:col-span-2">
          <label
            htmlFor="position"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {t('employees.form_label_position')}
          </label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('employees.form_placeholder_position')}
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
      >
        {t('employees.add_button')}
      </button>
    </form>
  );
};

export default EmployeesAddForm;
