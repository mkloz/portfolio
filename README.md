<p align="center">
  <img src="./public/logo.png" width="100" />
</p>
<p align="center">
    <h1 align="center">Portfolio</h1>
</p>
<p align="center">
  <a href="https://portfolio.mkloz.com">🌐 Website</a> |
  <a href="https://github.com/mkloz/portfolio">💻 Source Code</a> |
  <a href="mailto:micha21cloz@gmail.com">📧 Contact</a>
</p>
<p align="center">
    <em>Showcasing creativity through code - A comprehensive portfolio website built with modern web technologies</em>
</p>
<p align="center">
    <img src="https://img.shields.io/github/license/mkloz/portfolio?style=flat&color=0080ff" alt="license">
    <img src="https://img.shields.io/github/last-commit/mkloz/portfolio?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
    <img src="https://img.shields.io/github/languages/top/mkloz/portfolio?style=flat&color=0080ff" alt="repo-top-language">
    <img src="https://img.shields.io/github/languages/count/mkloz/portfolio?style=flat&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
        <em>Developed with the software and tools below.</em>
</p>
<p align="center">
    <img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
    <img src="https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=white" alt="React">
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=flat&logo=vite&logoColor=white" alt="Vite">
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white" alt="Tailwind-CSS">
    <img src="https://img.shields.io/badge/shadcn/ui-000000?style=flat&logo=ui&logoColor=white" alt="shadcn/ui">
    <img src="https://img.shields.io/badge/Zustand-000000.svg?style=flat&logo=Zustand&logoColor=white" alt="Zustand">
    <img src="https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=react-router&logoColor=white" alt="React Router">
    <img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" alt="ESLint">
    <img src="https://img.shields.io/badge/Prettier-F7B93E.svg?style=flat&logo=Prettier&logoColor=white" alt="Prettier">
    <img src="https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white" alt="Vercel">
    <img src="https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white" alt="Git">
</p>
<hr>

## 🔗 Quick Links

> - [📋 Overview](#-overview)
> - [🚀 Tech Stack](#-tech-stack)
> - [💻 Getting Started](#-getting-started)
>   - [⚙️ Installation](#️-installation)
>   - [🕜 Running Portfolio](#-running-portfolio)
> - [📂 Project Structure](#-project-structure)
> - [🎨 Features](#-features)
> - [🤝 Contributing](#-contributing)
> - [📄 License](#-license)

---

## 📋 Overview

Portfolio is a modern, responsive portfolio website showcasing my development skills and projects with stunning animations and interactive elements. Built with cutting-edge web technologies, it demonstrates advanced React patterns, TypeScript implementation, and creative UI/UX design principles.

### Key Features

- **Modern Design**: Clean, modern interface with smooth animations and micro-interactions
- **Responsive Layout**: Fully responsive design optimized for all device sizes and orientations
- **Interactive Elements**: Engaging animations and interactive components.
- **Dark Mode**: Seamless dark/light theme switching with smooth transitions and persistence
- **Performance Optimized**: Optimized for speed with lazy loading, code splitting, and efficient rendering
- **Accessibility**: Built with accessibility in mind using semantic HTML and ARIA attributes
- **Project Showcases**: Detailed project presentations with interactive demos and technical insights
- **Contact Integration**: Professional contact form with social media integration

### Project Statistics

- **12+ Technologies** used across the stack
- **10+ Features** implemented
- **12.6k+ Lines of Code** written
- **20+ Commits** to the repository
- **95+ Performance Score** achieved

---

## 🚀 Tech Stack

- **Core**: [TypeScript](https://www.typescriptlang.org/), [React](https://reactjs.org/), [React DOM](https://reactjs.org/docs/react-dom.html), [React Router DOM](https://reactrouter.com/), [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/), [Tailwind CSS Animate](https://github.com/jamiebuilds/tailwindcss-animate)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Icons**: [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/)
- **UI Components**: [Vaul](https://vaul.emilkowal.ski/) (Drawer), [Sonner](https://sonner.emilkowal.ski/) (Toasts)
- **Development**: [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [Husky](https://typicode.github.io/husky/), [lint-staged](https://github.com/okonet/lint-staged)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 💻 Getting Started

### ⚙️ Installation

1. Clone the portfolio repository:

```sh
git clone https://github.com/mkloz/portfolio
```

2. Change to the project directory:

```shellscript
cd portfolio
```

3. Install the dependencies:

```shellscript
npm install
```

### 🕜 Running Portfolio

Use the following command to run the portfolio in development mode:

```shellscript
npm run dev
```

The application will be available at `http://localhost:5173` (or the port specified in your Vite configuration).

### 📦 Building for Production

To build the application for production:

```shellscript
npm run build
```

To preview the production build locally:

```shellscript
npm run preview
```

### 🔧 Development Commands

```shellscript
# Lint the code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format
```

## 📂 Project Structure

```plaintext
src/
├── assets/           # Static assets and logo components
│   └── logos/        # Technology logos and icons
├── components/       # Reusable UI components
│   ├── common/       # Common components (buttons, links, etc.)
│   ├── dev/          # Development-only components
│   └── ui/           # shadcn/ui components
├── config/           # Application configuration
├── data/             # Static data and content
│   ├── projects/     # Project information and data
│   └── technologies.ts # Technology definitions
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and helpers
├── pages/            # Page components and layouts
│   ├── home/         # Home page sections
│   ├── not-found/    # 404 page
│   └── project-detail/ # Project detail pages
├── services/         # Data services and API calls
├── styles/           # Global styles and animations
└── router.tsx        # Application routing
```

## 🎨 Features

### Core Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Seamless theme switching with persistent preferences
- **Interactive Elements**: Engaging hover effects and micro-interactions
- **Performance Optimized**: Lazy loading, code splitting, and efficient rendering
- **Accessibility**: WCAG 2.1 compliant with semantic HTML and ARIA attributes

### Project Showcase

- **Detailed Project Pages**: Comprehensive project information with technical details
- **Interactive Demos**: Live demonstrations of project functionality
- **Technology Stack**: Visual representation of technologies used
- **Project Gallery**: Screenshots and visual highlights
- **Technical Architecture**: Step-by-step breakdown of project implementation

### Contact & Social

- **Contact Form**: Professional contact form with validation
- **Social Links**: Integration with GitHub, LinkedIn, Telegram, and WhatsApp
- **Location Information**: Current location and availability status
- **Professional Stats**: Years of experience, projects completed, and lines of code

## 🤝 Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github.com/mkloz/portfolio/pulls)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/mkloz/portfolio/discussions)**: Share your insights, provide feedback, or ask questions.
- **[Report Issues](https://github.com/mkloz/portfolio/issues)**: Submit bugs found or log feature requests.

<details>
<summary>Contributing Guidelines</summary>

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate tests.

</details>

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
