import { siteConfig } from '$lib/config/site';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = () => {
	const manifest = {
		name: siteConfig.title || siteConfig.name,
		short_name: siteConfig.name,
		description: siteConfig.description,
		id: '/',
		start_url: '/',
		scope: '/',
		display: 'standalone',
		orientation: 'any',
		lang: 'en-US',
		background_color: '#020617',
		theme_color: '#4f46e5',
		categories: ['developer tools', 'education', 'productivity'],
		icons: [
			{
				src: '/web-app-manifest-192x192.png',
				sizes: '192x192',
				type: 'image/png',
				purpose: 'any'
			},
			{
				src: '/web-app-manifest-192x192.png',
				sizes: '192x192',
				type: 'image/png',
				purpose: 'maskable'
			},
			{
				src: '/web-app-manifest-512x512.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'any'
			},
			{
				src: '/web-app-manifest-512x512.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'maskable'
			},
			{
				src: '/favicon.svg',
				sizes: 'any',
				type: 'image/svg+xml',
				purpose: 'any'
			}
		],
		shortcuts: [
			{
				name: 'Modern HTML5 & Web Standards',
				short_name: 'HTML5 Standards',
				description: 'Native dialogs, accordions and Web Crypto APIs',
				url: '/foundations/html5',
				icons: [{ src: '/favicon.svg', sizes: 'any' }]
			},
			{
				name: 'Tailwind CSS v4 & Styling',
				short_name: 'Tailwind v4',
				description: 'CSS-first engine and native theme tokens',
				url: '/foundations/styling-assets',
				icons: [{ src: '/favicon.svg', sizes: 'any' }]
			},
			{
				name: 'TypeScript 6 Strict Types',
				short_name: 'TypeScript 6',
				description: 'Discriminated unions and strict narrowing',
				url: '/foundations/typescript',
				icons: [{ src: '/favicon.svg', sizes: 'any' }]
			},
			{
				name: 'Cloudflare & Edge Deploy',
				short_name: 'Edge Cloud',
				description: 'Global serverless edge isolate architecture',
				url: '/cloud/platforms-deployment',
				icons: [{ src: '/favicon.svg', sizes: 'any' }]
			}
		]
	};

	return new Response(JSON.stringify(manifest, null, 2), {
		headers: {
			'Content-Type': 'application/manifest+json; charset=utf-8',
			'Cache-Control': 'public, max-age=86400'
		}
	});
};
