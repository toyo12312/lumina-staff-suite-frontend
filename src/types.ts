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


export interface Report {
  id: number;
  title: string;
  
}
