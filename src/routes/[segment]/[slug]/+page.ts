import { curriculum } from '$lib/data/curriculum';
import { snippets } from '$lib/data/snippets';
import { siteConfig } from '$lib/config/site';
import { definePageSeo } from 'yaxa-svelte';
import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageLoad } from './$types';
import type { Component } from 'svelte';

export const prerender = true;

const labModules = import.meta.glob<{ default: Component }>('/src/content/labs/*.md');

export const entries: EntryGenerator = () => {
	return curriculum.map((mod) => {
		const parts = mod.href.replace(/^\//, '').split('/');
		return {
			segment: parts[0],
			slug: parts[1]
		};
	});
};

export const load: PageLoad = async ({ params }) => {
	const { segment, slug } = params;
	const mod = curriculum.find((m) => m.href === `/${segment}/${slug}`);
	if (!mod) {
		error(404, `Lab "${segment}/${slug}" not found`);
	}

	const filePath = `/src/content/labs/${segment}_${slug}.md`;
	const loader = labModules[filePath];
	if (!loader) {
		error(404, `Lab content for "${segment}/${slug}" not found`);
	}

	const doc = await loader();
	const snippet = snippets[`${segment}/${slug}`];

	return {
		segment,
		slug,
		mod,
		component: doc.default,
		snippet,
		seo: definePageSeo({
			title: mod.title,
			description: mod.description,
			badge: mod.track,
			canonical: `${siteConfig.url}/${segment}/${slug}`,
			ogImage: `${siteConfig.url}/og/${segment}/${slug}`,
			keywords: mod.tech
		})
	};
};
