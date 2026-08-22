export interface CurriculumModule {
	id: string;
	href: string;
	track:
		| 'Foundations'
		| 'Modern ECMAScript'
		| 'UI & Frameworks'
		| 'APIs, Schema & Realtime'
		| 'Data, Auth & Infrastructure';
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
		| 'DevOps & Edge';
	tech: string[];
	description: string;
}

export const curriculum: CurriculumModule[] = [
	// ==========================================
	// TRACK 1: FOUNDATIONS & SYSTEM DESIGN
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
		track: 'APIs, Schema & Realtime',
		title: '14. Schema Validation (Standard Schema) & RPCs',
		category: 'API Architecture',
		tech: ['Zod / Valibot', '@standard-schema/spec', 'tRPC / Hono RPC', 'OpenAPI (OAS 3.1)'],
		description:
			'Enforce runtime boundaries with Standard Schema, generate client types via OpenAPI/Scalar, and build end-to-end type-safe RPC pipelines.'
	},
	{
		id: 'api-realtime-webhooks',
		href: '/apis/realtime-webhooks',
		track: 'APIs, Schema & Realtime',
		title: '15. Real-Time Streaming & Webhooks',
		category: 'API Architecture',
		tech: ['Server-Sent Events (SSE)', 'WebSockets', 'HMAC SHA-256 Signatures', 'Idempotency Keys'],
		description:
			'Choose between unidirectional HTTP streaming and bidirectional sockets; verify incoming webhooks with timing-safe HMAC signatures.'
	},

	// ==========================================
	// TRACK 5: DATA, AUTH & DEPLOYMENT RUNTIMES
	// ==========================================
	{
		id: 'infra-databases-orm',
		href: '/infra/databases-orm',
		track: 'Data, Auth & Infrastructure',
		title: '16. Modern Databases, ORMs & Migrations',
		category: 'Backend & Data',
		tech: ['Drizzle ORM / Prisma', 'PostgreSQL / SQLite', 'Connection Pooling', 'Vector Indexes'],
		description:
			'Schema-first database design, zero-overhead TypeScript queries, schema migrations, and handling serverless connection limits with proxy poolers.'
	},
	{
		id: 'infra-auth-security',
		href: '/infra/auth-security',
		track: 'Data, Auth & Infrastructure',
		title: '17. Modern Auth: Passkeys, Sessions & OAuth',
		category: 'Backend & Data',
		tech: ['WebAuthn / Passkeys', 'HttpOnly Cookie Sessions', 'OAuth2 / PKCE', 'CSRF & Nonces'],
		description:
			'Implement passwordless WebAuthn flows, secure server-side session rotation, PKCE token exchanges, and bulletproof XSS/CSRF defenses.'
	},
	{
		id: 'infra-deployment-edge',
		href: '/infra/deployment-edge',
		track: 'Data, Auth & Infrastructure',
		title: '18. Deployment: Edge Isolates vs Serverless vs Node',
		category: 'DevOps & Edge',
		tech: [
			'Cloudflare Workers / Pages',
			'Vercel / Netlify Edge',
			'V8 Isolates vs Node Runtimes',
			'Cold Starts'
		],
		description:
			'Compare V8 isolate execution, Node.js containerized serverless functions, globally distributed edge caching, and runtime API compatibility limits.'
	}
];
