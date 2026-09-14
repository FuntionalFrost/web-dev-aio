export interface CurriculumModule {
	id: string;
	href: string;
	track:
		| 'Foundations & Tooling'
		| 'Runtimes & Engines'
		| 'Modern ECMAScript'
		| 'Rendering & Architecture'
		| 'APIs & Data Architecture'
		| 'Cloud, Operations & Licences';
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
		| 'Rendering Strategies'
		| 'Hydration & Serialisation'
		| 'Web Security & Transitions'
		| 'API Architecture & RPC'
		| 'Real-Time & Streaming'
		| 'Backend & Data'
		| 'Auth & Security'
		| 'Object Storage & R2'
		| 'Cloud & Deployment'
		| 'Testing & Quality'
		| 'SEO & Analytics'
		| 'Monetisation & Billing'
		| 'Software Licences'
		| 'Containers & IaC'
		| 'Developer Workstations';
	tech: string[];
	description: string;
}

export const TRACK_ORDER: Array<CurriculumModule['track']> = [
	'Foundations & Tooling',
	'Runtimes & Engines',
	'Modern ECMAScript',
	'Rendering & Architecture',
	'APIs & Data Architecture',
	'Cloud, Operations & Licences'
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
			'DOM Optimisation'
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
			'TypeScript d.ts',
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
		tech: [
			'Full-Stack App Hierarchy',
			'Library Architecture',
			'Monorepos',
			'SSG vs Full-Stack',
			'Server Isolation'
		],
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
	// Track 4: Rendering, Serialisation & Security
	// ==========================================
	{
		id: 'rendering-strategies',
		href: '/rendering/strategies',
		track: 'Rendering & Architecture',
		title: '14. Rendering Strategies: SSG, SSR, Hybrid & CSR',
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
		title: '15. Hydration Engines & Data Serialisation',
		category: 'Hydration & Serialisation',
		tech: [
			'Hydration Pipeline',
			'Island Hydration',
			'Streaming SSR',
			'devalue',
			'SuperJSON',
			'Data Boundaries'
		],
		description:
			'Examine the client hydration lifecycle, partial/island hydration models, streaming SSR, and safe complex data serialisation with devalue.'
	},
	{
		id: 'rendering-csp-transitions',
		href: '/rendering/csp-transitions',
		track: 'Rendering & Architecture',
		title: '16. Security: Strict CSP, Nonces & View Transitions',
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
	// Track 5: APIs, Real-Time & Backend Data
	// ==========================================
	{
		id: 'api-schema-rpc',
		href: '/apis/schema-rpc',
		track: 'APIs & Data Architecture',
		title: '17. Schema Validation & Type-Safe RPC',
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
		title: '18. Real-Time Streaming & Webhook Signatures',
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
		title: '19. Database Engines: Neon, Turso, libSQL, SQLite, PostgreSQL & postgres.js',
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
		title: '20. Edge Caching & Sliding Window Rate Limiting',
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
		title: '21. Modern Authentication, Passkeys & Better Auth',
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
	{
		id: 'infra-storage-s3-r2',
		href: '/infra/storage-s3-r2',
		track: 'APIs & Data Architecture',
		title: '22. Object Storage: S3 Client, Cloudflare R2 & Presigned Uploads',
		category: 'Object Storage & R2',
		tech: [
			'@aws-sdk/client-s3',
			'Cloudflare R2',
			'Presigned URLs',
			'Zero Egress',
			'Multipart Uploads',
			'Bucket Policies'
		],
		description:
			'Architect scalable media and file storage with AWS SDK v3, presigned client upload tokens, and zero-egress Cloudflare R2 buckets.'
	},

	// ==========================================
	// Track 6: Cloud, Operations, Monetisation & Licences
	// ==========================================
	{
		id: 'cloud-platforms-deploy',
		href: '/cloud/platforms-deployment',
		track: 'Cloud, Operations & Licences',
		title: '23. Cloud Platforms: Cloudflare Workers, Vercel & Netlify',
		category: 'Cloud & Deployment',
		tech: [
			'Cloudflare Workers / Pages',
			'Vercel Serverless & Edge',
			'Netlify Edge',
			'V8 Isolates vs Node',
			'Deploy Options'
		],
		description:
			'Evaluate deployment strategies across Cloudflare Workers, Vercel, and Netlify, comparing V8 isolate latency with containerised nodes.'
	},
	{
		id: 'operations-testing',
		href: '/operations/testing',
		track: 'Cloud, Operations & Licences',
		title: '24. Modern Testing Architecture: Vitest & Playwright',
		category: 'Testing & Quality',
		tech: [
			'Vitest',
			'DOM Testing Library',
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
		track: 'Cloud, Operations & Licences',
		title: '25. SEO, Metadata & Privacy-First Web Analytics',
		category: 'SEO & Analytics',
		tech: [
			'HTML5 <head> Meta',
			'Open Graph & Twitter Cards',
			'JSON-LD Schema',
			'Plausible / PostHog',
			'Core Web Vitals'
		],
		description:
			'Maximise search engine visibility with standard semantic metadata, Open Graph cards, and JSON-LD structured data while tracking cookieless analytics.'
	},
	{
		id: 'business-monetization',
		href: '/business/monetization',
		track: 'Cloud, Operations & Licences',
		title: '26. Site & Project Monetisation Models',
		category: 'Monetisation & Billing',
		tech: [
			'Polar.sh MoR',
			'Stripe Billing & Webhooks',
			'LemonSqueezy',
			'Tiered Pro Access',
			'Usage Metering'
		],
		description:
			'Monetise developer tools and SaaS platforms with Merchant of Record tax handling, subscription checkouts, paywalled feature gates, and usage metering.'
	},
	{
		id: 'business-software-licenses',
		href: '/business/software-licenses',
		track: 'Cloud, Operations & Licences',
		title: '27. Software Licence Types & Open Source Matrix',
		category: 'Software Licences',
		tech: [
			'MIT / Apache 2.0 / BSD',
			'GPLv3 / AGPLv3',
			'MPL-2.0',
			'BSL / FSL Source-Available',
			'Licence Matrix Selector'
		],
		description:
			'Navigate permissive, copyleft, and source-available software licences with a comprehensive decision matrix and interactive legal compatibility advisor.'
	},
	{
		id: 'cloud-containers-iac',
		href: '/cloud/containers-iac',
		track: 'Cloud, Operations & Licences',
		title: '28. Containers, Orchestration & IaC: Podman, Docker, OCI, ECS & Terraform',
		category: 'Containers & IaC',
		tech: [
			'Podman Rootless',
			'Docker & OCI',
			'AWS ECS / Fargate',
			'Render PaaS',
			'Terraform / OpenTofu',
			'Wrangler IaC'
		],
		description:
			'Compare rootless daemonless Podman with Docker, evaluate Container as a Service (ECS/Render) vs FaaS, and declare infrastructure with Terraform.'
	},
	{
		id: 'operations-dev-environments',
		href: '/operations/dev-environments',
		track: 'Cloud, Operations & Licences',
		title:
			'29. Developer Workstations: Windows 11 WSL2 vs Fedora 44, VS Code vs VSCodium & Node 26',
		category: 'Developer Workstations',
		tech: [
			'Windows 11 WSL2',
			'Fedora 44 Linux',
			'VS Code Remote',
			'VSCodium (Open VSX)',
			'Node.js 26 LTS',
			'pnpm v12 Catalogs',
			'OpenRemote'
		],
		description:
			'Benchmark development workstation environments across Windows 11 WSL2 and native Fedora 44 Linux, comparing VS Code, VSCodium, Node 26, and OpenRemote.'
	}
];

export function getCurriculumByTrack(moduleList: CurriculumModule[] = curriculum) {
	return TRACK_ORDER.map((track) => ({
		track,
		modules: moduleList.filter((m) => m.track === track)
	})).filter((group) => group.modules.length > 0);
}
