import { createRobotsHandler } from 'yaxa-svelte';
import { siteConfig } from '$lib/config/site';

export const prerender = true;

export const GET = createRobotsHandler({
	config: siteConfig,
	isProduction: true,
	aiCrawlers: 'allow'
});
