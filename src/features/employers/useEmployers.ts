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

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 10;

  const [isModalOpen, setModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingEmployeeId, setDeletingEmployeeId] = useState<number | null>(
    null,
  );

  const fetchAndSetEmployees = useCallback(
    async (query: string, page: number) => {
      try {
        setIsLoading(true);
        const response = await getEmployees(query, page, limit);
        setEmployees(response.data);
        setTotalCount(response.total);
        setTotalPages(response.lastPage);
        setCurrentPage(response.page);
        setError(null);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchAndSetEmployees(searchTerm, currentPage);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, currentPage, fetchAndSetEmployees]);

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleSave = async (employeeData: UpdateEmployeeDto) => {
    try {
      if (editingEmployee) {
        await updateEmployee(Number(editingEmployee.id), employeeData);
        await fetchAndSetEmployees(searchTerm, currentPage);
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
        setCurrentPage(1);
        await fetchAndSetEmployees(searchTerm, 1);
      }
      setModalOpen(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const requestDelete = (employeeId: number) => {
    setDeletingEmployeeId(employeeId);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (deletingEmployeeId !== null) {
      try {
        await deleteEmployee(deletingEmployeeId);
        await fetchAndSetEmployees(searchTerm, currentPage);
        setDeleteModalOpen(false);
        setDeletingEmployeeId(null);
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setDeletingEmployeeId(null);
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
    setSearchTerm: handleSearchTermChange,
    currentPage,
    setCurrentPage,
    totalPages,
    totalCount,
    isModalOpen,
    editingEmployee,
    handleSave,
    openEditModal,
    openAddModal,
    closeModal,
    isDeleteModalOpen,
    requestDelete,
    confirmDelete,
    cancelDelete,
  };
};
