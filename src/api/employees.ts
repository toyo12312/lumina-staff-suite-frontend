import type { Employee } from '../types';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type CreateEmployeeDto = Omit<Employee, 'id'>;
export type UpdateEmployeeDto = Partial<CreateEmployeeDto>;

export const getEmployees = async (search = ''): Promise<Employee[]> => {
  const response = await fetch(`${API_BASE_URL}/employees?search=${search}`);
  if (!response.ok) {
    throw { status: response.status, message: 'errors.general.networkError' };
  }
  const result = await response.json();

  return Array.isArray(result) ? result : result.data || [];
};

export const createEmployee = async (
  employeeData: CreateEmployeeDto,
): Promise<Employee> => {
  const response = await fetch(`${API_BASE_URL}/employees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employeeData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw {
      status: response.status,
      message: errorData.message || 'errors.general.networkError',
    };
  }
  return response.json();
};

export const updateEmployee = async (
  id: number,
  employeeData: UpdateEmployeeDto,
): Promise<Employee> => {
  const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employeeData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw {
      status: response.status,
      message: errorData.message || 'errors.general.networkError',
    };
  }
  return response.json();
};

export const deleteEmployee = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw {
      status: response.status,
      message: errorData.message || 'errors.general.networkError',
    };
  }
};
