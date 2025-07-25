import React from 'react';
import EmployeesListItem from '../Employers-List-Item/Employers-List-Item';

function EmployeesList({ employees, onDelete, onEdit }) {
  if (employees.length === 0) {
    return <p className="text-center text-gray-400 mt-8">Немає співробітників для відображення.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full bg-gray-700 text-gray-100">
        <thead className="bg-gray-600 border-b border-gray-500">
          <tr>
            <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Ім'я</th>
            <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Посада</th>
            <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Зарплата</th>
            <th className="py-3 px-6 text-right text-xs font-medium uppercase tracking-wider">Дії</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-600">
          {employees.map((employee) => (
            <EmployeesListItem
              key={employee.id}
              employee={employee}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeesList;
