# Web Engine 2026: Modern Web Engineering Guide & Interactive Labs

An interactive, zero-server educational portal and reference architecture for modern full-stack web engineering. Built with **SvelteKit 2**, **Tailwind CSS v4**, and **TypeScript 6**, covering **29 hands-on engineering modules** across **6 curriculum tracks**.

---

## Tech Stack

- **Framework:** [SvelteKit 2](https://kit.svelte.dev/) + [Svelte 5](https://svelte.dev/) (Static Site Generation via `@sveltejs/adapter-static`)
- **UI & Headless Primitives:** [Yaxa UI](https://yaxa.vercel.app/) (`yaxa-svelte` v1.5.2 — accessible Bits UI primitives, Command Palette, Slideover, Badges, and theme engine)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (`@theme` tokens, container queries, CSS-first architecture)
- **Type System:** [TypeScript 6](https://www.typescriptlang.org/) (Strict modules, type-safe RPCs, Standard Schema, const generics)
- **Runtimes & Engines:** Node.js 24 LTS, Bun 1.2, Deno 2.2, UnJS Nitro, Hono v4
- **Databases & Auth:** Drizzle ORM, Neon Serverless Postgres, Turso / libSQL, Upstash Redis, Better Auth (Passkeys/WebAuthn)
- **Code Highlighting:** [Shiki](https://shiki.style/) (Pure JS regex engine, prerendered dual dark/light themes at build time, zero client bundle cost)
- **Adapter:** [`@sveltejs/adapter-static`](https://kit.svelte.dev/docs/adapter-static) (100% precompressed static HTML/CSS/JS output)

---

## Curriculum Overview

The 29 interactive engineering modules are structured across 6 core tracks:

| Track                                | Modules | Key Technologies & Concepts                                                                                                                                                                                                                                                                            |
| :----------------------------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **01. Foundations & Tooling**        | 01 – 05 | HTML5 `<dialog>` / `<details name="...">`, Web Standards (Streams, Web Crypto, URLPattern), Tailwind CSS v4 `@theme`, TypeScript 6 `satisfies`, Responsive SVG Favicons & CSS Masks, PNPM Workspaces & GitHub Actions `ci.yml`                                                                         |
| **02. Runtimes & Engines**           | 06 – 09 | Node.js 24 LTS vs Bun 1.2 vs Deno 2.2 benchmarks & permissions, Vite 6 & library packaging (`unbuild`), UnJS Nitro & Hono Edge APIs, Monorepo & multi-app project structures                                                                                                                           |
| **03. Modern ECMAScript**            | 10 – 13 | `Math.sumPrecise`, `Map.prototype.getOrInsert`, `Iterator.prototype` helpers, `Uint8Array.prototype.toBase64` / `toHex`, `@starting-style`, `using` Explicit Resource Management                                                                                                                       |
| **04. Rendering & Architecture**     | 14 – 16 | SSG vs SSR vs Hybrid/ISR vs CSR latency & cost matrix, SSR Hydration & `devalue` serialisation, Strict CSP nonces & native View Transitions API                                                                                                                                                        |
| **05. APIs & Data Architecture**     | 17 – 22 | Standard Schema `@standard-schema/spec` (Zod/Valibot) & Hono RPC, Server-Sent Events (SSE) & HMAC-SHA256 Webhooks, Drizzle ORM on Neon Serverless Postgres, Upstash Redis Sliding Window Rate Limiting, Better Auth Passkeys, S3/R2 Object Storage                                                     |
| **06. Cloud, Operations & Licences** | 23 – 29 | Cloudflare Workers vs Vercel Serverless vs Netlify Edge, Vitest & Playwright E2E testing harness, Semantic HTML5 metadata & privacy-first analytics, Polar.sh Merchant of Record & Stripe Monetisation, Open Source & Commercial Software Licence Matrix, Containers (Podman/Docker/IaC), Workstations |

---

## Key Features

- **Interactive Architecture Simulators:** Client-side visualisers for sliding-window rate limiters, biometric passkey registrations, HMAC signers, software licence matrix selectors, and query compilers—running entirely in-browser.
- **Build-Time Syntax Highlighting:** Code samples are parsed and highlighted during static build generation using Shiki with a pure JS engine, shipping zero parser JavaScript or WASM to the client.
- **Accessible Typography & Layouts:** Enforces minimum text size of `text-base` (or at least `text-sm`, completely avoiding `text-xs`) with responsive design for desktop and mobile.
- **Full-Spectrum Search & Keyboard Navigation:** Global command palette (`⌘K`) for rapid navigation across all 29 modules and architectural topics.
- **Edge Deployment Ready:** Pre-configured security headers (HSTS, CSP, nosniff, DENY) and immutable cache policies for Cloudflare Pages (`_headers`).
