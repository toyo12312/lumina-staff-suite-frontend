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
      name: t('command.switchTheme', 'Switch Theme (Dark/Light)'),
      icon: '🌗',
      action: () => {
        toggleTheme();
        setOpen(false);
      },
    },
    {
      id: 'dashboard',
      name: t('nav.dashboard', 'Dashboard'),
      path: '/dashboard',
      icon: '📊',
      action: () => handleNavigate('/dashboard'),
    },
    {
      id: 'employees',
      name: t('nav.employees', 'Employees'),
      path: '/employees',
      icon: '👥',
      action: () => handleNavigate('/employees'),
    },
    {
      id: 'reports',
      name: t('nav.reports', 'Reports'),
      path: '/reports',
      icon: '📁',
      action: () => handleNavigate('/reports'),
    },
    {
      id: 'settings',
      name: t('nav.settings', 'Settings'),
      path: '/settings',
      icon: '⚙️',
      action: () => handleNavigate('/settings'),
    },
  ];

  return actions;
};
