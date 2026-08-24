import * as sitemap from 'super-sitemap/sveltekit';
import type { RequestHandler } from './$types';
import { SITE } from '$lib/config/site';

export const prerender = true;

export const GET: RequestHandler = async () => {
	return await sitemap.response({
		origin: SITE.url,
		excludeRoutePatterns: [
			/^\/api\/.*/ // Exclude internal API routes if any
		],
		defaultChangefreq: 'weekly',
		defaultPriority: 0.8,
		sort: 'alpha'
	});
};
