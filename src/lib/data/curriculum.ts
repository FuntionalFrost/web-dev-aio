export interface CurriculumModule {
	id: string;
	href: string;
	track:
		| 'Foundations'
		| 'Modern ECMAScript'
		| 'UI & Frameworks'
		| 'APIs & Real-Time'
		| 'Data, Caching & Auth'
		| 'Infrastructure & Monetization';
	title: string;
	category:
		| 'HTML5'
		| 'Tailwind CSS v4'
		| 'TypeScript 6'
		| 'ECMAScript'
		| 'Svelte / SvelteKit'
		| 'Vue / Nuxt'
		| 'API Architecture'
		| 'Backend & Data'
		| 'Auth & Security'
		| 'Cloud & Edge'
		| 'Services & Billing';
	tech: string[];
	description: string;
}

export const curriculum: CurriculumModule[] = [
	// ==========================================
	// TRACK 1: FOUNDATIONS & DESIGN SYSTEMS
	// ==========================================
	{
		id: 'foundation-html',
		href: '/foundations/html5',
		track: 'Foundations',
		title: '01. Modern HTML5 & Web Semantics',
		category: 'HTML5',
		tech: ['Semantic Landmarks', '<dialog>', '<details name="...">', 'Form Constraints'],
		description:
			'Master native document landmarks, accessible interactive disclosures, exclusive accordions, and constraint validation without client JS.'
	},
	{
		id: 'foundation-tailwind',
		href: '/foundations/tailwind',
		track: 'Foundations',
		title: '02. Tailwind CSS v4 Engine & @theme',
		category: 'Tailwind CSS v4',
		tech: ['@theme tokens', 'Arbitrary Properties', 'Cascade Layers', 'Modern Flex/Grid'],
		description:
			'Learn the CSS-first configuration model, variable binding with native tokens, and container-first responsive layouts.'
	},
	{
		id: 'foundation-ts',
		href: '/foundations/typescript',
		track: 'Foundations',
		title: '03. TypeScript 6 & Modern JS Primitives',
		category: 'TypeScript 6',
		tech: [
			'Discriminated Unions',
			'satisfies operator',
			'Strict Narrowing',
			'Const Type Parameters'
		],
		description:
			'Deep dive into sound type narrowing, literal type preservation, exhaustiveness checking, and strict modern modules.'
	},
	{
		id: 'foundation-icons',
		href: '/foundations/icons',
		track: 'Foundations',
		title: '04. Icon Systems: Inline SVG vs CSS Masks',
		category: 'Tailwind CSS v4',
		tech: ['Inline <svg>', 'CSS mask-image', 'currentColor inheritance', 'DOM Footprint'],
		description:
			'Compare DOM overhead, animation flexibility, theme propagation, and bundle sizes between inline SVG nodes and pure CSS mask spans.'
	},

	// ==========================================
	// TRACK 2: ADVANCED ECMASCRIPT & PLATFORM APIS
	// ==========================================
	{
		id: 'module-1',
		href: '/module-1',
		track: 'Modern ECMAScript',
		title: '05. Precision Math & Modern Maps',
		category: 'ECMAScript',
		tech: ['Math.sumPrecise', 'Map.prototype.getOrInsert', 'TS6 Strict Modules'],
		description:
			'Eliminate IEEE-754 floating-point accumulation bugs and remove dictionary fallback boilerplate using native ES2026 collection primitives.'
	},
	{
		id: 'module-2',
		href: '/module-2',
		track: 'Modern ECMAScript',
		title: '06. Binary Streams & Container Layouts',
		category: 'ECMAScript',
		tech: ['Uint8Array.prototype.toBase64', 'Array.fromAsync', 'Tailwind v4 @container'],
		description:
			'Execute native browser-level Base64 byte conversions and stream promise aggregation inside modular, container-responsive cards.'
	},
	{
		id: 'module-3',
		href: '/module-3',
		track: 'Modern ECMAScript',
		title: '07. Modern DOM & Discrete Transitions',
		category: 'HTML5',
		tech: ['HTML5 inert', 'CSS @starting-style', 'Tailwind 3D Matrices'],
		description:
			'Orchestrate zero-JavaScript dialog entry transitions from display: none and isolate background accessibility trees natively.'
	},
	{
		id: 'module-4',
		href: '/module-4',
		track: 'Modern ECMAScript',
		title: '08. Resource Scopes & Async Resolvers',
		category: 'TypeScript 6',
		tech: ['using / Symbol.dispose', 'Promise.withResolvers()', 'Explicit Resource Management'],
		description:
			'Manage deterministic lifecycle teardowns upon block-scope exit and decouple promise resolutions from constructor callbacks.'
	},
	{
		id: 'module-5',
		href: '/module-5',
		track: 'Modern ECMAScript',
		title: '09. Native Anchors, Popovers & Iterator Pipelines',
		category: 'ECMAScript',
		tech: ['CSS position-anchor', 'HTML5 popover="auto"', 'Iterator.prototype helpers'],
		description:
			'Tether floating overlays without external positioning libraries and process data streams lazily without intermediate array allocations.'
	},

	// ==========================================
	// TRACK 3: COMPONENT FRAMEWORKS & HEADLESS UI
	// ==========================================
	{
		id: 'framework-svelte5',
		href: '/frameworks/svelte5',
		track: 'UI & Frameworks',
		title: '10. Svelte 5 Runes & SvelteKit 2',
		category: 'Svelte / SvelteKit',
		tech: ['$state / $derived', '$props / $bindable', '{#snippet} blocks', '$app/state'],
		description:
			'Explore the complete Svelte 5 reactivity runtime: Universal Runes, component snippets replacing slots, two-way $bindable props, and synchronous SvelteKit routing state.'
	},
	{
		id: 'framework-shadcn-svelte',
		href: '/frameworks/shadcn-svelte',
		track: 'UI & Frameworks',
		title: '11. shadcn-svelte & Headless Bits UI',
		category: 'Svelte / SvelteKit',
		tech: [
			'Bits UI Primitives',
			'Tailwind v4 clsx/cva',
			'Compound Components',
			'Accessible Dialogs'
		],
		description:
			'Build zero-dependency, copy-paste headless UI components utilizing Bits UI primitive runes and atomic Tailwind CSS v4 class merging.'
	},
	{
		id: 'framework-vue35',
		href: '/frameworks/vue35',
		track: 'UI & Frameworks',
		title: '12. Vue 3.5 Reactivity & Core Primitives',
		category: 'Vue / Nuxt',
		tech: ['Reactive Props Destructure', 'useTemplateRef()', 'useId()', 'Deferred Teleport'],
		description:
			'Analyze modern Vue 3.5 compiler primitives: destructuring defineProps with retained reactivity, typed template references, and SSR-safe element IDs.'
	},
	{
		id: 'framework-nuxt4',
		href: '/frameworks/nuxt4',
		track: 'UI & Frameworks',
		title: '13. Nuxt 4 & Nuxt UI Component System',
		category: 'Vue / Nuxt',
		tech: ['Nuxt 4 app/ structure', 'Nuxt UI / Reka UI', 'useAsyncData', 'Island Architecture'],
		description:
			'Master the forward-compatible Nuxt 4 directory architecture, universal data fetching lifecycles, and modern Nuxt UI design token customization.'
	},

	// ==========================================
	// TRACK 4: APIS, SCHEMA VALIDATION & REALTIME
	// ==========================================
	{
		id: 'api-schema-rpc',
		href: '/apis/schema-rpc',
		track: 'APIs & Real-Time',
		title: '14. Schema Validation (Standard Schema) & Hono RPC',
		category: 'API Architecture',
		tech: ['Zod / Valibot', '@standard-schema/spec', 'Hono RPC', 'OpenAPI OAS 3.1'],
		description:
			'Enforce runtime boundaries with Standard Schema, generate client types via OpenAPI, and build end-to-end type-safe RPC pipelines.'
	},
	{
		id: 'api-realtime-webhooks',
		href: '/apis/realtime-webhooks',
		track: 'APIs & Real-Time',
		title: '15. Real-Time Streaming (SSE/WS) & Webhook Signatures',
		category: 'API Architecture',
		tech: ['Server-Sent Events (SSE)', 'WebSockets', 'HMAC SHA-256', 'Idempotency Keys'],
		description:
			'Choose between unidirectional HTTP streaming and bidirectional sockets; verify incoming webhooks with timing-safe HMAC signatures.'
	},

	// ==========================================
	// TRACK 5: MODERN DATA, CACHING & AUTH
	// ==========================================
	{
		id: 'infra-databases-orm',
		href: '/infra/databases-orm',
		track: 'Data, Caching & Auth',
		title: '16. PostgreSQL on Neon, SQLite & Drizzle ORM',
		category: 'Backend & Data',
		tech: ['Drizzle ORM', 'Neon Serverless Postgres', 'SQLite / LibSQL', 'Connection Pooling'],
		description:
			'Schema-first database design, zero-overhead TypeScript queries, migrations, and handling serverless connection limits with proxy poolers.'
	},
	{
		id: 'infra-redis-ratelimit',
		href: '/infra/redis-ratelimit',
		track: 'Data, Caching & Auth',
		title: '17. Serverless Redis & Sliding Window Rate Limiting',
		category: 'Backend & Data',
		tech: ['@upstash/redis', '@upstash/ratelimit', 'Sliding Window Counter', 'Distributed Locks'],
		description:
			'Deploy stateless HTTP Redis caching, mitigate brute force/DDoS attacks with sliding window algorithms, and manage ephemeral state at the edge.'
	},
	{
		id: 'infra-better-auth',
		href: '/infra/better-auth',
		track: 'Data, Caching & Auth',
		title: '18. Modern Auth: Better Auth, Passkeys & Sessions',
		category: 'Auth & Security',
		tech: ['Better Auth', 'WebAuthn / Passkeys', 'HttpOnly Cookies', '2FA / TOTP'],
		description:
			'Implement passwordless WebAuthn registration, secure session cookie rotation, multi-tenant organization plugins, and PKCE OAuth flows.'
	},

	// ==========================================
	// TRACK 6: INFRASTRUCTURE, SERVICES & MONETIZATION
	// ==========================================
	{
		id: 'infra-deployment-edge',
		href: '/infra/deployment-edge',
		track: 'Infrastructure & Monetization',
		title: '19. Deployment: Cloudflare Workers vs Serverless Node',
		category: 'Cloud & Edge',
		tech: [
			'Cloudflare Workers / Pages',
			'Vercel / Netlify Edge',
			'V8 Isolates vs Node.js',
			'Cold Starts'
		],
		description:
			'Compare V8 isolate execution, Node.js containerized serverless functions, globally distributed edge caching, and runtime API compatibility limits.'
	},
	{
		id: 'services-billing-email',
		href: '/services/billing-email',
		track: 'Infrastructure & Monetization',
		title: '20. Resend Transactional Email & Polar.sh Billing',
		category: 'Services & Billing',
		tech: ['Resend API', 'Polar.sh MoR', 'Subscription Webhooks', 'DKIM / SPF Verification'],
		description:
			'Orchestrate transactional emails with React/HTML templates, accept global payments via Polar.sh Merchant of Record, and handle webhook events.'
	},
	{
		id: 'services-storage-jobs',
		href: '/services/storage-jobs',
		track: 'Infrastructure & Monetization',
		title: '21. Direct S3/R2 Presigned Uploads & Inngest Jobs',
		category: 'Cloud & Edge',
		tech: [
			'Cloudflare R2 / S3',
			'Presigned PUT URLs',
			'Inngest Background Queues',
			'Durable Workflows'
		],
		description:
			'Bypass serverless memory limits with direct client-to-storage presigned uploads and execute durable, long-running background tasks with automatic retries.'
	}
];
