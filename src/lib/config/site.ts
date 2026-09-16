import { defineSiteConfig, type SiteConfig } from 'yaxa-svelte';
import { curriculum } from '$lib/data/curriculum';

export const LABS_COUNT = curriculum.length;

export const siteConfig: SiteConfig = defineSiteConfig({
	name: 'Web Engine 2026',
	title: 'Web Engine 2026 — Modern Full-Stack Architecture Reference',
	description: `Production-grade reference architecture and ${LABS_COUNT} interactive engineering labs covering Modern HTML5, Web Standards, Tailwind v4, TS6, Nitro, Hono, Bun, Deno, Node 26, Drizzle ORM, Better Auth, S3/R2 Storage, Containers, and Edge Cloud.`,
	url: 'https://web-engine26.pages.dev',
	logo: '/favicon.svg',
	version: '1.0.0',
	author: {
		name: 'Web Engine 2026 Team',
		url: 'https://web-engine26.pages.dev'
	},
	project: {
		license: 'MIT',
		type: 'open-source',
		pricingModel: 'free',
		repositoryUrl: 'https://github.com/FuntionalFrost/web-dev-aio',
		isAccessibleForFree: true,
		badge: `${LABS_COUNT} Architecture Labs`
	},
	seo: {
		titleTemplate: '%s | Web Engine 2026',
		defaultOgImage: 'https://web-engine26.pages.dev/api/og',
		twitterCard: 'summary_large_image',
		keywords: [
			'HTML5',
			'Web Standards',
			'Nitro',
			'Hono',
			'Vite 6',
			'Bun',
			'Deno',
			'Node 26',
			'Tailwind CSS v4',
			'TypeScript 6',
			'Drizzle ORM',
			'Better Auth',
			'S3 R2 Storage',
			'Podman Docker',
			'Cloudflare Workers',
			'Software Licences',
			'Monetisation',
			'Full-Stack Architecture'
		],
		robots: {
			index: true,
			follow: true
		}
	},
	sitemap: {
		changefreq: 'weekly',
		priority: 0.8,
		exclude: ['/admin/*']
	},
	robots: {
		rules: [
			{
				userAgent: '*',
				allow: ['/', '/api/og', '/og/*'],
				disallow: ['/admin/']
			}
		]
	},
	socials: {
		github: 'https://github.com/FuntionalFrost/web-dev-aio'
	}
});

// Backward-compatible alias for existing imports
export const SITE = {
	name: siteConfig.name,
	url: siteConfig.url,
	description: siteConfig.description,
	ogImage: 'https://web-engine26.pages.dev/api/og',
	author: siteConfig.author?.name ?? 'Web Engine 2026 Team',
	keywords: (siteConfig.seo?.keywords ?? []).join(', ')
} as const;
