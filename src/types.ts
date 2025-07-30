// --- Types (Типи) ---

/**
 * Можливі статуси співробітника.
 * Використовуємо об'єднання рядкових літералів замість enum для кращої сумісності.
 */
export type EmployeeStatus = 'active' | 'on_leave' | 'terminated';

/**
 * ID для кожної сторінки/виду в додатку.
 * Дозволяє уникнути "магічних рядків" в навігації.
 */
export type AppView = 'dashboard' | 'employees' | 'reports' | 'settings';

// --- Interfaces (Опис структури об'єктів) ---

/**
 * Описує структуру об'єкта співробітника.
 * Кожен співробітник, отриманий з API, повинен відповідати цьому інтерфейсу.
 */
export interface Employee {
  id: number | string; // ID може бути числом або рядком
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  phone?: string; // Знак '?' означає, що поле не є обов'язковим
  status: EmployeeStatus; // Використовуємо наш тип для статусу
  hireDate: string; // Дату краще зберігати у форматі ISO (e.g., "2023-10-27T10:00:00Z")
}

/**
 * Описує структуру звіту.
 */
export interface Report {
  id: number;
  title: string;
  // ... інші поля для звіту
}
