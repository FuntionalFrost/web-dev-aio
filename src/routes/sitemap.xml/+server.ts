import { createSitemapHandler } from 'yaxa-svelte';
import { siteConfig } from '#lib/config/site.js';
import { curriculum } from '#lib/data/curriculum.js';

export const prerender = true;

export const GET = createSitemapHandler({
	config: siteConfig,
	staticRoutes: [
		{
			loc: '/',
			changefreq: 'weekly' as const,
			priority: 1.0,
			images: [
				{
					loc: `${siteConfig.url}/api/og`,
					title: `${siteConfig.name} Full-Stack Architecture Reference`,
					caption: siteConfig.description
				}
			]
		},
		{
			loc: '/theme',
			changefreq: 'monthly' as const,
			priority: 0.6
		}
	],
	dynamicRoutes: async () => {
		return curriculum.map((l) => {
			const parts = l.href.replace(/^\//, '').split('/');
			return {
				loc: l.href,
				lastmod: '2026-09-30',
				changefreq: 'weekly' as const,
				priority: 0.8,
				images: [
					{
						loc: `${siteConfig.url}/og/${parts[0]}/${parts[1]}`,
						title: `${l.title} — ${l.track}`,
						caption: l.description
					}
				]
			};
		});
	}
});
