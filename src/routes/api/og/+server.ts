import { generateOgSvg } from 'yaxa-svelte';
import { siteConfig } from '$lib/config/site';

export const prerender = true;

export const GET = () => {
	const svg = generateOgSvg({
		title: siteConfig.title,
		description: siteConfig.description,
		siteName: siteConfig.name,
		badge: siteConfig.project?.badge ?? 'Web Engine 2026',
		tag: 'Architecture Guide',
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
