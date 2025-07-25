# Lumina Staff Suite - Frontend

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Tech Stack](https://img.shields.io/badge/tech-React%20%7C%20TypeScript%20%7C%20Vite-blueviolet)

This repository contains the frontend for Lumina Staff Suite, a modern, feature-rich web application for HR management. It's a Single Page Application (SPA) built with React and TypeScript, focusing on a clean, feature-based architecture, professional UI/UX, and advanced functionalities to showcase a Solid Middle-level skillset.

---

### ✨ **[Live Demo](https://your-live-demo-url.netlify.app/)** ✨

_(Note: The first data load might take up to 30 seconds as the backend is hosted on a free-tier service that spins down after inactivity.)_

---

### 📸 Screenshots

_(Тут ви додасте 2-3 гарних скріншоти вашого додатку)_

![Screenshot of the Dashboard](https://via.placeholder.com/800x450.png?text=Dashboard+Screenshot)
_Dashboard Page_

![Screenshot of the Employees List](https://via.placeholder.com/800x450.png?text=Employees+Page+Screenshot)
_Employees Page_

---

### 🚀 Features

- **📊 Interactive Dashboard:** A comprehensive overview with key metrics and a status distribution chart (built with Recharts).
- **👥 Full CRUD Functionality:** A complete module for managing employees (Create, Read, Update, Delete) with modals, search, and real-time updates.
- **📄 Reports & Export:** A dedicated reports page with the ability to export all employee data to a `.CSV` file.
- **⚙️ Advanced Settings:**
  - **🌓 Light/Dark Theme:** Seamless theme switching with persistence in `localStorage`.
  - **🌐 Multi-language Support (i18n):** Fully internationalized interface supporting 6 languages (UK, EN, PL, DE, FR, RO) using `i18next`.
- **⌨️ Command Palette:** A professional `Ctrl+K` interface for quick navigation and actions, built with `cmdk`.
- **📱 Fully Responsive Design:** A clean, modern UI built with Tailwind CSS that works perfectly on all devices.
- **🔍 SEO Friendly:** Basic SEO implemented using `react-helmet-async` for dynamic page titles and meta descriptions.
- **🧩 Clean Architecture:** A feature-based project structure with custom hooks for state management, promoting code reusability and maintainability.

---

### 🛠️ Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **State Management:** Custom Hooks (React Query pattern)
- **Charts:** Recharts
- **Internationalization:** i18next & react-i18next
- **Command Palette:** cmdk
- **SEO:** React Helmet Async

---

### 🏁 Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/toyo12312/lumina-staff-suite-frontend.git](https://github.com/toyo12312/lumina-staff-suite-frontend.git)
    cd lumina-staff-suite-frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project by copying the example file:

    ```bash
    cp .env.example .env
    ```

    Open the new `.env` file and set the `VITE_API_BASE_URL` to the URL of your running backend server (e.g., `http://localhost:3000`).

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

---

### 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
