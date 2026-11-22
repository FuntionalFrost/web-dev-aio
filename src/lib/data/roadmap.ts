export interface RoadmapResource {
	title: string;
	url: string;
}

export interface TreeNode {
	id: string;
	title: string;
	description: string;
	duration: string;
	row: number;
	col: number;
	prerequisites: string[];
	labHref?: string;
	labTitle?: string;
	resources: RoadmapResource[];
}

export const treeData: TreeNode[] = [
	{
		id: 'html-semantics',
		title: 'HTML & Semantics',
		description:
			'Master document structure, landmark elements, forms, dialogs, and accessible markup foundations.',
		duration: '4 hours',
		row: 0,
		col: 1,
		prerequisites: [],
		labHref: '/foundations/html5',
		labTitle: '01. Modern HTML5, Semantics & Web APIs',
		resources: [
			{
				title: 'MDN: HTML Elements Reference',
				url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element'
			},
			{ title: 'web.dev: Learn HTML', url: 'https://web.dev/learn/html' }
		]
	},
	{
		id: 'css-layouts',
		title: 'CSS & Modern Layouts',
		description:
			'Build resilient responsive interfaces with Flexbox, CSS Grid, custom properties, and container queries.',
		duration: '6 hours',
		row: 1,
		col: 0,
		prerequisites: ['html-semantics'],
		labHref: '/foundations/styling-assets',
		labTitle: '02. Tailwind CSS v4, Styling & Asset Architecture',
		resources: [
			{
				title: 'MDN: CSS Grid Layout',
				url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout'
			},
			{ title: 'web.dev: Learn CSS', url: 'https://web.dev/learn/css' }
		]
	},
	{
		id: 'javascript-core',
		title: 'JavaScript & Metaprogramming',
		description:
			'Understand closures, async/await, ES modules, Proxy/Reflect traps, and modern DOM APIs.',
		duration: '10 hours',
		row: 1,
		col: 2,
		prerequisites: ['html-semantics'],
		labHref: '/ecmascript/metaprogramming',
		labTitle: 'Metaprogramming: Proxy Traps & Type Transforms',
		resources: [
			{
				title: 'MDN: JavaScript Guide',
				url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide'
			},
			{ title: 'javascript.info', url: 'https://javascript.info/' }
		]
	},
	{
		id: 'tailwind-design',
		title: 'Tailwind & Design Systems',
		description:
			'Compose utility-first interfaces, @theme design tokens, dark mode theming, and fluid typography.',
		duration: '5 hours',
		row: 2,
		col: 0,
		prerequisites: ['css-layouts'],
		labHref: '/foundations/styling-assets',
		labTitle: '02. Tailwind CSS v4, Styling & Asset Architecture',
		resources: [{ title: 'Tailwind CSS Documentation', url: 'https://tailwindcss.com/docs' }]
	},
	{
		id: 'typescript',
		title: 'TypeScript 6',
		description:
			'Add static type safety with generics, discriminated unions, satisfies, mapped types, and strict compiler checks.',
		duration: '8 hours',
		row: 2,
		col: 2,
		prerequisites: ['javascript-core'],
		labHref: '/foundations/typescript',
		labTitle: '03. TypeScript 6 & Strict Typing',
		resources: [
			{
				title: 'TypeScript Handbook',
				url: 'https://www.typescriptlang.org/docs/handbook/intro.html'
			}
		]
	},
	{
		id: 'svelte-runes',
		title: 'Svelte 5 & Hydration',
		description:
			'Build fine-grained reactive UIs using $state, $derived, snippets, streaming SSR, and hydration boundaries.',
		duration: '8 hours',
		row: 3,
		col: 1,
		prerequisites: ['tailwind-design', 'typescript'],
		labHref: '/rendering/hydration-serialization',
		labTitle: '15. Hydration Engines & Data Serialisation',
		resources: [{ title: 'Svelte 5 Docs', url: 'https://svelte.dev/docs/svelte/overview' }]
	},
	{
		id: 'sveltekit-fullstack',
		title: 'Full-Stack Architecture',
		description:
			'Ship full-stack applications with SSG/SSR strategies, project hierarchies, edge APIs, and static/serverless adapters.',
		duration: '10 hours',
		row: 4,
		col: 1,
		prerequisites: ['svelte-runes'],
		labHref: '/runtimes/project-structures',
		labTitle: '09. Modern Project Types & Directory Structures',
		resources: [{ title: 'SvelteKit Docs', url: 'https://svelte.dev/docs/kit/introduction' }]
	}
];
