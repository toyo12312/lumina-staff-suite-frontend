
import type { Employee } from '../types';

// Твій новий "літаючий" бекенд на Google Cloud Run
const API_BASE_URL = 'https://employers-backend-528727363440.us-central1.run.app'; 

export type CreateEmployeeDto = Omit<Employee, 'id'>;
export type UpdateEmployeeDto = Partial<CreateEmployeeDto>;

export const getEmployees = async (search = ''): Promise<Employee[]> => {
  // Додано обробку параметрів пошуку
  const response = await fetch(`${API_BASE_URL}/employees?search=${search}`);
  if (!response.ok) {
    throw new Error('Не вдалося завантажити список співробітників');
  }
  const result = await response.json();
  // NestJS зазвичай повертає дані або напряму, або в об'єкті { data: [] }
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
    const message = Array.isArray(errorData.message)
      ? errorData.message.join(', ')
      : errorData.message;
    throw new Error(message || 'Не вдалося створити співробітника');
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
    const message = Array.isArray(errorData.message)
      ? errorData.message.join(', ')
      : errorData.message;
    throw new Error(message || 'Не вдалося оновити дані співробітника');
  }
  return response.json();
};

export const deleteEmployee = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Не вдалося видалити співробітника');
  }
};
