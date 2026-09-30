<script lang="ts">
	import { page } from '$app/state';
	import { Seo } from 'yaxa-svelte';
	import { siteConfig } from '$lib/config/site';
	import { curriculum } from '$lib/data/curriculum';
	import { buildJsonLd } from '$lib/seo/schema';
	import { cleanPath, toRouteKey } from '$lib/utils/url';

	let currentPath = $derived(cleanPath(page.url.pathname));
	let isHome = $derived(currentPath === '/');
	let isError = $derived(page.status >= 400);
	let activeModule = $derived(curriculum.find((m) => cleanPath(m.href) === currentPath));

	// Prefer declarative SEO from page.data.seo when available
	let pageSeo = $derived(page.data?.seo);

	let title = $derived(
		isError
			? '404 - Lab Not Found'
			: (pageSeo?.title ?? (activeModule ? activeModule.title : undefined))
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

	let resolvedOgImage = $derived(
		typeof pageSeo?.ogImage === 'string' ? pageSeo.ogImage : undefined
	);

	let ogImageUrl = $derived(
		resolvedOgImage ??
			(activeModule
				? `${siteConfig.url}/og/${toRouteKey(activeModule.href)}`
				: `${siteConfig.url}/og/default`)
	);

	let keywords = $derived(
		activeModule
			? [...activeModule.tech, ...(siteConfig.seo?.keywords ?? [])]
			: (siteConfig.seo?.keywords ?? [])
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

<Seo
	{title}
	{description}
	canonical={canonicalUrl}
	ogImage={ogImageUrl}
	noindex={isError}
	nofollow={isError}
	{keywords}
	schema={jsonLdSchemas}
/>
