import { SITE } from '$lib/config/site';
import { curriculum, type CurriculumModule } from '$lib/data/curriculum';

export interface SchemaContext {
	isHome: boolean;
	activeModule?: CurriculumModule;
	canonicalUrl: string;
}

export function buildJsonLd({
	isHome,
	activeModule,
	canonicalUrl
}: SchemaContext): Array<Record<string, unknown>> {
	if (isHome) {
		return [
			{
				'@context': 'https://schema.org',
				'@type': 'WebSite',
				name: SITE.name,
				url: SITE.url,
				description: SITE.description,
				inLanguage: 'en-US',
				publisher: {
					'@type': 'Organization',
					name: SITE.name,
					url: SITE.url,
					logo: `${SITE.url}/favicon.svg`
				},
				potentialAction: {
					'@type': 'SearchAction',
					target: {
						'@type': 'EntryPoint',
						urlTemplate: `${SITE.url}/?q={search_term_string}`
					},
					'query-input': 'required name=search_term_string'
				}
			},
			{
				'@context': 'https://schema.org',
				'@type': 'ItemList',
				name: `${SITE.name} Curriculum`,
				description: '21 Full-Stack Architecture Engineering Labs',
				numberOfItems: curriculum.length,
				itemListElement: curriculum.map((mod, idx) => ({
					'@type': 'ListItem',
					position: idx + 1,
					name: mod.title,
					description: mod.description,
					url: `${SITE.url}${mod.href}`
				}))
			}
		];
	}

	if (activeModule) {
		const trackAnchor = `${SITE.url}/#track-${encodeURIComponent(activeModule.track.toLowerCase().replace(/\s+/g, '-'))}`;

		return [
			{
				'@context': 'https://schema.org',
				'@type': 'TechArticle',
				mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
				headline: activeModule.title,
				description: activeModule.description,
				inLanguage: 'en-US',
				keywords: `${activeModule.tech.join(', ')}, ${SITE.keywords}`,
				articleSection: activeModule.track,
				educationalLevel: 'Intermediate/Advanced',
				image: SITE.ogImage,
				author: {
					'@type': 'Organization',
					name: SITE.author,
					url: SITE.url
				},
				publisher: {
					'@type': 'Organization',
					name: SITE.name,
					url: SITE.url,
					logo: `${SITE.url}/favicon.svg`
				}
			},
			{
				'@context': 'https://schema.org',
				'@type': 'BreadcrumbList',
				itemListElement: [
					{
						'@type': 'ListItem',
						position: 1,
						name: 'Home',
						item: SITE.url
					},
					{
						'@type': 'ListItem',
						position: 2,
						name: activeModule.track,
						item: trackAnchor
					},
					{
						'@type': 'ListItem',
						position: 3,
						name: activeModule.title,
						item: canonicalUrl
					}
				]
			}
		];
	}

	return [
		{
			'@context': 'https://schema.org',
			'@type': 'WebPage',
			name: SITE.name,
			url: canonicalUrl,
			description: SITE.description
		}
	];
}
