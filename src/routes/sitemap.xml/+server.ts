import { createSitemapHandler } from 'yaxa-svelte';
import { siteConfig } from '$lib/config/site';
import { getAllLabs } from '$lib/server/labs';

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
		}
	],
	dynamicRoutes: async () => {
		const labs = await getAllLabs();
		return labs.map((l) => ({
			loc: `/${l.segment}/${l.slug}`,
			lastmod: l.lastmod,
			changefreq: 'weekly' as const,
			priority: 0.8,
			images: [
				{
					loc: `${siteConfig.url}/og/${l.segment}/${l.slug}`,
					title: `${l.title} — ${l.track}`,
					caption: l.description
				}
			]
		}));
	}
});
