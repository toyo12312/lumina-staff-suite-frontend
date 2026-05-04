import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-150px)] text-center p-4">
      <h1 className="text-8xl font-bold text-amber-500 dark:text-amber-400">
        404
      </h1>
      <p className="text-2xl font-semibold mt-4 text-slate-700 dark:text-slate-200">
        {t('notFound.title')}
      </p>
      <p className="mt-2 text-slate-500 dark:text-slate-400">
        {t('notFound.description')}
      </p>
      <Link
        to="/"
        className="mt-8 px-6 py-3 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
      >
        {t('notFound.button')}
      </Link>
    </div>
  );
};

export default NotFoundPage;
