import {
  useState,
  useEffect,
  type FC,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
// Крок 1: Імпортуємо всі необхідні типи
import type { Employee, EmployeeStatus } from '../../../types';
import type { UpdateEmployeeDto } from '../../../features/employers/useEmployers';

// Крок 2: Створюємо інтерфейс для props
interface EmployeeModalProps {
  employee: Partial<Employee> | null;
  onClose: () => void;
  onSave: (employeeData: UpdateEmployeeDto) => void;
}

// Крок 3: Створюємо масив можливих статусів для select
const statusOptions: EmployeeStatus[] = ['active', 'on_leave', 'terminated'];

export const EmployeeModal: FC<EmployeeModalProps> = ({
  employee,
  onClose,
  onSave,
}) => {
  const { t } = useTranslation();
  // Крок 4: Типізуємо стан форми
  const [formData, setFormData] = useState<UpdateEmployeeDto>({});

  const isEditing = !!employee?.id;

  // Крок 5: Використовуємо useEffect для синхронізації форми з props
  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName || '',
        lastName: employee.lastName || '',
        position: employee.position || '',
        email: employee.email || '',
        status: employee.status || 'active',
      });
    } else {
      // Скидаємо форму, коли створюємо нового співробітника
      setFormData({
        firstName: '',
        lastName: '',
        position: '',
        email: '',
        status: 'active',
      });
    }
  }, [employee]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {isEditing
              ? t('employees.modal_edit_title')
              : t('employees.modal_add_title')}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg p-1.5"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t('employees.form_label_firstname')}
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName || ''}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t('employees.form_label_lastname')}
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName || ''}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="position"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {t('employees.form_label_position')}
              </label>
              <input
                type="text"
                id="position"
                value={formData.position || ''}
                onChange={handleChange}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {t('employees.form_label_email')}
              </label>
              <input
                type="email"
                id="email"
                value={formData.email || ''}
                onChange={handleChange}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="status"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {t('employees.form_label_status')}
              </label>
              {/* Крок 6: Оновлюємо select, щоб він працював з рядковими значеннями */}
              <select
                id="status"
                value={formData.status || 'active'}
                onChange={handleChange}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              >
                {statusOptions.map((statusValue) => (
                  <option key={statusValue} value={statusValue}>
                    {t(`employees.status.${statusValue}`)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center p-4 border-t dark:border-gray-700 rounded-b-lg">
            <button
              type="submit"
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
            >
              {isEditing
                ? t('employees.button_update')
                : t('employees.button_save')}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
            >
              {t('employees.button_cancel')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
