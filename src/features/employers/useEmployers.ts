import { useState, useEffect, useCallback } from 'react';

import type { Employee } from '../../types';
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../../api/employees';

export type CreateEmployeeDto = Omit<Employee, 'id'>;
export type UpdateEmployeeDto = Partial<CreateEmployeeDto>;

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const fetchAndSetEmployees = useCallback(async (query: string) => {
    try {
      setIsLoading(true);
      const data = await getEmployees(query);
      setEmployees(data);
      setError(null);
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchAndSetEmployees(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, fetchAndSetEmployees]);

  const handleSave = async (employeeData: UpdateEmployeeDto) => {
    try {
      if (editingEmployee) {
        await updateEmployee(Number(editingEmployee.id), employeeData);
      } else {
        const newEmployeeData: CreateEmployeeDto = {
          firstName: employeeData.firstName || '',
          lastName: employeeData.lastName || '',
          email: employeeData.email || '',
          position: employeeData.position || '',
          status: employeeData.status || 'active',
          hireDate: new Date().toISOString(),
        };
        await createEmployee(newEmployeeData);
      }
      await fetchAndSetEmployees(searchTerm);
      setModalOpen(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (employeeId: number) => {
    if (window.prompt("Введіть 'видалити' для підтвердження:") === 'видалити') {
      try {
        await deleteEmployee(employeeId);
        await fetchAndSetEmployees(searchTerm);
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

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
