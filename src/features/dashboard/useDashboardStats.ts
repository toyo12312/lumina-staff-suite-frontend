import React from 'react';
import { useEmployees } from '../employers/useEmployers'; // Цей хук все ще використовує дані зі співробітників...
import { EmployeeStatus } from '../../types';

// ...але він інкапсулює цю залежність всередині себе.
export const useDashboardStats = () => {
  const { employees, isLoading, error } = useEmployees();

  const stats = React.useMemo(() => {
    if (isLoading || error) {
      return { total: 0, active: 0, onLeave: 0, terminated: 0 };
    }
    const total = employees.length;
    const active = employees.filter(
      (e) => e.status === EmployeeStatus.Active,
    ).length;
    const onLeave = employees.filter(
      (e) => e.status === EmployeeStatus.OnLeave,
    ).length;
    const terminated = employees.filter(
      (e) => e.status === EmployeeStatus.Terminated,
    ).length;
    return { total, active, onLeave, terminated };
  }, [employees, isLoading, error]);

  return { stats, isLoading, error };
};
