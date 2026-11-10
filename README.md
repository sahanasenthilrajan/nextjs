# TARCIN Authentication Portal

Professional full-screen login application built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4.

> **TARCIN ROBOTIC LLP** — Secure workspace access portal.

## Project Overview

TARCIN Authentication Portal is a responsive, split-screen login frontend for the TARCIN workspace platform. It provides a polished sign-in experience with email/password authentication fields, Google sign-in UI, Remember Me, and TARCIN ROBOTIC LLP branding.

This is currently a **frontend-only** implementation. Real authentication, user registration, and backend connectivity are planned for future phases (see [Implementation Status](#implementation-status)).

## Technology Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js (App Router) | 16.4.5 |
| UI Library | React | 19.3.0 |
| Language | TypeScript | 5 |
| Styling | Tailwind CSS | 4 |
| Package Manager | pnpm | 12.18.0 |

## Features

### Implemented

- Full-screen responsive split-screen login page
- TARCIN ROBOTIC LLP branding with purple gradient section
- Email and password input fields with client-side validation
- Show/hide password toggle
- Remember Me checkbox
- Continue with Google button (UI placeholder)
- Forgot Password link (UI placeholder)
- Login loading state
- Responsive layout for desktop and mobile

## Implementation Status

| Component | Status |
|-----------|--------|
| Frontend login UI | Implemented |
| Google OAuth | Not integrated yet |
| User registration | Pending |
| NestJS backend | Planned |
| MongoDB connection | Planned |
| Real authentication | Pending |

> Google sign-in, forgot password, and registration are UI placeholders only. No backend or third-party authentication is connected yet.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [pnpm](https://pnpm.io/) (v12)

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/tarcin-authentication-portal.git
cd tarcin-authentication-portal/frontend

# Install dependencies
pnpm install
```

### Local Development

```bash
# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other Scripts

Run all commands from the `frontend/` directory.

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start the development server (Turbopack) |
| `pnpm build` | Build the application for production |
| `pnpm start` | Start the production server |
| `pnpm lint` | Run ESLint |

## Project Structure

Detailed documentation is available at [`frontend/docs/PROJECT_STRUCTURE.md`](./frontend/docs/PROJECT_STRUCTURE.md).

```
NexaLogin/
├── frontend/                 # Next.js application
│   ├── app/
│   │   ├── layout.tsx        # Root layout, metadata, and fonts
│   │   ├── page.tsx          # Login page (client component)
│   │   └── globals.css       # Global styles and Tailwind imports
│   ├── public/               # Static assets
│   ├── docs/                 # Project documentation
│   │   └── PROJECT_STRUCTURE.md
│   ├── next.config.ts        # Next.js configuration
│   ├── tsconfig.json         # TypeScript configuration
│   ├── package.json          # Dependencies and scripts
│   ├── .gitignore            # Git ignore rules
│   └── README.md             # Next.js default README
└── README.md                 # This file
```

## Screenshots

Add screenshots to `frontend/docs/screenshots/` and reference them here:

```markdown
![Desktop login view](./docs/screenshots/login-desktop.png)
![Mobile login view](./docs/screenshots/login-mobile.png)
```

## Roadmap

1. **Phase 1 — Frontend login UI** (complete): Responsive split-screen sign-in page with TARCIN branding.
2. **Phase 2 — Google OAuth**: Connect the "Continue with Google" button to a real OAuth provider.
3. **Phase 3 — User registration**: Add a sign-up page and registration flow.
4. **Phase 4 — Backend**: NestJS API with MongoDB connection.
5. **Phase 5 — Real authentication**: JWT/session-based authentication with protected routes.

## Contributing

Contributions are welcome. Please open an issue to discuss proposed changes before submitting a pull request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## Author

TARCIN ROBOTIC LLP — Secure workspace access. All rights reserved.