import { SITE, siteConfig } from '$lib/config/site';
import { curriculum, type CurriculumModule } from '$lib/data/curriculum';
import { toRouteKey } from '$lib/utils/url';
import {
	generateWebSiteSchema,
	generateArticleSchema,
	generateBreadcrumbSchema,
	generateSoftwareSourceCodeSchema
} from 'yaxa-svelte';

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
		const webSiteSchema = generateWebSiteSchema(siteConfig);
		const sourceCodeSchema = generateSoftwareSourceCodeSchema(siteConfig);
		const itemListSchema = {
			'@context': 'https://schema.org',
			'@type': 'ItemList',
			name: `${SITE.name} Curriculum`,
			description: `${curriculum.length} Full-Stack Architecture Engineering Labs`,
			numberOfItems: curriculum.length,
			itemListElement: curriculum.map((mod, idx) => ({
				'@type': 'ListItem',
				position: idx + 1,
				name: mod.title,
				description: mod.description,
				url: `${SITE.url}${mod.href}`
			}))
		};

		return [
			webSiteSchema as Record<string, unknown>,
			sourceCodeSchema as Record<string, unknown>,
			itemListSchema
		];
	}

	if (activeModule) {
		const ogImageUrl = `${SITE.url}/og/${toRouteKey(activeModule.href)}`;

		const articleSchema = generateArticleSchema(siteConfig, {
			title: activeModule.title,
			description: activeModule.description,
			url: canonicalUrl,
			image: ogImageUrl,
			datePublished: '2026-01-15T00:00:00Z',
			dateModified: '2026-09-17T00:00:00Z',
			authorName: siteConfig.author?.name ?? 'Web Engine 2026 Team'
		});

		const breadcrumbsSchema = generateBreadcrumbSchema(siteConfig, [
			{ name: 'Home', url: `${SITE.url}/` },
			{
				name: activeModule.track,
				url: `${SITE.url}/?track=${encodeURIComponent(activeModule.track)}`
			},
			{ name: activeModule.title, url: canonicalUrl }
		]);

		const learningResourceSchema = {
			'@context': 'https://schema.org',
			'@type': 'LearningResource',
			name: activeModule.title,
			description: activeModule.description,
			url: canonicalUrl,
			educationalLevel: 'Intermediate/Advanced',
			learningResourceType: 'Interactive Architecture Lab',
			competencyRequired: activeModule.tech.join(', '),
			teaches: activeModule.category,
			inLanguage: 'en-US'
		};

		const softwareSourceCodeSchema = {
			'@context': 'https://schema.org',
			'@type': 'SoftwareSourceCode',
			name: activeModule.title,
			description: activeModule.description,
			programmingLanguage: activeModule.tech.join(', '),
			runtimePlatform: activeModule.track,
			codeRepository: siteConfig.project?.repositoryUrl,
			license: 'https://opensource.org/licenses/MIT',
			author: {
				'@type': 'Organization',
				name: siteConfig.name,
				url: siteConfig.url
			}
		};

		return [
			articleSchema as Record<string, unknown>,
			breadcrumbsSchema as Record<string, unknown>,
			learningResourceSchema,
			softwareSourceCodeSchema
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
