import { createSitemapHandler } from 'yaxa-svelte';
import { siteConfig } from '$lib/config/site';
import { getAllLabs } from '$lib/server/labs';

export const prerender = true;

export const GET = createSitemapHandler({
	config: siteConfig,
	dynamicRoutes: async () => {
		const labs = await getAllLabs();
		return labs.map((l) => ({
			loc: `/${l.segment}/${l.slug}`,
			lastmod: l.lastmod,
			changefreq: 'weekly' as const,
			priority: 0.8
		}));
	}
});
