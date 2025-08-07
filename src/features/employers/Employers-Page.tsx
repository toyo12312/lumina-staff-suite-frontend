import { Helmet } from 'react-helmet-async';
import { PlusCircle, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useEmployees } from './useEmployers';
import { EmployeeRow } from './components/EmployeeRow';
import { EmployeeModal } from './components/EmployeeModal';

// Створюємо маленький компонент спінера для відображення завантаження
const Spinner = () => (
  <div className="flex justify-center items-center p-10">
    <svg
      className="animate-spin h-8 w-8 text-slate-500 dark:text-slate-400"
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
  </div>
);

const EmployeesPage = () => {
  const { t } = useTranslation();
  const {
    employees,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    isModalOpen,
    editingEmployee,
    handleSave,
    handleDelete,
    openEditModal,
    openAddModal,
    closeModal,
  } = useEmployees();

  return (
    <>
      <Helmet>
        <title>{t('seo.employees_title')}</title>
        <meta name="description" content={t('seo.employees_description')} />
      </Helmet>
      <div className="p-4 md:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
              {t('employees.title')}
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {t('employees.subtitle')}
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="mt-4 md:mt-0 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-800"
          >
            <PlusCircle size={18} />
            {t('employees.add_employee')}
          </button>
        </div>
        <div className="mb-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t('employees.search_placeholder')}
              className="w-full p-2 pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-x-auto min-h-[300px]">
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <div className="p-6 text-center text-red-500">{error}</div>
          ) : (
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    {t('employees.table_header_name')}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t('employees.table_header_position')}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t('employees.table_header_email')}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t('employees.table_header_status')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-right">
                    {t('employees.table_header_actions')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {employees.length > 0 ? (
                  employees.map((employee) => (
                    <EmployeeRow
                      key={employee.id}
                      employee={employee}
                      onEdit={openEditModal}
                      onDelete={handleDelete}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center p-6">
                      {t('employees.no_employees_found')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
        {isModalOpen && (
          <EmployeeModal
            employee={editingEmployee}
            onClose={closeModal}
            onSave={handleSave}
          />
        )}
      </div>
    </>
  );
};

export default EmployeesPage;
