# Web Engine 2026: Modern Web Engineering Guide & Interactive Labs

An interactive, zero-server educational portal and reference architecture for modern full-stack web development. Built with **SvelteKit 2**, **Svelte 5 (Runes)**, **Tailwind CSS v4**, and **TypeScript 6**, covering 21 hands-on modules across 6 curriculum tracks.

---

## Tech Stack

- **Framework:** [SvelteKit 2](https://kit.svelte.dev/) + [Svelte 5](https://svelte.dev/) (Universal Runes: `$state`, `$derived`, `$props`, snippets)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (`@theme` tokens, container queries, CSS-first architecture)
- **Type System:** [TypeScript 6](https://www.typescriptlang.org/) (Strict modules, type-safe RPCs, Standard Schema)
- **Code Highlighting:** [Shiki](https://shiki.style/) (Prerendered dual dark/light themes at build time, 0 client bundle cost)
- **Adapter:** [`@sveltejs/adapter-static`](https://kit.svelte.dev/docs/adapter-static) (100% precompressed static HTML/CSS/JS output)
- **State Persistence:** Local-first reactive progress tracking via Svelte 5 runes and browser storage

---

## Curriculum Overview

The 21 interactive modules are structured across 6 core tracks:

| Track                      | Modules | Key Technologies & Concepts                                                                                                                                           |
| :------------------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **01. Foundations**        | 01 – 04 | HTML5 `<dialog>` / `<details name="...">`, Tailwind v4 `@theme`, TypeScript 6 `satisfies`, CSS Mask Icons                                                             |
| **02. Modern ECMAScript**  | 05 – 09 | `Math.sumPrecise`, `Map.getOrInsert`, `Uint8Array.toBase64`, `@starting-style`, `using` Explicit Resource Management, CSS Anchor Positioning                          |
| **03. UI & Frameworks**    | 10 – 13 | Svelte 5 Runes & Snippets, shadcn-svelte & Bits UI (CVA), Vue 3.5 reactive prop destructure, Nuxt 4 `app/` & Nuxt UI (Reka UI)                                        |
| **04. APIs & Real-Time**   | 14 – 15 | `@standard-schema/spec` (Zod), Hono RPC & OpenAPI 3.1, Server-Sent Events (SSE), WebSockets, timing-safe HMAC-SHA256 Webhooks                                         |
| **05. Modern Data & Auth** | 16 – 18 | Drizzle ORM, Neon Serverless PostgreSQL, Connection Pooling, Upstash Redis Sliding Window Rate Limiting, Better Auth, WebAuthn Passkeys                               |
| **06. Cloud & Services**   | 19 – 21 | Cloudflare V8 Edge Isolates vs Serverless Node.js, Resend Transactional Email, Polar.sh Merchant of Record, Direct S3/R2 Presigned Uploads, Inngest Durable Workflows |

---

## Key Features

- **Client-Side Interactive Sandboxes:** Live emulators for sliding-window rate limiters, biometric passkey registrations, HMAC signers, reactive runes, and query compilers—running entirely in-browser without backend dependencies.
- **Build-Time Syntax Highlighting:** Code samples are parsed and highlighted during static build generation using Shiki, shipping zero parser JavaScript to the client.
- **Progress Tracking & Verification:** Stateful progress tracker with local browser persistence.
- **Exportable Mastery Certificate:** Dynamic SVG certificate generation upon completing all 21 modules with client-side SVG/PNG export.
- **Dual Edge Deployment Ready:** Pre-configured security headers and immutable cache policies for Cloudflare Pages (`_headers`) and Vercel (`vercel.json`).

---

## Project Structure

```text
├── .github/workflows/         # Automated GitHub Pages CI/CD pipeline
├── src/
│   ├── lib/
│   │   ├── components/        # LabShell, CodeBlock, CommandPalette, Certificate
│   │   ├── data/              # Master curriculum metadata & route definitions
│   │   ├── server/            # Shiki syntax highlighting engine (prerender-only)
│   │   └── state/             # Reactive progress engine via Svelte 5 runes
│   └── routes/
│       ├── +layout.svelte     # Pinned responsive sidebar, track navigation & search
│       ├── +page.svelte       # 21-module interactive filter & telemetry dashboard
│       ├── foundations/       # HTML5, Tailwind v4, TS6, Icon systems
│       ├── module-[1..5]/     # Advanced ES2026 platform labs
│       ├── frameworks/        # Svelte 5, shadcn-svelte, Vue 3.5, Nuxt 4
│       ├── apis/              # Schema validation, Hono RPC, SSE, Webhooks
│       ├── infra/             # Drizzle/Neon, Redis Rate Limiting, Better Auth, Edge
│       └── services/          # Resend/Polar.sh, S3 Presigned Uploads/Inngest
├── static/
│   └── _headers               # Cloudflare Pages security headers & cache rules
├── svelte.config.js           # Static adapter & strict prerender config
└── vercel.json                # Vercel Edge security headers & routing config
```
