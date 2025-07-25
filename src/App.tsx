import React, { useState, useEffect, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// --- ОСНОВНА ЗМІНА: Оновлено всі шляхи після рефакторингу ---
import Sidebar from './components/common/Sidebar/Sidebar';
import { CommandPalette } from './components/common/Command-Palette/Command-Palette';
import { useTheme } from './features/settings/useTheme';

// Ледаче завантаження (Lazy Loading) для сторінок для кращої продуктивності
const DashboardPage = React.lazy(
  () => import('./features/dashboard/Dashboard-Page'),
);
const EmployeesPage = React.lazy(
  () => import('./features/employers/Employers-Page'),
);
const ReportsPage = React.lazy(() => import('./features/reports/Reports-Page'));
const SettingsPage = React.lazy(
  () => import('./features/settings/Settings-Page'),
);
const NotFoundPage = React.lazy(
  () => import('./features/notfound/NotFoundPage'),
);

// Компонент-заглушка, який буде показуватись, поки завантажуються сторінки/переклади
const PageLoader = () => (
  <div className="flex items-center justify-center h-screen w-full">
    <p className="text-slate-800 dark:text-slate-200 text-lg">
      Завантаження...
    </p>
  </div>
);

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { toggleTheme } = useTheme();
  const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Обробник для виклику командної палітри
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandPaletteOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-slate-800 dark:text-slate-200">
      <Sidebar isOpen={isSidebarOpen} setOpen={setSidebarOpen} />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        setOpen={setCommandPaletteOpen}
        toggleTheme={toggleTheme}
      />

      <div className="relative md:ml-64">
        <header className="p-4 md:hidden sticky top-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm z-30 border-b border-slate-200 dark:border-gray-700">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-gray-700"
            aria-label="Open sidebar"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </header>

        <main>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/employees" element={<EmployeesPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>

      {isSidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
}

export default App;
