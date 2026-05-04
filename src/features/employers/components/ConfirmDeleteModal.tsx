import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDeleteModal: FC<ConfirmDeleteModalProps> = ({
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm">
        <div className="flex justify-end p-2">
          <button
            onClick={onCancel}
            className="text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg p-1.5"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 pt-0 text-center">
          <AlertTriangle className="mx-auto mb-4 text-red-600 w-12 h-12" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {t('employees.delete_confirm_message')}
          </h3>

          <button
            onClick={onConfirm}
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
          >
            {t('employees.button_delete')}
          </button>

          <button
            onClick={onCancel}
            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            {t('employees.button_cancel')}
          </button>
        </div>
      </div>
    </div>
  );
};
