import React from 'react';

const SearchPanel = ({ term, onUpdateSearch }) => {
  return (
    <input
      type="text"
      className="w-full p-3 mb-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      placeholder="Знайти співробітника..."
      value={term}
      onChange={(e) => onUpdateSearch(e.target.value)}
    />
  );
};

export default SearchPanel;
