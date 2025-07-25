/** @type {import('tailwindcss').Config} */
export default {
  // --- ОСНОВНА ЗМІНА ТУТ ---
  // Цей запис гарантовано знайде всі файли з кодом
  // в папці src на будь-якому рівні вкладеності.
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Якщо ви використовували шрифт Cormorant Garamond,
      // його потрібно додати сюди, щоб клас font-serif працював.
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Ваш основний шрифт
        serif: ['Cormorant Garamond', 'serif'], // Ваш додатковий шрифт
      },
    },
  },
  plugins: [],
}
