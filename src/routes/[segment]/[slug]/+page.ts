import { curriculum } from '#lib/data/curriculum.js';
import { guides } from '#lib/data/guides.js';
import { snippets } from '#lib/data/snippets.js';
import { siteConfig } from '#lib/config/site.js';
import { definePageSeo } from 'yaxa-svelte';
import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
	return curriculum.map((mod) => {
		const parts = mod.href.replace(/^\//, '').split('/');
		return {
			segment: parts[0],
			slug: parts[1]
		};
	});
};

export const load: PageLoad = ({ params }) => {
	const { segment, slug } = params;
	const routeKey = `${segment}/${slug}`;
	const mod = curriculum.find((m) => m.href === `/${routeKey}`);
	if (!mod) {
		error(404, `Lab "${routeKey}" not found`);
	}

	const guideHtml = guides[routeKey];
	if (!guideHtml) {
		error(404, `Lab content for "${routeKey}" not found`);
	}

	const snippet = snippets[routeKey];

	return {
		segment,
		slug,
		mod,
		guideHtml,
		snippet,
		seo: definePageSeo({
			title: mod.title,
			description: mod.description,
			badge: mod.track,
			canonical: `${siteConfig.url}/${routeKey}`,
			ogImage: `${siteConfig.url}/og/${routeKey}`,
			keywords: mod.tech
		})
	};
};
