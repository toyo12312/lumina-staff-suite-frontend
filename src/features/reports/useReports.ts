import { useEmployees } from '../employers/useEmployers';

export const useReports = () => {
  const { employees, isLoading, error } = useEmployees();

  const reportData = employees;

  return { reportData, isLoading, error };
};
