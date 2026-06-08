import type { FC, Dispatch, SetStateAction } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SidebarProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isCollapsed: boolean;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
}

const Sidebar: FC<SidebarProps> = ({
  isOpen,
  setOpen,
  isCollapsed,
  setIsCollapsed,
}) => {
  const { t } = useTranslation();

  const navLinks = [
    { to: '/dashboard', icon: LayoutDashboard, text: t('sidebar.dashboard') },
    { to: '/employees', icon: Users, text: t('sidebar.employees') },
    { to: '/reports', icon: FileText, text: t('sidebar.reports') },
    { to: '/settings', icon: Settings, text: t('sidebar.settings') },
  ];

  const activeLinkClasses = `bg-gray-200 text-slate-900 font-semibold dark:bg-gray-700 dark:text-white`;
  const inactiveLinkClasses = `text-slate-600 hover:bg-gray-200 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-gray-700 dark:hover:text-white`;

  return (
    <aside
      className={`
        fixed top-0 left-0 h-full bg-slate-100 dark:bg-gray-800 py-4 px-3 z-40
        transition-all duration-300 ease-in-out border-r border-slate-200 dark:border-gray-700
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 
        ${isCollapsed ? 'w-20' : 'w-64'} 
        flex flex-col
      `}
    >
      <div className="flex justify-between items-center md:hidden mb-4 px-1">
        <span className="text-lg font-semibold dark:text-white">Меню</span>
        <button
          onClick={() => setOpen(false)}
          className="p-2 dark:text-white flex-shrink-0"
        >
          <X size={20} />
        </button>
      </div>

      <div
        className={`flex items-center mb-8 px-1 ${isCollapsed ? 'justify-center' : 'justify-between'}`}
      >
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="min-w-[2rem] w-8 h-8 rounded-full flex items-center justify-center bg-blue-600 dark:bg-blue-500 shadow-md">
            <span className="font-bold text-lg text-white">L</span>
          </div>
          {!isCollapsed && (
            <span className="text-2xl font-bold tracking-wider text-slate-800 dark:text-white whitespace-nowrap">
              LUMINA
            </span>
          )}
        </Link>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-slate-500 dark:text-slate-400 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex flex-col gap-2 flex-grow mt-2">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={() => setOpen(false)}
            title={isCollapsed ? link.text : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 overflow-hidden ${isActive ? activeLinkClasses : inactiveLinkClasses} ${isCollapsed ? 'justify-center' : ''}`
            }
          >
            <div className="min-w-[20px] flex justify-center items-center">
              <link.icon size={20} />
            </div>
            {!isCollapsed && (
              <span className="whitespace-nowrap">{link.text}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {!isCollapsed && (
        <div className="mt-auto px-1 text-xs text-slate-500 whitespace-nowrap text-center">
          © {new Date().getFullYear()} Lumina Corp.
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
