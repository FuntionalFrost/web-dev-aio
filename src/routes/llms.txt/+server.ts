import { createLlmsTxtHandler } from 'yaxa-svelte/seo';
import { siteConfig } from '#lib/config/site.js';
import { getCurriculumByTrack } from '#lib/data/curriculum.js';

export const prerender = true;

const tracks = getCurriculumByTrack();

export const GET = createLlmsTxtHandler({
	config: siteConfig,
	sections: tracks.map((group, i) => ({
		title: `Track 0${i + 1}: ${group.track}`,
		links: group.modules.map((mod) => ({
			title: mod.title,
			url: mod.href,
			description: `${mod.category} [${mod.tech.join(', ')}] — ${mod.description}`
		}))
	})),
	notes: [
		'Svelte 5 Runes, snippets, and event handlers exclusively',
		'yaxa-svelte (v2.10.1 headless primitives, Theme Studio, and tokens: https://yaxa.vercel.app)',
		'Tailwind CSS v4 CSS-first theming with @theme tokens',
		'TypeScript 6 strict literal inference and const type parameters',
		'SvelteKit 3 static prerendering via @sveltejs/adapter-static',
		'Better Auth session management and WebAuthn passkeys',
		'Drizzle ORM + Neon Postgres serverless edge data layer',
		'Upstash Redis distributed rate limiting'
	]
});
