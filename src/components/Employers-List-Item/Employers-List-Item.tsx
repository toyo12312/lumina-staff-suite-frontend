import React from 'react';

function EmployeesListItem({ employee, onDelete, onEdit }) {
  const { id, name, position, salary } = employee;

  return (
    <tr className="hover:bg-gray-600 transition-colors duration-200">
      <td className="py-4 px-6 whitespace-nowrap">{name}</td>
      <td className="py-4 px-6 whitespace-nowrap">{position}</td>
      <td className="py-4 px-6 whitespace-nowrap">{salary} $</td>
      <td className="py-4 px-6 whitespace-nowrap text-right text-sm font-medium flex justify-end items-center space-x-2">
        <button
          onClick={() => onEdit(employee)}
          className="text-blue-400 hover:text-blue-600 transition duration-200"
          title="Редагувати співробітника"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
        </button>
        <button
          onClick={() => onDelete(id)}
          className="text-red-400 hover:text-red-600 transition duration-200"
          title="Видалити співробітника"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd"></path></svg>
        </button>
      </td>
    </tr>
  );
}

export default EmployeesListItem;
