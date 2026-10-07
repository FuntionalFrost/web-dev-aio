import { definePageSeo } from 'yaxa-svelte';

export const prerender = true;

export const load = () => {
	return {
		seo: definePageSeo({
			title: 'Theme Studio',
			description:
				'Visually customize palettes, harmonic radii, fonts, and scrollbars with instant live preview and zero FOUC.',
			badge: 'Design System'
		})
	};
};
