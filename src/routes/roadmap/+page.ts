import { definePageSeo } from 'yaxa-svelte/seo';

export const prerender = true;

export const load = () => {
	return {
		seo: definePageSeo({
			title: 'Interactive Web Engineering Skill Tree & Roadmap',
			description:
				'Track your web engineering mastery across HTML5, CSS Layouts, Modern JavaScript, TypeScript 6, Svelte 5 Runes, and Full-Stack Architecture.',
			badge: 'Learning Path'
		})
	};
};
