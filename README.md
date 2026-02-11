# Next.js Project | Bytebank

### Note***

This project is a micro-frontend based application, it's important to make sure all zones within it is simultaneously running:

### Getting Started

Before you begin, certificates your system meets the following requirements:

- [`Node.js 20`](https://nodejs.org/pt) or later.
- macOS, Windows (including WSL), or Linux.

You can manually run each app zone individually or use Docker to build full project, to do it:

- Open `/k8s` directory in terminal and run `docker compose up -d` command.

### Main Technologies

1. Next.js (frontend)
2. Node.js (backend)
4. Docker

### Project Architecture Overview

We implemented the API following a layered architecture to help us keeping things organized and modular. We can highlight the following main layers:

1. Presentation layer - src/controller
2. Application layer - src/feature
3. Models layer - src/models
4. Infrastructure layer - src/infrastructure

For the Frontend we did a similar approach trying not to tie the visualization aspect of the system with the business logics or pure external logic using classes as services

#### Frontend Architecture

The frontend applications are built with **Next.js 15** and follow a modular, component-driven architecture. The project is organized into independent zones (`full-site/` and `investments/`) to enable micro-frontend patterns and independent deployment.

**Key Architectural Layers:**

1. **Components Layer** (`components/`) - Reusable UI components encapsulating presentation logic
   - Organized by feature: `auth/`, `button/`, `input/`, `modal/`, `select/`, etc.
   - Stateless and highly composable

2. **Features Layer** (`features/`) - Business logic organized by domain
   - Contains feature-specific state management and logic
   - Examples: `auth/`, `modal/`, `user/`
   - Decouples business logic from component rendering

3. **Layouts Layer** (`layouts/`) - Page structure and template components
   - `structure/` - Global layout components (Header, Footer, Navigation)
   - `blocks/` - Reusable layout blocks and sections

4. **Services Layer** (`services/`) - External integrations and API communication
   - `authService.ts` - Authentication logic and API calls
   - Abstracts HTTP communication using Axios

5. **Hooks Layer** (`hooks/`) - Custom React hooks for reusable logic
   - `use-state-controller.ts` - State management utilities
   - `use-local-storage.ts` - Local storage persistence
   - Promotes code reuse across components

6. **Store Layer** (`store/`) - Redux state management
   - Centralized application state using Redux Toolkit
   - Manages global state for authentication, user data, and app settings

7. **Utils Layer** (`utils/`) - Utility functions and helpers
   - `currency.ts`, `date.ts`, `camelize.ts` - Data transformation utilities
   - `bank-statement-calc.ts` - Financial calculations
   - `get-cookie.ts`, `scroll-position.ts` - Browser utilities

8. **Types Layer** (`types/`) - TypeScript type definitions
   - `types.ts` - Shared TypeScript interfaces and types
   - Ensures type safety across the application

9. **Data Layer** (`data/`) - Static or seed data
   - `global-data.ts` - Application-wide constants and data

10. **Assets Layer** (`assets/`) - Static resources
    - `icons/` - SVG icons
    - `images/` - Images and graphics

**Key Technologies:**
- **Next.js 15** with Turbopack - Server-side rendering and static generation
- **React 19** - Component library
- **Redux Toolkit** - State management
- **Tailwind CSS** - Utility-first styling
- **TypeScript** - Type safety
- **Vitest + Storybook** - Component testing and documentation

**Styling Architecture:**
- Tailwind CSS with TailwindCSS v4
- Utility-first approach with custom CSS overrides
- `styles/` directory contains:
  - `globals.css` - Global styles
  - `base.css` - Base element styles
  - `utilities.css` - Custom utility classes
  - Component-scoped styling where appropriate

#### Performance & Lazy loading

Optimizations applied to reduce the initial bundle size and improve First Load:

- **Modal and auth** – The `Modal` component (and login/register forms) is loaded with `next/dynamic` and `ssr: false`, so auth code is not included in the first-page bundle.
- **Toast** – `ToastContainer` and react-toastify CSS are loaded in a separate chunk via `components/toast-container-lazy.tsx`, only after hydration.
- **Recharts (investments)** – The investments chart (`InvestmentChart` / PieChart) is dynamically imported; the Recharts library is only downloaded when the user visits the investments page.

**Additional tips:**

- **Images** – For PNG/JPEG, use `next/image` with `loading="lazy"` (default) and `sizes` for better LCP and less data.
- **Routes** – Next.js App Router already code-splits by route; each `page.tsx` becomes a separate chunk.
- **Below-the-fold** – Heavy components further down the page can be wrapped in `dynamic(..., { ssr: false })` and optionally in `<Suspense>` with a fallback (e.g. skeleton).

### Folders structure

````
app-with-zones/
├── full-site/
│   └── */
├── investments/
│   └── */
├── api/
│   └── */
k8s/
└── */
````
