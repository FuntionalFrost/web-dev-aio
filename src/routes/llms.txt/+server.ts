import type { RequestHandler } from './$types';
import { SITE } from '$lib/config/site';
import { getCurriculumByTrack } from '$lib/data/curriculum';

export const prerender = true;

export const GET: RequestHandler = () => {
	const tracks = getCurriculumByTrack();

	let doc = `# ${SITE.name}

> ${SITE.description}

## Overview
Web Engine 2026 is an interactive reference architecture and engineering lab suite demonstrating modern full-stack web standards, including Svelte 5 runes, Tailwind CSS v4 CSS-first theming, TypeScript 6 strict types, Drizzle ORM, Neon Postgres, Better Auth, and serverless Edge deployments.

## Curriculum Modules

`;

	for (let i = 0; i < tracks.length; i++) {
		const group = tracks[i];
		doc += `### Track 0${i + 1}: ${group.track}\n\n`;

		for (const mod of group.modules) {
			doc += `- [${mod.title}](${SITE.url}${mod.href})\n`;
			doc += `  - **Category**: ${mod.category}\n`;
			doc += `  - **Technologies**: ${mod.tech.join(', ')}\n`;
			doc += `  - **Description**: ${mod.description}\n\n`;
		}
	}

	doc += `## Core Technologies
- Svelte 5 (Runes, snippets, reactive effects)
- Tailwind CSS v4 (@theme CSS-first engine)
- TypeScript 6 (Strict literal inference, const type parameters)
- SvelteKit 2 (Static prerendering, edge adapters)
- Better Auth (Session management, passkeys)
- Drizzle ORM + Neon Postgres (Serverless edge database)
- Upstash Redis (Distributed rate limiting)
`;

	return new Response(doc, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=86400, stale-while-revalidate=86400'
		}
	});
};
