import { siteConfig } from '$lib/config/site';
import { definePageSeo } from 'yaxa-svelte';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = () => {
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
