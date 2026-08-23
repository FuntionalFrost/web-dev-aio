import * as sitemap from 'super-sitemap/sveltekit';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	return await sitemap.response({
		origin: 'https://web-engine26.pages.dev',
		excludeRoutePatterns: [
			/^\/api\/.*/ // Exclude internal API routes if any
		],
		defaultChangefreq: 'weekly',
		defaultPriority: 0.8,
		sort: 'alpha'
	});
};
