export interface CurriculumModule {
	id: string;
	href: string;
	track:
		| 'Foundations & Tooling'
		| 'Runtimes & Engines'
		| 'Modern ECMAScript'
		| 'Svelte & SvelteKit'
		| 'Vue & Nuxt'
		| 'Rendering & Architecture'
		| 'APIs & Data Architecture'
		| 'Cloud, Operations & Licenses';
	title: string;
	category:
		| 'HTML5 & Standards'
		| 'Tailwind CSS v4'
		| 'TypeScript 6'
		| 'Icons & Assets'
		| 'Tooling & CI/CD'
		| 'JS Runtimes'
		| 'Build & Packaging'
		| 'Server Engines'
		| 'Project Architecture'
		| 'ECMAScript'
		| 'Svelte 5 Runes'
		| 'Async Svelte'
		| 'SvelteKit Routing'
		| 'SvelteKit Data & Actions'
		| 'SvelteKit Server & Env'
		| 'SvelteKit Adapters'
		| 'Vue 3.5 & Composables'
		| 'Nuxt 4 & Nitro'
		| 'Nuxt UI & Design Systems'
		| 'Rendering Strategies'
		| 'Hydration & Serialization'
		| 'Web Security & Transitions'
		| 'API Architecture & RPC'
		| 'Real-Time & Streaming'
		| 'Backend & Data'
		| 'Auth & Security'
		| 'Cloud & Deployment'
		| 'Testing & Quality'
		| 'SEO & Analytics'
		| 'Monetization & Billing'
		| 'Software Licenses';
	tech: string[];
	description: string;
}

export const TRACK_ORDER: Array<CurriculumModule['track']> = [
	'Foundations & Tooling',
	'Runtimes & Engines',
	'Modern ECMAScript',
	'Svelte & SvelteKit',
	'Vue & Nuxt',
	'Rendering & Architecture',
	'APIs & Data Architecture',
	'Cloud, Operations & Licenses'
];

export const curriculum: CurriculumModule[] = [
	// ==========================================
	// Track 1: Foundations, Tooling & Workspaces
	// ==========================================
	{
		id: 'foundation-html',
		href: '/foundations/html5',
		track: 'Foundations & Tooling',
		title: '01. Modern HTML5, Semantics & Web APIs',
		category: 'HTML5 & Standards',
		tech: [
			'<dialog>',
			'<details name="...">',
			'Web Standards',
			'Streams API',
			'Web Crypto',
			'URLPattern'
		],
		description:
			'Master native accessible modals, exclusive accordions, clientless form validation, and core browser Web Standard APIs including Streams and Web Crypto.'
	},
	{
		id: 'foundation-styling-assets',
		href: '/foundations/styling-assets',
		track: 'Foundations & Tooling',
		title: '02. Tailwind CSS v4, Styling & Asset Architecture',
		category: 'Tailwind CSS v4',
		tech: [
			'@theme Tokens',
			'@container Queries',
			'Asset Pipeline',
			'AVIF / WebP',
			'Immutable Cache'
		],
		description:
			'Explore Tailwind CSS v4 CSS-first token configuration, container queries, modern layout systems, responsive image formats, and immutable asset delivery.'
	},
	{
		id: 'foundation-ts',
		href: '/foundations/typescript',
		track: 'Foundations & Tooling',
		title: '03. TypeScript 6 & Strict Engineering',
		category: 'TypeScript 6',
		tech: [
			'satisfies operator',
			'Const Type Parameters',
			'Discriminated Unions',
			'Exhaustiveness',
			'Strict Modules'
		],
		description:
			'Enforce sound type boundaries, literal type preservation with satisfies, const type parameters, discriminated unions, and strict modular compilation.'
	},
	{
		id: 'foundation-icons-favicons',
		href: '/foundations/icons-favicons',
		track: 'Foundations & Tooling',
		title: '04. Modern Icons & Responsive Favicon Systems',
		category: 'Icons & Assets',
		tech: [
			'SVG Favicons',
			'Dark/Light Media',
			'Web App Manifest',
			'CSS Mask Icons',
			'DOM Optimization'
		],
		description:
			'Design theme-reactive SVG favicons, Apple touch icons, PWA manifest configurations, and high-performance single-node CSS mask icon systems.'
	},
	{
		id: 'foundation-pnpm-ci',
		href: '/foundations/pnpm-ci',
		track: 'Foundations & Tooling',
		title: '05. PNPM Workspaces, Monorepos & CI/CD Pipelines',
		category: 'Tooling & CI/CD',
		tech: [
			'pnpm-workspace',
			'catalog: Protocol',
			'ci.yml Matrix',
			'GitHub Actions',
			'Strict Lockfiles'
		],
		description:
			'Configure high-speed PNPM workspaces using the catalog protocol, immutable lockfile validation, and multi-OS GitHub Actions CI matrix pipelines.'
	},

	// ==========================================
	// Track 2: Runtimes, Servers & Build Engines
	// ==========================================
	{
		id: 'runtime-engines',
		href: '/runtimes/engines',
		track: 'Runtimes & Engines',
		title: '06. Modern JS Runtimes: Node.js 24, Bun & Deno 2',
		category: 'JS Runtimes',
		tech: [
			'Node.js 24 LTS',
			'Bun 1.2',
			'Deno 2.2',
			'Granular Permissions',
			'Cold Starts',
			'Web APIs Parity'
		],
		description:
			'Benchmark execution speed, cold-start latency, package management performance, security sandbox permissions, and Web API parity across top runtimes.'
	},
	{
		id: 'runtime-vite-packaging',
		href: '/runtimes/vite-packaging',
		track: 'Runtimes & Engines',
		title: '07. Vite 6 Architecture & Library Packaging',
		category: 'Build & Packaging',
		tech: [
			'Vite 6 / Rolldown',
			'HMR Pipelines',
			'svelte-package',
			'unbuild',
			'package.json exports'
		],
		description:
			'Understand Vite 6 next-gen bundling internals, lightning-fast HMR, TypeScript declaration generation, and multi-format npm library packaging with exports.'
	},
	{
		id: 'runtime-nitro-hono',
		href: '/runtimes/nitro-hono',
		track: 'Runtimes & Engines',
		title: '08. Universal Server Engines: Nitro & Hono',
		category: 'Server Engines',
		tech: ['UnJS Nitro', 'Hono Framework', 'Universal Presets', 'Typed Middleware', 'Hono RPC'],
		description:
			'Build portable server backends with UnJS Nitro (universal presets & auto-imports) and deploy ultra-lightweight, zero-overhead edge APIs with Hono.'
	},
	{
		id: 'runtime-project-structures',
		href: '/runtimes/project-structures',
		track: 'Runtimes & Engines',
		title: '09. Modern Project Types & Directory Structures',
		category: 'Project Architecture',
		tech: ['SvelteKit Structure', 'Nuxt 4 app/', 'Monorepos', 'SSG vs Full-Stack', 'Library Repos'],
		description:
			'Architect production-grade codebases across full-stack applications, static sites, component libraries, and enterprise monorepo workspace hierarchies.'
	},

	// ==========================================
	// Track 3: Modern ECMAScript & Browser Primitives
	// ==========================================
	{
		id: 'ecma-math-maps',
		href: '/ecmascript/math-and-maps',
		track: 'Modern ECMAScript',
		title: '10. Precision Math, Maps & Modern Iterators',
		category: 'ECMAScript',
		tech: ['Math.sumPrecise', 'Map.getOrInsert', 'Iterator Helpers', 'TS6 Strict Modules'],
		description:
			'Eliminate floating-point accumulation bugs with Math.sumPrecise, leverage Map key memoization, and compose lazy data pipelines with Iterator helpers.'
	},
	{
		id: 'ecma-binary-streams',
		href: '/ecmascript/binary-streams',
		track: 'Modern ECMAScript',
		title: '11. Binary Streams, Buffers & Container Layouts',
		category: 'ECMAScript',
		tech: ['Uint8Array.prototype.toBase64', 'toHex', 'Array.fromAsync', 'Tailwind v4 @container'],
		description:
			'Execute native browser-level Base64 and Hex conversions, stream async iterables, and construct modular container-responsive interfaces.'
	},
	{
		id: 'ecma-discrete-transitions',
		href: '/ecmascript/discrete-transitions',
		track: 'Modern ECMAScript',
		title: '12. Discrete Transitions & DOM Interactivity',
		category: 'HTML5 & Standards',
		tech: ['HTML5 inert', 'CSS @starting-style', 'allow-discrete', 'View Transitions API'],
		description:
			'Orchestrate smooth zero-JavaScript entrance animations from display: none, isolate background accessibility trees, and apply modern popovers.'
	},
	{
		id: 'ecma-resource-scopes',
		href: '/ecmascript/resource-scopes',
		track: 'Modern ECMAScript',
		title: '13. Resource Scopes & Explicit Management',
		category: 'TypeScript 6',
		tech: ['using keyword', 'Symbol.dispose', 'Promise.withResolvers()', 'Deterministic Teardown'],
		description:
			'Enforce automatic resource cleanup on block-scope exit with explicit resource management and decouple asynchronous lifecycle resolvers.'
	},

	// ==========================================
	// Track 4: Svelte 5 & SvelteKit 2 Architecture
	// ==========================================
	{
		id: 'svelte-runes-state',
		href: '/sveltekit/runes-state',
		track: 'Svelte & SvelteKit',
		title: '14. Svelte 5 Universal Runes & State Management',
		category: 'Svelte 5 Runes',
		tech: [
			'$state / $derived',
			'$props / $bindable',
			'{#snippet} blocks',
			'Class-based State',
			'Runes Context'
		],
		description:
			'Master the Svelte 5 signal reactivity runtime: universal runes outside components, class-based state modules, $bindable props, and typed snippets.'
	},
	{
		id: 'svelte-async-streaming',
		href: '/sveltekit/async-svelte',
		track: 'Svelte & SvelteKit',
		title: '15. Async Svelte, Streaming & Await Snippets',
		category: 'Async Svelte',
		tech: [
			'Async Components',
			'{#await} Blocks',
			'Streaming SSR',
			'Async Snippets',
			'Deferred Promises'
		],
		description:
			'Build responsive async interfaces with Svelte 5 async components, streaming promise resolution in {#await} blocks, and non-blocking SSR hydration.'
	},
	{
		id: 'svelte-routing-pages',
		href: '/sveltekit/routing-pages',
		track: 'Svelte & SvelteKit',
		title: '16. SvelteKit Routing, Layouts & Page Options',
		category: 'SvelteKit Routing',
		tech: [
			'Dynamic [param]',
			'Catch-all [...rest]',
			'Route Groups (group)',
			'Layout Resets +layout@',
			'Page Options'
		],
		description:
			'Design scalable SvelteKit file-based routing hierarchies, layout inheritance resets, route groups, and route-level prerender/ssr/csr options.'
	},
	{
		id: 'svelte-loading-actions',
		href: '/sveltekit/loading-actions',
		track: 'Svelte & SvelteKit',
		title: '17. Data Loading, Form Actions & Remote Functions',
		category: 'SvelteKit Data & Actions',
		tech: [
			'+page.server.ts load',
			'Form Actions',
			'use:enhance',
			'fail() validation',
			'Optimistic UI'
		],
		description:
			'Fetch type-safe data with server load functions, mutate state with progressive enhancement form actions, and implement optimistic updates.'
	},
	{
		id: 'svelte-hooks-env-errors',
		href: '/sveltekit/hooks-env-errors',
		track: 'Svelte & SvelteKit',
		title: '18. Server Hooks, Error Handling & Env Variables',
		category: 'SvelteKit Server & Env',
		tech: [
			'hooks.server.ts',
			'handle / handleFetch',
			'error() vs fail()',
			'+error.svelte',
			'$env/static/private'
		],
		description:
			'Intercept requests with server hooks, implement expected error contracts with custom +error.svelte views, and strictly isolate private secrets.'
	},
	{
		id: 'svelte-adapters-deploy',
		href: '/sveltekit/adapters-deploy',
		track: 'Svelte & SvelteKit',
		title: '19. SvelteKit Adapters & Production Deployment',
		category: 'SvelteKit Adapters',
		tech: [
			'adapter-static',
			'adapter-node',
			'adapter-cloudflare',
			'adapter-vercel',
			'adapter-auto'
		],
		description:
			'Select and configure the optimal SvelteKit deployment adapter for static edge CDN hosting, Node.js Docker containers, or serverless edge workers.'
	},

	// ==========================================
	// Track 5: Vue 3.5 & Nuxt 4 Architecture
	// ==========================================
	{
		id: 'nuxt-vue35-composables',
		href: '/nuxt/vue35-composables',
		track: 'Vue & Nuxt',
		title: '20. Vue 3.5 Core Primitives & Composables',
		category: 'Vue 3.5 & Composables',
		tech: [
			'Reactive Prop Destructure',
			'useTemplateRef()',
			'useId()',
			'Custom Composables',
			'SSR Hydration IDs'
		],
		description:
			'Analyze Vue 3.5 reactive prop destructuring without toRefs, typed template references, SSR-safe ID generation, and modular composable lifecycles.'
	},
	{
		id: 'nuxt-nuxt4-data',
		href: '/nuxt/nuxt4-data',
		track: 'Vue & Nuxt',
		title: '21. Nuxt 4 Architecture, Nitro Hooks & useAsyncData',
		category: 'Nuxt 4 & Nitro',
		tech: [
			'Nuxt 4 app/ structure',
			'useAsyncData',
			'useFetch',
			'Server Routes (server/api)',
			'Nitro Hooks'
		],
		description:
			'Architect applications with Nuxt 4 forward-compatible directory layout, universal data fetching lifecycle with caching, and Nitro server extensions.'
	},
	{
		id: 'nuxt-ui-design',
		href: '/nuxt/nuxt-ui',
		track: 'Vue & Nuxt',
		title: '22. Nuxt UI & Headless Design Systems',
		category: 'Nuxt UI & Design Systems',
		tech: ['Nuxt UI v3', 'Reka UI', 'shadcn-svelte', 'Bits UI', 'CVA Tokens', 'Accessibility'],
		description:
			'Build design system components using Nuxt UI and shadcn-svelte headless primitives with Class Variance Authority (CVA) and Tailwind tokens.'
	},

	// ==========================================
	// Track 6: Rendering, Serialization & Security
	// ==========================================
	{
		id: 'rendering-strategies',
		href: '/rendering/strategies',
		track: 'Rendering & Architecture',
		title: '23. Rendering Strategies: SSG, SSR, Hybrid & CSR',
		category: 'Rendering Strategies',
		tech: [
			'Prerendering (SSG)',
			'Server-Side Rendering (SSR)',
			'Hybrid / ISR',
			'Client-Side Rendering (CSR)',
			'TTFB vs FCP'
		],
		description:
			'Compare static generation, dynamic server rendering, hybrid incremental regeneration, and client-side single page app models for speed and cost.'
	},
	{
		id: 'rendering-hydration-serialization',
		href: '/rendering/hydration-serialization',
		track: 'Rendering & Architecture',
		title: '24. Hydration Engines & Data Serialization',
		category: 'Hydration & Serialization',
		tech: [
			'Hydration Pipeline',
			'Island Hydration',
			'Streaming SSR',
			'devalue',
			'SuperJSON',
			'Data Boundaries'
		],
		description:
			'Examine the client hydration lifecycle, partial/island hydration models, streaming SSR, and safe complex data serialization with devalue.'
	},
	{
		id: 'rendering-csp-transitions',
		href: '/rendering/csp-transitions',
		track: 'Rendering & Architecture',
		title: '25. Security: Strict CSP, Nonces & View Transitions',
		category: 'Web Security & Transitions',
		tech: [
			'Strict CSP',
			'Nonce-based Security',
			'Frame Sandboxing',
			'View Transitions API',
			'Morph Transitions'
		],
		description:
			'Harden web applications against XSS with cryptographic CSP nonces, strict headers, and coordinate fluid page animations with View Transitions.'
	},

	// ==========================================
	// Track 7: APIs, Real-Time & Backend Data
	// ==========================================
	{
		id: 'api-schema-rpc',
		href: '/apis/schema-rpc',
		track: 'APIs & Data Architecture',
		title: '26. Schema Validation & Type-Safe RPC',
		category: 'API Architecture & RPC',
		tech: [
			'@standard-schema/spec',
			'Zod / Valibot',
			'Hono RPC',
			'OpenAPI OAS 3.1',
			'Remote Server Functions'
		],
		description:
			'Enforce runtime boundaries with Standard Schema, auto-generate OpenAPI documentation, and implement end-to-end type-safe RPC contracts.'
	},
	{
		id: 'api-realtime-webhooks',
		href: '/apis/realtime-webhooks',
		track: 'APIs & Data Architecture',
		title: '27. Real-Time Streaming & Webhook Signatures',
		category: 'Real-Time & Streaming',
		tech: [
			'Server-Sent Events (SSE)',
			'WebSockets',
			'HMAC-SHA256',
			'Timing-Safe Verify',
			'Idempotency Keys'
		],
		description:
			'Stream real-time telemetry over SSE and WebSockets, verify incoming webhook signatures with timing-safe HMAC, and prevent replay attacks.'
	},
	{
		id: 'infra-databases-orm',
		href: '/infra/databases-orm',
		track: 'APIs & Data Architecture',
		title: '28. Database Engines: Neon, Turso, libSQL, SQLite, PostgreSQL & postgres.js',
		category: 'Backend & Data',
		tech: [
			'Neon Serverless',
			'Turso & libSQL',
			'postgres.js',
			'SQLite & better-sqlite3',
			'PostgreSQL (pg)',
			'Drizzle ORM'
		],
		description:
			'Architect high-performance data layers across Neon Serverless Postgres, Turso edge libSQL, postgres.js, embedded SQLite, and stateful PostgreSQL with Drizzle ORM.'
	},
	{
		id: 'infra-redis-ratelimit',
		href: '/infra/redis-ratelimit',
		track: 'APIs & Data Architecture',
		title: '29. Edge Caching & Sliding Window Rate Limiting',
		category: 'Backend & Data',
		tech: [
			'@upstash/redis',
			'@upstash/ratelimit',
			'Sliding Window Algorithm',
			'Distributed Locks',
			'Edge Tokens'
		],
		description:
			'Deploy stateless HTTP Redis caching, defend APIs against brute force attacks with sliding window algorithms, and manage distributed edge state.'
	},
	{
		id: 'infra-better-auth',
		href: '/infra/better-auth',
		track: 'APIs & Data Architecture',
		title: '30. Modern Authentication, Passkeys & Better Auth',
		category: 'Auth & Security',
		tech: [
			'Better Auth',
			'WebAuthn Passkeys',
			'HttpOnly Cookies',
			'Session Rotation',
			'PKCE OAuth'
		],
		description:
			'Implement passwordless biometric passkeys, secure HttpOnly cookie session rotation, and modular authentication plugins with Better Auth.'
	},

	// ==========================================
	// Track 8: Cloud, Operations, Monetization & Licenses
	// ==========================================
	{
		id: 'cloud-platforms-deploy',
		href: '/cloud/platforms-deployment',
		track: 'Cloud, Operations & Licenses',
		title: '31. Cloud Platforms: Cloudflare Workers, Vercel & Netlify',
		category: 'Cloud & Deployment',
		tech: [
			'Cloudflare Workers / Pages',
			'Vercel Serverless & Edge',
			'Netlify Edge',
			'V8 Isolates vs Node',
			'Deploy Options'
		],
		description:
			'Evaluate deployment strategies across Cloudflare Workers, Vercel, and Netlify for Nuxt and SvelteKit, comparing V8 isolate latency with containerized nodes.'
	},
	{
		id: 'operations-testing',
		href: '/operations/testing',
		track: 'Cloud, Operations & Licenses',
		title: '32. Modern Testing Architecture: Vitest & Playwright',
		category: 'Testing & Quality',
		tech: [
			'Vitest',
			'Svelte Testing Library',
			'Playwright E2E',
			'Mock Service Worker (MSW)',
			'Coverage Reports'
		],
		description:
			'Build a rock-solid test suite: ultra-fast unit testing with Vitest, accessible component testing, and resilient browser-driven end-to-end testing with Playwright.'
	},
	{
		id: 'operations-seo-analytics',
		href: '/operations/seo-analytics',
		track: 'Cloud, Operations & Licenses',
		title: '33. SEO, Metadata & Privacy-First Web Analytics',
		category: 'SEO & Analytics',
		tech: [
			'svelte-meta-tags',
			'Open Graph / Twitter Cards',
			'JSON-LD Schema',
			'Plausible / PostHog',
			'Core Web Vitals'
		],
		description:
			'Maximize search engine visibility with structured metadata and Open Graph cards while tracking telemetry via privacy-friendly, cookieless analytics.'
	},
	{
		id: 'business-monetization',
		href: '/business/monetization',
		track: 'Cloud, Operations & Licenses',
		title: '34. Site & Project Monetization Models',
		category: 'Monetization & Billing',
		tech: [
			'Polar.sh MoR',
			'Stripe Billing & Webhooks',
			'LemonSqueezy',
			'Tiered Pro Access',
			'Usage Metering'
		],
		description:
			'Monetize developer tools and SaaS platforms with Merchant of Record tax handling, subscription checkouts, paywalled feature gates, and usage metering.'
	},
	{
		id: 'business-software-licenses',
		href: '/business/software-licenses',
		track: 'Cloud, Operations & Licenses',
		title: '35. Software License Types & Open Source Matrix',
		category: 'Software Licenses',
		tech: [
			'MIT / Apache 2.0 / BSD',
			'GPLv3 / AGPLv3',
			'MPL-2.0',
			'BSL / FSL Source-Available',
			'License Matrix Selector'
		],
		description:
			'Navigate permissive, copyleft, and source-available software licenses with a comprehensive decision matrix and interactive legal compatibility advisor.'
	}
];

export function getCurriculumByTrack(moduleList: CurriculumModule[] = curriculum) {
	return TRACK_ORDER.map((track) => ({
		track,
		modules: moduleList.filter((m) => m.track === track)
	})).filter((group) => group.modules.length > 0);
}
