// Крок 1: Використовуємо 'type-only' імпорт для всіх типів
import type { Employee } from '../types';

const API_BASE_URL = '/api'; // Припускаємо, що у вас налаштовано проксі

// Крок 2: Створюємо типи для DTO (Data Transfer Object) на основі базового типу Employee
// Це робить код більш гнучким та уникає дублювання.
export type CreateEmployeeDto = Omit<Employee, 'id'>;
export type UpdateEmployeeDto = Partial<CreateEmployeeDto>;

// Функція для отримання списку співробітників
export const getEmployees = async (search = ''): Promise<Employee[]> => {
  const response = await fetch(`${API_BASE_URL}/employees?search=${search}`);
  if (!response.ok) {
    throw new Error('Не вдалося завантажити список співробітників');
  }
  // Припускаємо, що бекенд повертає { data: Employee[] }
  const result = await response.json();
  return result.data || [];
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
    // Очікуємо, що помилка може бути масивом
    const message = Array.isArray(errorData.message)
      ? errorData.message.join(', ')
      : errorData.message;
    throw new Error(message || 'Не вдалося створити співробітника');
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
    const message = Array.isArray(errorData.message)
      ? errorData.message.join(', ')
      : errorData.message;
    throw new Error(message || 'Не вдалося оновити дані співробітника');
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
