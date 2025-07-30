import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useTheme } from './useTheme';
import { ThemeToggle } from './components/ThemeToggle';
import { LanguageSwitcher } from './components/LanguageSwitcher';

const SettingsPage = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Helmet>
        <title>{t('Settings')}</title>
        <meta name="description" content={t('seo.settings_description')} />
      </Helmet>
      <div className="p-4 md:p-6 lg:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-6">
          {t('settings.title')}
        </h1>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">
              {t('settings.general')}
            </h2>
            <div className="flex items-center justify-between py-4 border-b dark:border-gray-700">
              <div>
                <p className="font-medium">{t('settings.theme_interface')}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('settings.theme_description')}
                </p>
              </div>
              <ThemeToggle checked={theme === 'dark'} onChange={toggleTheme} />
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4">
              <div className="mb-4 md:mb-0">
                <p className="font-medium">
                  {t('settings.language_interface')}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('settings.language_description')}
                </p>
              </div>
              <div className="w-full md:w-48">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
