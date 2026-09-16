import { generateOgSvg } from 'yaxa-svelte';
import { siteConfig } from '$lib/config/site';
import { curriculum } from '$lib/data/curriculum';
import { toRouteKey } from '$lib/utils/url';
import type { EntryGenerator, RequestHandler } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
	const allEntries = curriculum.map((mod) => ({
		slug: toRouteKey(mod.href)
	}));
	allEntries.push({ slug: 'default' });
	return allEntries;
};

export const GET: RequestHandler = ({ params }) => {
	const slug = params.slug;
	const mod = curriculum.find((m) => toRouteKey(m.href) === slug);

	const svg = generateOgSvg({
		title: mod ? mod.title : siteConfig.title,
		description: mod ? mod.description : siteConfig.description,
		siteName: siteConfig.name,
		badge: mod ? mod.track : 'Web Engine 2026',
		tag: mod ? mod.category : 'Architecture Guide',
		theme: 'dark',
		url: siteConfig.url
	});

	return new Response(svg, {
		headers: {
			'Content-Type': 'image/svg+xml; charset=utf-8',
			'Cache-Control': 'public, max-age=31536000, immutable'
		}
	});
};
