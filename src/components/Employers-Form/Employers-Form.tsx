import React, { useState, useEffect } from 'react';

// Маленький компонент спінера для відображення завантаження
const Spinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

// Переконуємось, що компонент приймає `isSubmitting` як пропс
const EmployeeForm = ({ employee, onSave, onCancel, isSubmitting }) => {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [salary, setSalary] = useState('');

    useEffect(() => {
        // Заповнюємо форму даними, якщо редагуємо
        setName(employee ? employee.name : '');
        setPosition(employee ? employee.position : '');
        setSalary(employee ? employee.salary : '');
    }, [employee]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Передаємо дані нагору для збереження
        onSave({ name, position, salary: parseFloat(salary) || 0 });
    };

    // Стилі для полів вводу, щоб не дублювати код
    const inputClasses = "p-3 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors duration-300";

    return (
        <div className="bg-gray-50 dark:bg-slate-800/50 p-6 rounded-lg border border-gray-200 dark:border-slate-700 mb-6 transition-colors duration-300">
            <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-4">{employee ? `Редагування: ${employee.name}` : 'Додати нового співробітника'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input type="text" placeholder="Ім'я" value={name} onChange={e => setName(e.target.value)} className={inputClasses} required />
                    <input type="text" placeholder="Посада" value={position} onChange={e => setPosition(e.target.value)} className={inputClasses} required />
                    <input type="number" placeholder="Зарплата" value={salary} onChange={e => setSalary(e.target.value)} className={inputClasses} required min="0" step="0.01" />
                </div>
                <div className="flex justify-end space-x-3">
                    <button 
                        type="button" 
                        onClick={onCancel} 
                        className="py-2 px-4 bg-gray-200 hover:bg-gray-300 dark:bg-slate-600 dark:hover:bg-slate-500 text-gray-800 dark:text-gray-200 rounded-lg transition-colors duration-300" 
                        disabled={isSubmitting}
                    >
                        Скасувати
                    </button>
                    <button 
                        type="submit" 
                        className="flex items-center justify-center py-2 px-4 w-32 bg-gray-800 hover:bg-gray-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <Spinner /> : 'Зберегти'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;
