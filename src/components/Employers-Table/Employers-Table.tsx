import React from 'react';

const EmployeesTable = ({ employees, onEditClick, onDeleteClick, onToggleRise }) => {
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="min-w-full bg-white dark:bg-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ім'я</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Посада</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Зарплата</th>
                        <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Дії</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {employees.map(employee => (
                        <tr key={employee.id} className={`transition-colors ${employee.rise ? 'bg-yellow-100 dark:bg-yellow-500/10' : 'bg-white dark:bg-gray-800'} hover:bg-gray-50 dark:hover:bg-gray-700/50`}>
                            <td className="py-4 px-6 whitespace-nowrap font-medium text-gray-900 dark:text-gray-100">{employee.name}</td>
                            <td className="py-4 px-6 whitespace-nowrap text-gray-600 dark:text-gray-400">{employee.position}</td>
                            <td className="py-4 px-6 whitespace-nowrap text-gray-600 dark:text-gray-400">${employee.salary}</td>
                            <td className="py-4 px-6 whitespace-nowrap text-right text-sm font-medium flex justify-end items-center space-x-4">
                                {/* --- ПОВЕРТАЄМО КНОПКУ ДЛЯ БОНУСУ --- */}
                                <button onClick={() => onToggleRise(employee.id, employee.rise)} className="text-gray-400 hover:text-yellow-500 transition" title="Бонус">
                                    <svg className={`w-5 h-5 ${employee.rise ? 'text-yellow-500' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                </button>
                                <button onClick={() => onEditClick(employee)} className="text-gray-400 hover:text-blue-600 transition" title="Редагувати">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
                                </button>
                                <button onClick={() => onDeleteClick(employee.id)} className="text-gray-400 hover:text-red-600 transition" title="Видалити">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd"></path></svg>
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