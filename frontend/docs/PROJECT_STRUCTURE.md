# Project Structure

This document explains the important files and folders of the TARCIN Authentication Portal frontend application.

## Root

| File / Folder | Purpose |
|---------------|---------|
| `package.json` | Project metadata, dependencies (`next`, `react`, `react-dom`), dev dependencies (Tailwind CSS 4, TypeScript, ESLint), and scripts (`dev`, `build`, `start`, `lint`). Package manager: pnpm 12.18.0. |
| `next.config.ts` | Next.js configuration (Turbopack CSS rules via `@tailwindcss/turbopack`, experimental options). |
| `tsconfig.json` | TypeScript compiler options with strict mode enabled and path alias `@/*`. |
| `.gitignore` | Excludes `node_modules`, `.next/`, build output, `.env*` files, `.vercel`, and other generated/sensitive files. |
| `pnpm-lock.yaml` | Locked dependency versions for reproducible installs. |
| `pnpm-workspace.yaml` | pnpm workspace settings (build flags for `sharp` and `unrs-resolver`). |
| `eslint.config.mjs` | ESLint configuration using `eslint-config-next`. |
| `next-env.d.ts` | Generated Next.js TypeScript declarations (gitignored). |
| `AGENTS.md` | Agent-specific instructions for this repository. |

## app/

Next.js App Router directory.

| File | Purpose |
|------|---------|
| `layout.tsx` | Root layout. Sets HTML metadata, imports `globals.css`, and configures Geist/Geist_Mono fonts. |
| `page.tsx` | **Login page** (client component). Contains the email/password sign-in form, Google sign-in button, forgot password UI, loading state, and show/hide password toggle. |
| `globals.css` | Global CSS. Imports Tailwind CSS and defines CSS variables for background/foreground and fonts. |
| `favicon.ico` | Application favicon. |

## public/

Static assets served at the root path (`next.svg`, `globe.svg`, `window.svg`, `file.svg`, `vercel.svg`).

## Generated / Ignored

| Folder | Purpose | Git status |
|--------|---------|------------|
| `node_modules/` | Installed dependencies | Ignored |
| `.next/` | Next.js build cache and output | Ignored |
| `.env*` | Environment variables and secrets | Ignored |

## Key Implementation Files

- `frontend/app/page.tsx` — Full login UI implementation (form state, handlers, responsive layout).
- `frontend/app/layout.tsx` — Root shell shared by all pages.

## Conventions

- Client components use the `"use client"` directive.
- Styling uses Tailwind CSS 4 utility classes.
- TypeScript strict mode is enabled.
