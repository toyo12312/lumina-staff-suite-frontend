import React, { useState } from 'react';

function EmployeesAddForm({ onAdd }) {
  // Стан для полів форми, тепер локальний для цього компонента
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Передаємо дані у батьківський компонент
    onAdd({ name, position, salary: parseFloat(salary) });
    // Очищуємо поля форми
    setName('');
    setPosition('');
    setSalary('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-700 p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold text-white mb-4">Додати Нового Співробітника</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Ім'я</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-900 border border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Введіть ім'я"
            required
          />
        </div>
        <div>
          <label htmlFor="position" className="block text-sm font-medium text-gray-300 mb-1">Посада</label>
          <input
            type="text"
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-900 border border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Введіть посаду"
            required
          />
        </div>
        <div>
          <label htmlFor="salary" className="block text-sm font-medium text-gray-300 mb-1">Зарплата</label>
          <input
            type="number"
            id="salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-900 border border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Введіть зарплату"
            min="0"
            step="0.01"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
      >
        Додати Співробітника
      </button>
    </form>
  );
}

export default EmployeesAddForm;