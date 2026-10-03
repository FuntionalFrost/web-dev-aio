import { siteConfig } from '#lib/config/site.js';
import { definePageSeo } from 'yaxa-svelte';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = () => {
	return {
		seo: definePageSeo({
			title: 'Full-Stack Architecture Labs',
			description: siteConfig.description,
			canonical: siteConfig.url,
			ogImage: `${siteConfig.url}/og/default`,
			badge: siteConfig.project?.badge
		})
	};
};
