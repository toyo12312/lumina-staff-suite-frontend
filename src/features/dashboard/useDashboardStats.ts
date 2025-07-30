import React from 'react';

import { useEmployees } from '../employers/useEmployers';

export const useDashboardStats = () => {
  const { employees, isLoading, error } = useEmployees();
  const stats = React.useMemo(() => {
    if (isLoading || error) {
      return { total: 0, active: 0, onLeave: 0, terminated: 0 };
    }
    const total = employees.length;
    const active = employees.filter((e) => e.status === 'active').length;
    const onLeave = employees.filter((e) => e.status === 'on_leave').length;
    const terminated = employees.filter(
      (e) => e.status === 'terminated',
    ).length;
    return { total, active, onLeave, terminated };
  }, [employees, isLoading, error]);

  return { stats, isLoading, error };
};
