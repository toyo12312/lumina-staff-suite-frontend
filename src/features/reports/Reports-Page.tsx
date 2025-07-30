import { Helmet } from 'react-helmet-async';
import { Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Employee } from '../../types';
import { useReports } from './useReports';

type CsvRow = {
  [key: string]: string | number | Date;
};

const exportToCsv = (filename: string, rows: CsvRow[]) => {
  if (!rows || rows.length === 0) {
    return;
  }
  const separator = ',';
  const keys = Object.keys(rows[0]);
  const csvContent =
    keys.join(separator) +
    '\n' +
    rows
      .map((row) => {
        return keys
          .map((k) => {
            let cell = row[k] === null || row[k] === undefined ? '' : row[k];
            cell =
              cell instanceof Date
                ? cell.toLocaleString()
                : cell.toString().replace(/"/g, '""');
            if (cell.search(/("|,|\n)/g) >= 0) {
              cell = `"${cell}"`;
            }
            return cell;
          })
          .join(separator);
      })
      .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

const ReportsPage = () => {
  const { t } = useTranslation();
  const { reportData, isLoading, error } = useReports();

  const handleExport = () => {
    const dataToExport = reportData.map((emp) => ({
      ID: emp.id,
      "Ім'я": emp.firstName,
      Прізвище: emp.lastName,
      Посада: emp.position,
      Email: emp.email,
      Статус: emp.status,
      'Дата найму': new Date(emp.hireDate).toLocaleDateString(),
    }));

    exportToCsv('employees_report.csv', dataToExport);
  };

  return (
    <>
      <Helmet>
        <title>{t('seo.reports_title')}</title>
        <meta name="description" content={t('seo.reports_description')} />
      </Helmet>
      <div className="p-4 md:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
              {t('reports.title')}
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {t('reports.subtitle')}
            </p>
          </div>
          <button
            onClick={handleExport}
            disabled={isLoading || reportData.length === 0}
            className="mt-4 md:mt-0 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <Download size={18} />
            {t('reports.export_csv')}
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-x-auto">
          {isLoading ? (
            <div className="p-6 text-center">
              Завантаження даних для звіту...
            </div>
          ) : error ? (
            <div className="p-6 text-center text-red-500">
              {error as string}
            </div>
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
                  <th scope="col" className="px-6 py-3">
                    {t('reports.table_header_hire_date')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {reportData.length > 0 ? (
                  reportData.map((employee: Employee) => (
                    <tr
                      key={employee.id}
                      className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {employee.firstName} {employee.lastName}
                      </td>
                      <td className="px-6 py-4">{employee.position}</td>
                      <td className="px-6 py-4">{employee.email}</td>
                      <td className="px-6 py-4">
                        {t(`employees.status.${employee.status}`)}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(employee.hireDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center p-6">
                      Немає співробітників для відображення у звіті.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default ReportsPage;
