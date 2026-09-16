import { getLab, getAllLabEntries } from '$lib/server/labs';
import { siteConfig } from '$lib/config/site';
import { definePageSeo } from 'yaxa-svelte';
import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageServerLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = async () => {
	return await getAllLabEntries();
};

export const load: PageServerLoad = async ({ params }) => {
	const lab = await getLab(params.segment, params.slug);
	if (!lab) {
		error(404, `Lab "${params.segment}/${params.slug}" not found`);
	}

	return {
		lab,
		seo: definePageSeo({
			title: lab.title,
			description: lab.description,
			badge: lab.track,
			canonical: `${siteConfig.url}/${params.segment}/${params.slug}`,
			ogImage: `${siteConfig.url}/og/${params.segment}/${params.slug}`,
			keywords: lab.tech
		})
	};
};
