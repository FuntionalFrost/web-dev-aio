# Web Engine 2026: Modern Web Engineering Guide & Interactive Labs

An interactive, zero-server educational portal and reference architecture for modern full-stack web development. Built with **SvelteKit 2**, **Svelte 5 (Runes & Async Svelte)**, **Tailwind CSS v4**, and **TypeScript 6**, covering **35 hands-on engineering modules** across **8 curriculum tracks**.

---

## Tech Stack

- **Framework:** [SvelteKit 2](https://kit.svelte.dev/) + [Svelte 5](https://svelte.dev/) (Universal Runes: `$state`, `$derived`, `$props`, `$bindable`, snippets, Async Svelte streaming)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (`@theme` tokens, container queries, CSS-first architecture)
- **Type System:** [TypeScript 6](https://www.typescriptlang.org/) (Strict modules, type-safe RPCs, Standard Schema, const generics)
- **Runtimes & Engines:** Node.js 24 LTS, Bun 1.2, Deno 2.2, UnJS Nitro, Hono v4
- **Vue & Nuxt:** Vue 3.5 (Reactive Prop Destructure), Nuxt 4 `app/` architecture, useAsyncData
- **Databases & Auth:** Drizzle ORM, Neon Serverless Postgres, Upstash Redis, Better Auth (Passkeys/WebAuthn)
- **Code Highlighting:** [Shiki](https://shiki.style/) (Prerendered dual dark/light themes at build time, 0 client bundle cost)
- **Adapter:** [`@sveltejs/adapter-static`](https://kit.svelte.dev/docs/adapter-static) (100% precompressed static HTML/CSS/JS output)

---

## Curriculum Overview

The 35 interactive engineering modules are structured across 8 core tracks:

| Track                                | Modules | Key Technologies & Concepts                                                                                                                                                                                                                              |
| :----------------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **01. Foundations & Tooling**        | 01 – 05 | HTML5 `<dialog>` / `<details name="...">`, Web Standards (Streams, Web Crypto, URLPattern), Tailwind CSS v4 `@theme`, TypeScript 6 `satisfies`, Responsive SVG Favicons & CSS Masks, PNPM Workspaces & GitHub Actions `ci.yml`                           |
| **02. Runtimes & Engines**           | 06 – 09 | Node.js 24 LTS vs Bun 1.2 vs Deno 2.2 benchmarks & permissions, Vite 6 & library packaging (`svelte-package`/`unbuild`), UnJS Nitro & Hono Edge APIs, SvelteKit vs Nuxt 4 vs Monorepo project structures                                                 |
| **03. Modern ECMAScript**            | 10 – 13 | `Math.sumPrecise`, `Map.prototype.getOrInsert`, `Iterator.prototype` helpers, `Uint8Array.prototype.toBase64` / `toHex`, `@starting-style`, `using` Explicit Resource Management                                                                         |
| **04. Svelte & SvelteKit**           | 14 – 19 | Svelte 5 Universal Runes & Class State, Async Svelte & `{#await}` streaming, Dynamic Routing `[param]`/`[...rest]`, Data Loaders & Form Actions (`use:enhance`), Server Hooks (`hooks.server.ts`), SvelteKit Adapters (Static, Node, Cloudflare, Vercel) |
| **05. Vue & Nuxt**                   | 20 – 22 | Vue 3.5 reactive prop destructuring & `useTemplateRef()`, Nuxt 4 `app/` structure & `useAsyncData` deduplication, Nuxt UI v3 & Headless Bits UI / CVA design tokens                                                                                      |
| **06. Rendering & Architecture**     | 23 – 25 | SSG vs SSR vs Hybrid/ISR vs CSR latency & cost matrix, SSR Hydration & `devalue` serialisation, Strict CSP nonces & native View Transitions API                                                                                                          |
| **07. APIs & Data Architecture**     | 26 – 30 | Standard Schema `@standard-schema/spec` (Zod/Valibot) & Hono RPC, Server-Sent Events (SSE) & HMAC-SHA256 Webhooks, Drizzle ORM on Neon Serverless Postgres, Upstash Redis Sliding Window Rate Limiting, Better Auth Passkeys                             |
| **08. Cloud, Operations & Licences** | 31 – 35 | Cloudflare Workers vs Vercel Serverless vs Netlify Edge, Vitest & Playwright E2E testing harness, `svelte-meta-tags` & privacy-first analytics, Polar.sh Merchant of Record & Stripe Monetisation, Open Source & Commercial Software Licence Matrix      |

---

## Key Features

- **Interactive Architecture Simulators:** Client-side visualisers for sliding-window rate limiters, biometric passkey registrations, HMAC signers, reactive runes, software licence matrix selectors, and query compilers—running entirely in-browser.
- **Build-Time Syntax Highlighting:** Code samples are parsed and highlighted during static build generation using Shiki, shipping zero parser JavaScript to the client.
- **Accessible Typography & Layouts:** Enforces minimum text size of `text-base` (or at least `text-sm`, completely avoiding `text-xs`) with responsive design for desktop and mobile.
- **Full-Spectrum Search & Keyboard Navigation:** Global command palette (`⌘K`) for rapid navigation across all 35 modules and architectural topics.
- **Edge Deployment Ready:** Pre-configured security headers (HSTS, CSP, nosniff, DENY) and immutable cache policies for Cloudflare Pages (`_headers`).
