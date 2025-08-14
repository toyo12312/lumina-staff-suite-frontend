export type EmployeeStatus = 'active' | 'on_leave' | 'terminated';


export type AppView = 'dashboard' | 'employees' | 'reports' | 'settings';


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


export interface Report {
  id: number;
  title: string;
  
}
