<script lang="ts">
	import { page } from '$app/state';
	import { MetaTags, JsonLd } from 'svelte-meta-tags';
	import { SITE, siteConfig } from '$lib/config/site';
	import { curriculum } from '$lib/data/curriculum';
	import { buildJsonLd } from '$lib/seo/schema';
	import { cleanPath, toRouteKey } from '$lib/utils/url';
	import type { PageSeoConfig } from 'yaxa-svelte';

	let currentPath = $derived(cleanPath(page.url.pathname));
	let isHome = $derived(currentPath === '/');
	let isError = $derived(page.status >= 400);
	let activeModule = $derived(curriculum.find((m) => cleanPath(m.href) === currentPath));

	// Prefer declarative SEO from page.data.seo when available
	let pageSeo = $derived((page.data as { seo?: PageSeoConfig })?.seo);

	let title = $derived(
		isError
			? '404 - Lab Not Found'
			: (pageSeo?.title ?? (activeModule ? activeModule.title : 'Full-Stack Architecture Labs'))
	);
	let description = $derived(
		isError
			? siteConfig.description
			: (pageSeo?.description ?? activeModule?.description ?? siteConfig.description)
	);
	let canonicalUrl = $derived(
		isError
			? `${siteConfig.url}/404`
			: (pageSeo?.canonical ?? (isHome ? siteConfig.url : `${siteConfig.url}${currentPath}`))
	);
	let robots = $derived(isError ? 'noindex, nofollow' : 'index, follow');

	let resolvedOgImage = $derived(
		typeof pageSeo?.ogImage === 'string' ? pageSeo.ogImage : undefined
	);

	let ogImageUrl = $derived(
		resolvedOgImage ??
			(activeModule
				? `${siteConfig.url}/og/${toRouteKey(activeModule.href)}`
				: `${siteConfig.url}/og/default`)
	);

	let jsonLdSchemas = $derived(
		isError
			? []
			: buildJsonLd({
					isHome,
					activeModule,
					canonicalUrl
				})
	);
</script>

<MetaTags
	{title}
	titleTemplate={`%s | ${siteConfig.name}`}
	{description}
	canonical={canonicalUrl}
	{robots}
	openGraph={{
		type: activeModule ? 'article' : 'website',
		url: canonicalUrl,
		title: activeModule
			? `${activeModule.title} | ${siteConfig.name}`
			: `${siteConfig.name} | Architecture Guide`,
		description,
		siteName: siteConfig.name,
		locale: 'en_US',
		images: [
			{
				url: ogImageUrl,
				secureUrl: ogImageUrl,
				type: 'image/svg+xml',
				width: 1200,
				height: 630,
				alt: activeModule
					? `${activeModule.title} - ${siteConfig.name}`
					: `${siteConfig.name} Architecture`
			}
		],
		...(activeModule
			? {
					article: {
						section: activeModule.track,
						tags: activeModule.tech,
						authors: [siteConfig.author?.name ?? SITE.author],
						publishedTime: '2026-01-15T00:00:00Z',
						modifiedTime:
							(page.data as { lab?: { lastmod?: string } })?.lab?.lastmod ?? '2026-09-17T00:00:00Z'
					}
				}
			: {})
	}}
	twitter={{
		cardType: 'summary_large_image',
		title: activeModule ? `${activeModule.title} | ${siteConfig.name}` : siteConfig.name,
		description,
		image: ogImageUrl,
		imageAlt: activeModule
			? `${activeModule.title} - ${siteConfig.name}`
			: `${siteConfig.name} Architecture`
	}}
	additionalMetaTags={[
		{ name: 'author', content: siteConfig.author?.name ?? SITE.author },
		{
			name: 'keywords',
			content: activeModule ? `${activeModule.tech.join(', ')}, ${SITE.keywords}` : SITE.keywords
		},
		{ name: 'theme-color', content: '#4f46e5' },
		{ name: 'apple-mobile-web-app-title', content: siteConfig.name },
		{ name: 'application-name', content: siteConfig.name }
	]}
/>

{#if jsonLdSchemas.length > 0}
	<JsonLd schema={jsonLdSchemas} />
{/if}
