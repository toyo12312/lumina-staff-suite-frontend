import type { Employee } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SECRET_HEADERS = {
  'x-lumina-secret': 'super-safe-lumina-2026',
};

export type CreateEmployeeDto = Omit<Employee, 'id'>;
export type UpdateEmployeeDto = Partial<CreateEmployeeDto>;

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  lastPage: number;
}

export const getEmployees = async (
  search = '',
  page = 1,
  limit = 10,
): Promise<PaginatedResponse<Employee>> => {
  const response = await fetch(
    `${API_BASE_URL}/employees?search=${search}&page=${page}&limit=${limit}`,
    {
      headers: {
        ...SECRET_HEADERS,
      },
    },
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = Array.isArray(errorData.message)
      ? errorData.message[0]
      : errorData.message;

    throw {
      status: response.status,
      message: errorMessage || 'errors.general.networkError',
    };
  }

  return response.json();
};

export const createEmployee = async (
  employeeData: CreateEmployeeDto,
): Promise<Employee> => {
  const response = await fetch(`${API_BASE_URL}/employees`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...SECRET_HEADERS,
    },
    body: JSON.stringify(employeeData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = Array.isArray(errorData.message)
      ? errorData.message[0]
      : errorData.message;

    throw {
      status: response.status,
      message: errorMessage || 'errors.general.networkError',
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
    headers: {
      'Content-Type': 'application/json',
      ...SECRET_HEADERS,
    },
    body: JSON.stringify(employeeData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = Array.isArray(errorData.message)
      ? errorData.message[0]
      : errorData.message;

    throw {
      status: response.status,
      message: errorMessage || 'errors.general.networkError',
    };
  }
  return response.json();
};

export const deleteEmployee = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
    method: 'DELETE',
    headers: {
      ...SECRET_HEADERS,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = Array.isArray(errorData.message)
      ? errorData.message[0]
      : errorData.message;

    throw {
      status: response.status,
      message: errorMessage || 'errors.general.networkError',
    };
  }
};
