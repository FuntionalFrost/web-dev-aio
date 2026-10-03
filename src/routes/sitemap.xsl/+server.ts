import { createSitemapXslHandler } from 'yaxa-svelte';
import { siteConfig } from '#lib/config/site.js';

export const prerender = true;

export const GET = createSitemapXslHandler({ config: siteConfig });
