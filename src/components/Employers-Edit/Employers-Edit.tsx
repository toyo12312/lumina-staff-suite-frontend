import React, { useState, useEffect } from 'react';

function EmployeesEditForm({ employee, onUpdate, onCancel }) {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');

  // Коли компонент отримує нового співробітника для редагування, оновлюємо поля
  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setPosition(employee.position);
      setSalary(employee.salary);
    }
  }, [employee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(employee.id, { name, position, salary: parseFloat(salary) });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-700 p-6 rounded-lg shadow-md mb-8 border border-blue-500">
      <h2 className="text-xl font-semibold text-white mb-4">Редагувати Співробітника: {employee.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="editName" className="block text-sm font-medium text-gray-300 mb-1">Ім'я</label>
          <input type="text" id="editName" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 rounded-md bg-gray-900 border border-gray-600 text-white" required />
        </div>
        <div>
          <label htmlFor="editPosition" className="block text-sm font-medium text-gray-300 mb-1">Посада</label>
          <input type="text" id="editPosition" value={position} onChange={(e) => setPosition(e.target.value)} className="w-full p-2 rounded-md bg-gray-900 border border-gray-600 text-white" required />
        </div>
        <div>
          <label htmlFor="editSalary" className="block text-sm font-medium text-gray-300 mb-1">Зарплата</label>
          <input type="number" id="editSalary" value={salary} onChange={(e) => setSalary(e.target.value)} className="w-full p-2 rounded-md bg-gray-900 border border-gray-600 text-white" required min="0" step="0.01"/>
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-md">Скасувати</button>
        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md">Зберегти Зміни</button>
      </div>
    </form>
  );
}

export default EmployeesEditForm;
