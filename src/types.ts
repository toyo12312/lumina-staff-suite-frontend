// --- Enums (Перелічення) ---

/**
 * Можливі статуси співробітника.
 * Використання Enum захищає від помилок з рядками.
 */
export enum EmployeeStatus {
  Active = 'active',
  OnLeave = 'on_leave',
  Terminated = 'terminated',
}

/**
 * ID для кожної сторінки/виду в додатку.
 * Дозволяє уникнути "магічних рядків" в навігації.
 */
export enum AppView {
  Dashboard = 'dashboard',
  Employees = 'employees',
  Reports = 'reports',
  Settings = 'settings',
}

// --- Interfaces (Опис структури об'єктів) ---

/**
 * Описує структуру об'єкта співробітника.
 * Кожен співробітник, отриманий з API, повинен відповідати цьому інтерфейсу.
 */
export interface Employee {
  id: number | string; // ID може бути числом або рядком
  firstName: string;
  lastName: string;
  position: string;
  email: string;
  phone?: string; // Знак '?' означає, що поле не є обов'язковим
  status: EmployeeStatus; // Використовуємо наш Enum для статусу
  hireDate: string; // Дату краще зберігати у форматі ISO (e.g., "2023-10-27T10:00:00Z")
}

/**
 * Описує структуру звіту.
 */
export interface Report {
  id: number;
  title: string;
  generatedAt: string;
  data: unknown; // 'unknown' краще, ніж 'any', бо змушує робити перевірку типу
}

// --- Generics (Узагальнені типи) ---

/**
 * Узагальнений тип для відповіді від API.
 * Може використовуватися для будь-яких даних (співробітники, звіти тощо).
 * <T> - це "шаблон", куди ми підставимо конкретний тип (наприклад, Employee[]).
 */
export interface ApiResponse<T> {
  data: T;
  total: number;
  page: number;
  limit: number;
}
