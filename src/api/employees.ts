import { Employee, EmployeeStatus } from '../types';

const API_BASE_URL = '/api';

// Оновлюємо DTO, щоб він відповідав вимогам бекенду
export interface CreateEmployeeDto {
  firstName: string;
  lastName: string;
  position: string;
  email: string;
  // Додаємо обов'язкові поля
  status: EmployeeStatus;
  hireDate: string;
}

export type UpdateEmployeeDto = Partial<CreateEmployeeDto>;

// Функція для отримання списку співробітників
export const getEmployees = async (search = ''): Promise<Employee[]> => {
  const response = await fetch(`${API_BASE_URL}/employees?search=${search}`);
  if (!response.ok) {
    throw new Error('Не вдалося завантажити список співробітників');
  }
  const result = await response.json();
  return result.data;
};

// Функція для створення нового співробітника
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
    throw new Error(
      errorData.message.join(', ') || 'Не вдалося створити співробітника',
    );
  }
  return response.json();
};

// Функція для оновлення даних співробітника
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
    throw new Error(
      errorData.message.join(', ') || 'Не вдалося оновити дані співробітника',
    );
  }
  return response.json();
};

// Функція для видалення співробітника
export const deleteEmployee = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Не вдалося видалити співробітника');
  }
};
