# Web Engine 2026: Modern Web Engineering Guide & Interactive Labs

[![Live Demo](https://img.shields.io/badge/Live%20Demo-web--engine26.pages.dev-emerald?style=for-the-badge&logo=cloudflarepages&logoColor=white)](https://web-engine26.pages.dev)
[![GitHub Repository](https://img.shields.io/badge/GitHub-FuntionalFrost%2Fweb--dev--aio-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/FuntionalFrost/web-dev-aio)
[![yaxa-svelte](https://img.shields.io/badge/yaxa--svelte-v2.1.0-6366f1?style=for-the-badge)](https://yaxa.vercel.app)
[![Svelte 5](https://img.shields.io/badge/Svelte-5-orange?style=for-the-badge&logo=svelte&logoColor=white)](https://svelte.dev)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript 6](https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)

> 🚀 **Live Interactive Demo:** [**web-engine26.pages.dev**](https://web-engine26.pages.dev)  
> 📂 **GitHub Repository:** [**github.com/FuntionalFrost/web-dev-aio**](https://github.com/FuntionalFrost/web-dev-aio)

An interactive, zero-server educational portal and reference architecture for modern full-stack web engineering. Built with **SvelteKit 2**, **Tailwind CSS v4**, and **TypeScript 6**, covering **34 hands-on engineering modules** across **7 curriculum tracks**.

---

## Tech Stack

- **Framework:** [SvelteKit 2](https://kit.svelte.dev/) + [Svelte 5](https://svelte.dev/) (Static Site Generation via `@sveltejs/adapter-static`)
- **UI & Headless Primitives:** Powered by [yaxa-svelte](https://yaxa.vercel.app/) (v2.1.0 — accessible Bits UI primitives, Command Palette, Slideover, Badges, and Theme Studio)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (`@theme` tokens, container queries, CSS-first architecture)
- **Type System:** [TypeScript 6](https://www.typescriptlang.org/) (Strict modules, type-safe RPCs, Standard Schema, const generics)
- **Runtimes & Engines:** Node.js 26, Bun 1.2, Deno 2.2, UnJS Nitro, Hono v4
- **Databases & Auth:** Drizzle ORM, Neon Serverless Postgres, Turso / libSQL, Upstash Redis, Better Auth (Passkeys/WebAuthn)
- **Code Highlighting:** [yaxa-svelte](https://yaxa.vercel.app/) Zero-WASM Pure TypeScript Tokenizer (`tokenizeCode` / `<CodeBlock>` with stateful multi-line parsing, native Svelte 5 rune recognition, adaptive light/dark mode, and dynamic Theme Studio palette synchronization)
- **Adapter:** [`@sveltejs/adapter-static`](https://kit.svelte.dev/docs/adapter-static) (100% precompressed static HTML/CSS/JS output)

---

## Curriculum Overview

The 34 interactive engineering modules are structured across 7 core tracks:

| Track                                      | Modules | Key Technologies & Concepts                                                                                                                                                                                                                                                                            |
| :----------------------------------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **01. Foundations & Tooling**              | 01 – 05 | HTML5 `<dialog>` / `<details name="...">`, Web Standards (Streams, Web Crypto, URLPattern), Tailwind CSS v4 `@theme`, TypeScript 6 `satisfies`, Responsive SVG Favicons & CSS Masks, PNPM Workspaces & GitHub Actions `ci.yml`                                                                         |
| **02. Runtimes & Engines**                 | 06 – 09 | Node.js 26 vs Bun 1.2 vs Deno 2.2 benchmarks & permissions, Vite packaging (`unbuild`), UnJS Nitro & Hono Edge APIs, Monorepo & multi-app project structures                                                                                                                                           |
| **03. Modern ECMAScript**                  | 10 – 13 | `Math.sumPrecise`, `Map.prototype.getOrInsert`, `Iterator.prototype` helpers, `Uint8Array.prototype.toBase64` / `toHex`, `@starting-style`, `using` Explicit Resource Management                                                                                                                       |
| **04. Rendering & Architecture**           | 14 – 16 | SSG vs SSR vs Hybrid/ISR vs CSR latency & cost matrix, SSR Hydration & `devalue` serialisation, Strict CSP nonces & native View Transitions API                                                                                                                                                        |
| **05. APIs & Data Architecture**           | 17 – 22 | Standard Schema `@standard-schema/spec` (Zod/Valibot) & Hono RPC, Server-Sent Events (SSE) & HMAC-SHA256 Webhooks, Drizzle ORM on Neon Serverless Postgres, Upstash Redis Sliding Window Rate Limiting, Better Auth Passkeys, S3/R2 Object Storage                                                     |
| **06. Cloud, Operations & Licences**       | 23 – 29 | Cloudflare Workers vs Vercel Serverless vs Netlify Edge, Vitest & Playwright E2E testing harness, Semantic HTML5 metadata & privacy-first analytics, Polar.sh Merchant of Record & Stripe Monetisation, Open Source & Commercial Software Licence Matrix, Containers (Podman/Docker/IaC), Workstations |
| **07. Security, Privacy & EU Regulations** | 30 – 34 | Strict CSP Level 3, COOP/COEP/CORP, Subresource Integrity (SRI), Global Privacy Control (GPC), Anti-Fingerprinting Jitter, CHIPS Partitioned Cookies, Oblivious HTTP (OHTTP RFC 9458), Private State Tokens (RFC 9578), RFC 9309 Robots Protocol & llms.txt, GDPR DSAR Automation, EU AI Act           |

---

## Key Features

- **Interactive Architecture Simulators:** Client-side visualisers for sliding-window rate limiters, biometric passkey registrations, HMAC signers, software licence matrix selectors, query compilers, and oblivious HTTP flows—running entirely in-browser.
- **Zero-WASM Pure TypeScript Syntax Highlighting:** Multi-line stateful code tokenizer with first-class Svelte 5 rune support, light/dark adaptive modes, and instant Theme Studio accent palette sync.
- **Accessible Typography & Layouts:** Enforces minimum text size of `text-base` (or at least `text-sm`, completely avoiding `text-xs`) with responsive design for desktop and mobile.
- **Full-Spectrum Search & Keyboard Navigation:** Global command palette (`⌘K`) for rapid navigation across all 34 modules, curriculum tracks, and architectural topics.
- **Edge Deployment Ready:** Pre-configured security headers (HSTS, CSP, nosniff, DENY) and immutable cache policies for Cloudflare Pages (`_headers`).

---

Made possible with [yaxa-svelte](https://yaxa.vercel.app/) & [Svelte 5](https://svelte.dev/).
