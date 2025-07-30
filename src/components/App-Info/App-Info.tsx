import type { FC } from 'react';
interface AppInfoProps {
  employeesCount: number;
  employeesToRiseCount: number;
}

const AppInfo: FC<AppInfoProps> = ({
  employeesCount,
  employeesToRiseCount,
}) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold text-center mb-2">
        Облік співробітників в компанії LUMINA
      </h1>
      <h2 className="text-xl text-center mb-2">
        Загальна кількість співробітників: {employeesCount}
      </h2>
      <h2 className="text-xl text-center">
        Премію отримають: {employeesToRiseCount}
      </h2>
    </div>
  );
};

export default AppInfo;
