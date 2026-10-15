export type EmployeeStatus = 'active' | 'on_leave' | 'terminated';

export type AppView = 'dashboard' | 'employees' | 'reports' | 'settings';

export interface Employee {
  id: number | string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  phone?: string;
  status: EmployeeStatus;
  hireDate: string;
}

export type CreateEmployeeDto = Omit<Employee, 'id'> & {
  faxNumber?: string;
  captchaToken?: string;
  captchaAnswer?: number;
};

export type UpdateEmployeeDto = Partial<CreateEmployeeDto>;

export interface Report {
  id: number;
  title: string;
}
