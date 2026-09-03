# Contributing to Web Engine 2026

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## Project Overview

Web Engine 2026 is a static educational portal — 21 interactive engineering labs covering modern full-stack web development. It is built with SvelteKit 2 + Svelte 5 (Runes), Tailwind CSS v4, and TypeScript 6, and compiled to 100% static HTML/CSS/JS via `@sveltejs/adapter-static`.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 20
- [pnpm](https://pnpm.io/) ≥ 9 (`npm install -g pnpm`)

### Setup

```bash
git clone https://github.com/FuntionalFrost/web-dev-aio.git
cd web-dev-aio
pnpm install
pnpm dev
```

The dev server will be available at `http://localhost:5173`.

---

## Scripts

| Command        | Description                              |
| -------------- | ---------------------------------------- |
| `pnpm dev`     | Start development server with hot reload |
| `pnpm build`   | Build production static site to `build/` |
| `pnpm preview` | Preview the production build locally     |
| `pnpm check`   | Run TypeScript + Svelte type checking    |
| `pnpm lint`    | Run Prettier formatting check + ESLint   |
| `pnpm format`  | Auto-format all files with Prettier      |

---

## Project Structure

```
src/
├── lib/
│   ├── components/       # Shared UI components (LabShell, CodeBlock, CommandPalette…)
│   ├── config/site.ts    # Site-wide metadata (URL, name, OG image)
│   ├── data/
│   │   ├── curriculum.ts # Module metadata — titles, tracks, descriptions, hrefs
│   │   └── snippets.ts   # Code snippets shown in each module's CodeBlock
│   ├── server/
│   │   ├── labs.ts       # Shared server load function (highlights code at build time)
│   │   └── shiki.ts      # Shiki highlighter setup
│   └── state/
│       └── theme.svelte.ts # Dark/light theme global state
└── routes/
    ├── +layout.svelte    # Root layout — sidebar, navbar, CommandPalette, MetaTags
    ├── +page.svelte      # Home page — module grid with filter/search
    └── [track]/[slug]/
        ├── +page.server.ts  # Load function — looks up snippet, highlights it
        └── +page.svelte     # Lab page — guide panel + interactive simulator
```

---

## How to Add a New Lab Module

1. **Add metadata** to [`src/lib/data/curriculum.ts`](src/lib/data/curriculum.ts) — `id`, `href`, `track`, `title`, `category`, `tech[]`, `description`.
2. **Add a code snippet** to [`src/lib/data/snippets.ts`](src/lib/data/snippets.ts) — keyed by the route path (e.g. `'foundations/html5'`).
3. **Create the route** — add `src/routes/<track>/<slug>/+page.server.ts` (copy any existing one, it uses `createLabLoader()`) and `+page.svelte`.
4. **Implement the lab** — use `<LabShell>` with `{#snippet guide()}` for the explanation and `{#snippet lab()}` for the interactive simulator.

---

## Code Style

- All code is formatted by **Prettier** (`pnpm format` before committing).
- TypeScript strict mode is on — no `any` without a comment explaining why.
- Svelte 5 **Runes** only (`$state`, `$derived`, `$props`, `$effect`) — no legacy reactive syntax.
- Tailwind CSS v4 **CSS-first** configuration — use `@theme` tokens, not a `tailwind.config.js`.

---

## Pull Request Guidelines

1. Fork the repo and create a feature branch: `git checkout -b feat/your-lab-name`
2. Make sure `pnpm check` and `pnpm lint` both pass with zero errors.
3. Make sure `pnpm build` completes successfully.
4. Open a PR with a clear title and description. Include a screenshot or recording of any UI changes.

---

## Reporting Issues

Please open a GitHub Issue with:

- A clear description of the problem
- Steps to reproduce
- Browser + OS if it's a visual/interaction bug

---

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
