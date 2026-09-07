import type { RequestHandler } from './$types';
import { SITE } from '$lib/config/site';

export const prerender = true;

export const GET: RequestHandler = () => {
	const body = `User-agent: *
Allow: /

# Host & Sitemaps
Host: ${SITE.url}
Sitemap: ${SITE.url}/sitemap.xml
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=86400, stale-while-revalidate=86400'
		}
	});
};
