import { useEffect, type FC } from 'react';
import { createPortal } from 'react-dom';
import { Command } from 'cmdk';
import { LayoutDashboard, Sun } from 'lucide-react';
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

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-start justify-center pt-[15vh] z-[9999]"
      onClick={() => setOpen(false)}
    >
      <Command.Dialog
        open={isOpen}
        onOpenChange={setOpen}
        label="Global Command Menu"
        className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-xl shadow-2xl w-full max-w-lg border border-gray-200 dark:border-gray-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center border-b border-gray-200 dark:border-gray-800 px-4">
          <Command.Input
            placeholder={t('commandPalette.placeholder')}
            className="w-full py-4 bg-transparent focus:outline-none text-sm"
          />
          <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700">
            ESC
          </kbd>
        </div>

        <Command.List className="p-2 max-h-[400px] overflow-y-auto overflow-x-hidden">
          <Command.Empty className="py-6 text-center text-sm text-gray-500">
            {t('commandPalette.empty')}
          </Command.Empty>

          <Command.Group
            heading={
              <span className="px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('commandPalette.navigation_group')}
              </span>
            }
          >
            <Command.Item
              onSelect={() => runCommand(() => navigate('/dashboard'))}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer aria-selected:bg-blue-50 dark:aria-selected:bg-blue-900/20 transition-colors"
            >
              <LayoutDashboard size={18} className="text-blue-500" />
              <span className="text-sm font-medium">
                {t('commandPalette.go_to_dashboard')}
              </span>
            </Command.Item>
          </Command.Group>

          <div className="h-px bg-gray-200 dark:bg-gray-800 my-2" />

          <Command.Group
            heading={
              <span className="px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('commandPalette.actions_group')}
              </span>
            }
          >
            <Command.Item
              onSelect={() => runCommand(toggleTheme)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 cursor-pointer aria-selected:bg-orange-50 dark:aria-selected:bg-orange-900/20 transition-colors"
            >
              <Sun size={18} className="text-orange-500" />
              <span className="text-sm font-medium">
                {t('commandPalette.toggle_theme')}
              </span>
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command.Dialog>
    </div>,
    document.body,
  );
};
