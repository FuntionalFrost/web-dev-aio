import * as sitemap from 'super-sitemap/sveltekit';
import type { RequestHandler } from './$types';
import { SITE } from '$lib/config/site';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const buildDate = new Date().toISOString().split('T')[0];

	return await sitemap.response({
		origin: SITE.url,
		excludeRoutePatterns: [
			/^\/api\/.*/ // Exclude internal API routes if any
		],
		defaultChangefreq: 'weekly',
		defaultPriority: 0.8,
		processPaths: (paths) => {
			return paths.map((p) => {
				const isRoot = p.path === '/' || p.path === '';
				return {
					...p,
					priority: isRoot ? (1.0 as const) : (0.8 as const),
					changefreq: isRoot ? ('daily' as const) : ('weekly' as const),
					lastmod: buildDate
				};
			});
		},
		sort: 'alpha'
	});
};
