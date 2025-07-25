import React from 'react';

const AppInfo = ({ employeesCount, employeesToRiseCount }) => {
  return (
    // Задаємо стилі для світлої теми, а потім для темної через dark:
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6 text-gray-800 dark:text-white">
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl font-bold text-center text-gray-700 dark:text-gray-200">Облік співробітників у компанії LUMINA</h1>
      <p className="text-xl text-center mt-2">Загальна кількість співробітників: {employeesCount}</p>
      <p className="text-xl text-center mt-1">Премію отримають: {employeesToRiseCount}</p>
    </div>
  );
};

export default AppInfo;
