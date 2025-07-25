import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';

// --- Ініціалізуємо конфігурацію i18n ---
// Цей імпорт має бути тут, щоб переклади завантажились до рендеру додатку.
import './i18n/i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* --- Огортаємо додаток у Router --- */}
    {/* Router має бути один, на найвищому рівні. */}
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
);
