module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime', // Необхідно для нового JSX-трансформера
    'prettier', // Завжди має бути останнім, щоб вимикати конфліктні правила
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json', // Вказує на ваш tsconfig
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'react/prop-types': 'off', // Вимикаємо, оскільки використовуємо TypeScript
  },
  settings: {
    react: {
      version: 'detect', // Автоматично визначає версію React
    },
  },
};
