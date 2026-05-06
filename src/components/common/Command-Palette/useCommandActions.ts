import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const useCommandActions = (
  setOpen: (open: boolean) => void,
  toggleTheme: () => void,
) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const actions = [
    {
      id: 'theme',
      // Виправили на commandPalette.toggle_theme
      name: t('commandPalette.toggle_theme', 'Switch Theme (Dark/Light)'),
      icon: '🌗',
      action: () => {
        toggleTheme();
        setOpen(false);
      },
    },
    {
      id: 'dashboard',
      // Виправили nav на sidebar
      name: t('sidebar.dashboard', 'Dashboard'),
      path: '/dashboard',
      icon: '📊',
      action: () => handleNavigate('/dashboard'),
    },
    {
      id: 'employees',
      // Виправили nav на sidebar
      name: t('sidebar.employees', 'Employees'),
      path: '/employees',
      icon: '👥',
      action: () => handleNavigate('/employees'),
    },
    {
      id: 'reports',
      // Виправили nav на sidebar
      name: t('sidebar.reports', 'Reports'),
      path: '/reports',
      icon: '📁',
      action: () => handleNavigate('/reports'),
    },
    {
      id: 'settings',
      // Виправили nav на sidebar
      name: t('sidebar.settings', 'Settings'),
      path: '/settings',
      icon: '⚙️',
      action: () => handleNavigate('/settings'),
    },
  ];

  return actions;
};
