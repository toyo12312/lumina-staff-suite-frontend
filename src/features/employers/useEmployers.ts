import { useState, useEffect, useCallback } from 'react';
import { Employee, CreateEmployeeDto } from '../../types';
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../../api/employees';

// Це наш новий кастомний хук, який інкапсулює всю логіку
export const useEmployees = () => {
  // --- Стан ---
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  // --- Логіка завантаження даних ---
  const fetchAndSetEmployees = useCallback(async (query: string) => {
    try {
      setIsLoading(true);
      const data = await getEmployees(query);
      setEmployees(data);
      setError(null);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // --- Ефект для пошуку з дебаунсом ---
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchAndSetEmployees(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, fetchAndSetEmployees]);

  // --- Обробники подій (CRUD) ---
  const handleSave = async (employeeData) => {
    try {
      if (editingEmployee) {
        await updateEmployee(editingEmployee.id, employeeData);
      } else {
        const newEmployeeData: CreateEmployeeDto = {
          ...employeeData,
          hireDate: new Date().toISOString().split('T')[0],
        };
        await createEmployee(newEmployeeData);
      }
      await fetchAndSetEmployees(searchTerm); // Оновлюємо список
      setModalOpen(false); // Закриваємо модалку
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (employeeId: number) => {
    if (prompt("Введіть 'видалити' для підтвердження:") === 'видалити') {
      try {
        await deleteEmployee(employeeId);
        await fetchAndSetEmployees(searchTerm); // Оновлюємо список
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // --- Обробники для модального вікна ---
  const openEditModal = (employee: Employee) => {
    setEditingEmployee(employee);
    setModalOpen(true);
  };

  const openAddModal = () => {
    setEditingEmployee(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // --- Повертаємо все, що потрібно компоненту ---
  return {
    employees,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    isModalOpen,
    editingEmployee,
    handleSave,
    handleDelete,
    openEditModal,
    openAddModal,
    closeModal,
  };
};
