import React from 'react';

const AppFilter = ({ filter, onFilterSelect }) => {
  const buttonsData = [
    { name: 'all', label: 'Всі співробітники' },
    { name: 'moreThen1000', label: 'З/П більше 1000$' },
  ];

  const buttons = buttonsData.map(({ name, label }) => {
    const isActive = filter === name;
    // Стилі для світлої та темної теми
    const clazz = isActive 
        ? 'bg-gray-800 text-white' 
        : 'bg-white dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-300';
    return (
      <button
        className={`py-2 px-4 rounded-md transition ${clazz}`}
        type="button"
        key={name}
        onClick={() => onFilterSelect(name)}
      >
        {label}
      </button>
    );
  });

  return (
    <div className="flex justify-center space-x-2 mb-6">
      {buttons}
    </div>
  );
};

export default AppFilter;