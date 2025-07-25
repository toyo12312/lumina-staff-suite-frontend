import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Settings, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Logo = () => (
  <div className="flex items-center gap-3 px-4 mb-8">
    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-800 dark:bg-white">
      <span className="font-bold text-lg text-white dark:text-slate-800">
        B
      </span>
    </div>
    <span className="text-2xl font-bold tracking-wider text-slate-800 dark:text-white">
      LUMINA
    </span>
  </div>
);

const Sidebar = ({ isOpen, setOpen }) => {
  const { t } = useTranslation();

  // --- ОСНОВНА ЗМІНА: Переносимо масив посилань всередину компонента ---
  // Це необхідно, тому що функція t() доступна тільки всередині компонента
  const navLinks = [
    { to: '/dashboard', icon: LayoutDashboard, text: t('sidebar.dashboard') },
    { to: '/employees', icon: Users, text: t('sidebar.employees') },
    { to: '/reports', icon: FileText, text: t('sidebar.reports') },
    { to: '/settings', icon: Settings, text: t('sidebar.settings') },
  ];

  const linkClasses = `
    flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors duration-200
  `;

  const activeLinkClasses = `
    bg-gray-200 text-slate-900 font-semibold dark:bg-gray-700 dark:text-white
  `;

  const inactiveLinkClasses = `
    text-slate-600 hover:bg-gray-200 hover:text-slate-900 
    dark:text-slate-400 dark:hover:bg-gray-700 dark:hover:text-white
  `;

  return (
    <aside
      className={`
        fixed top-0 left-0 h-full w-64 bg-slate-100 dark:bg-gray-800 p-4 z-40
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 border-r border-slate-200 dark:border-gray-700
      `}
    >
      <div className="flex justify-between items-center md:hidden mb-4">
        <span className="text-lg font-semibold">Меню</span>
        <button onClick={() => setOpen(false)} className="p-2">
          <X size={20} />
        </button>
      </div>

      <Logo />

      <nav className="flex flex-col gap-2">
        <p className="px-4 text-xs font-semibold text-slate-400 dark:text-gray-500 uppercase tracking-wider">
          Staff Suite
        </p>
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`
            }
          >
            <link.icon size={20} />
            <span>{link.text}</span>
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-4 px-4 text-xs text-slate-500">
        © {new Date().getFullYear()} Lumina Corp.
      </div>
    </aside>
  );
};

export default Sidebar;
