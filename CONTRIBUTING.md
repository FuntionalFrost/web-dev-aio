# Contributing to Web Engine 2026

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## Project Overview

Web Engine 2026 is a static educational portal — 29 interactive engineering labs across 6 tracks covering modern full-stack web development. It is built with SvelteKit 2 + Svelte 5 (Runes & Async Svelte), Tailwind CSS v4, [Yaxa UI](https://yaxa.vercel.app/) (`yaxa-svelte`), and TypeScript 6, and compiled to 100% static HTML/CSS/JS via `@sveltejs/adapter-static`.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 22
- [pnpm](https://pnpm.io/) ≥ 10 (`npm install -g pnpm`)

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
├── content/
│   └── labs/             # Pure Markdown curriculum labs (*.md) with typed frontmatter
├── lib/
│   ├── components/       # Shared UI components (LabShell, CodeBlock, CommandPalette, SEO…)
│   ├── config/site.ts    # Centralised typed SiteConfig (URL, SEO, robots, social links)
│   ├── data/
│   │   ├── curriculum.ts # Module curriculum metadata & track groupings
│   │   └── snippets.ts   # Code snippets for each lab
│   ├── server/
│   │   ├── labs.ts       # Content collection loader (import.meta.glob with in-memory caching)
│   │   ├── markdown.ts   # Frontmatter parser & Shiki markdown HTML renderer
│   │   └── shiki.ts      # Shiki syntax highlighter setup
│   └── simulators/       # Interactive Svelte 5 Runes simulator cards for each lab
└── routes/
    ├── +layout.svelte    # Root layout — YaxaApp shell, sidebar, CommandPalette, Breadcrumb
    ├── +page.svelte      # Home page — searchable, filterable module catalog
    ├── [segment]/[slug]/ # Consolidated dynamic route for all 29 labs (prerendered via entries())
    ├── api/og/           # Prerendered default vector Open Graph preview card
    ├── og/[...slug]/     # Prerendered per-module vector Open Graph preview cards
    ├── site.webmanifest/ # Dynamic PWA web app manifest endpoint
    ├── sitemap.xml/      # Dynamic sitemap with content-driven lastmod dates
    └── sitemap.xsl/      # XSL stylesheet for human-readable sitemaps in browsers
```

---

## How to Add a New Lab Module

1. **Add the Markdown Lab**: Create `src/content/labs/<segment>_<slug>.md` with structured YAML frontmatter:
   ```markdown
   ---
   id: 'my-lab-id'
   title: '30. My Lab Title'
   track: 'Foundations & Tooling'
   category: 'Category Name'
   segment: 'foundations'
   slug: 'my-lab'
   tech: ['Tech 1', 'Tech 2']
   description: 'Brief overview of the lab.'
   snippetLang: 'typescript'
   lastmod: '2026-09-16'
   ---

   <h3>Lab Guide Heading</h3>
   <p>Content goes here...</p>
   ```
2. **Add metadata** to [`src/lib/data/curriculum.ts`](src/lib/data/curriculum.ts) matching your segment and slug.
3. **Add a code snippet** to [`src/lib/data/snippets.ts`](src/lib/data/snippets.ts) keyed by `'<segment>/<slug>'`.
4. **(Optional) Add an Interactive Simulator**: Create `src/lib/simulators/MyLabDemo.svelte` and register it in `src/lib/simulators/index.ts`. No new route folders needed—the dynamic route handles it automatically!

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

## Licence

By contributing, you agree that your contributions will be licensed under the [MIT Licence](LICENSE).
