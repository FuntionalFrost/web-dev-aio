<script lang="ts">
	import { page } from '$app/state';
	import { MetaTags, JsonLd } from 'svelte-meta-tags';
	import { SITE } from '$lib/config/site';
	import { curriculum } from '$lib/data/curriculum';
	import { buildJsonLd } from '$lib/seo/schema';

	const cleanPath = (p: string) => p.replace(/\/$/, '') || '/';

	let currentPath = $derived(cleanPath(page.url.pathname));
	let isHome = $derived(currentPath === '/');
	let activeModule = $derived(curriculum.find((m) => cleanPath(m.href) === currentPath));

	let title = $derived(activeModule ? activeModule.title : 'Modern Web Engineering Guide');
	let description = $derived(activeModule?.description ?? SITE.description);
	let canonicalUrl = $derived(isHome ? SITE.url : `${SITE.url}${currentPath}`);

	let jsonLdSchemas = $derived(
		buildJsonLd({
			isHome,
			activeModule,
			canonicalUrl
		})
	);
</script>

<MetaTags
	{title}
	titleTemplate={`%s | ${SITE.name}`}
	{description}
	canonical={canonicalUrl}
	robots="index, follow"
	openGraph={{
		type: activeModule ? 'article' : 'website',
		url: canonicalUrl,
		title: activeModule ? `${activeModule.title} | ${SITE.name}` : `${SITE.name} | Architecture Guide`,
		description,
		siteName: SITE.name,
		images: [
			{
				url: SITE.ogImage,
				secureUrl: SITE.ogImage,
				type: 'image/png',
				width: 1200,
				height: 630,
				alt: activeModule ? `${activeModule.title} - ${SITE.name}` : `${SITE.name} Architecture`
			}
		],
		...(activeModule
			? {
					article: {
						section: activeModule.track,
						tags: activeModule.tech,
						authors: [SITE.author]
					}
				}
			: {})
	}}
	twitter={{
		cardType: 'summary_large_image',
		title: activeModule ? `${activeModule.title} | ${SITE.name}` : SITE.name,
		description,
		image: SITE.ogImage,
		imageAlt: activeModule ? `${activeModule.title} - ${SITE.name}` : `${SITE.name} Architecture`
	}}
	additionalMetaTags={[
		{ name: 'author', content: SITE.author },
		{
			name: 'keywords',
			content: activeModule ? `${activeModule.tech.join(', ')}, ${SITE.keywords}` : SITE.keywords
		}
	]}
/>

<JsonLd schema={jsonLdSchemas} />
