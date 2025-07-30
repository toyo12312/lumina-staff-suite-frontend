import { useEffect, type FC } from 'react';
import { createPortal } from 'react-dom';
import { Command } from 'cmdk';
import { LayoutDashboard, Users, FileText, Settings, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface CommandPaletteProps {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  toggleTheme: () => void;
}

export const CommandPalette: FC<CommandPaletteProps> = ({
  isOpen,
  setOpen,
  toggleTheme,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code === 'KeyK' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!isOpen);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [isOpen, setOpen]);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 flex items-start justify-center pt-16 z-50"
      onClick={() => setOpen(false)}
    >
      <Command.Dialog
        open={isOpen}
        onOpenChange={setOpen}
        label="Global Command Menu"
        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-2xl w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <Command.Input
          placeholder={t('commandPalette.placeholder')}
          className="w-full p-3 bg-transparent border-b border-gray-200 dark:border-gray-700 focus:outline-none"
        />
        <Command.List className="p-2 max-h-[300px] overflow-y-auto">
          <Command.Empty>{t('commandPalette.empty')}</Command.Empty>
          <Command.Group heading={t('commandPalette.navigation_group')}>
            <Command.Item
              onSelect={() => runCommand(() => navigate('/dashboard'))}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              <LayoutDashboard size={16} />
              <span>{t('commandPalette.go_to_dashboard')}</span>
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => navigate('/employees'))}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              <Users size={16} />
              <span>{t('commandPalette.go_to_employees')}</span>
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => navigate('/reports'))}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              <FileText size={16} />
              <span>{t('commandPalette.go_to_reports')}</span>
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => navigate('/settings'))}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              <Settings size={16} />
              <span>{t('commandPalette.go_to_settings')}</span>
            </Command.Item>
          </Command.Group>
          <Command.Group heading={t('commandPalette.actions_group')}>
            <Command.Item
              onSelect={() => runCommand(toggleTheme)}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              <Sun size={16} />
              <span>{t('commandPalette.toggle_theme')}</span>
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command.Dialog>
    </div>,
    document.body,
  );
};
