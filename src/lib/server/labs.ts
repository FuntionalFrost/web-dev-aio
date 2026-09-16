import { highlightCode } from '$lib/server/shiki';
import { processLabMarkdown } from '$lib/server/markdown';
import { snippets, type SnippetDefinition } from '$lib/data/snippets';

const rawLabFiles = import.meta.glob('/src/content/labs/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

export interface LabDetail {
	id: string;
	slug: string;
	segment: string;
	title: string;
	track: string;
	category: string;
	tech: string[];
	description: string;
	guideHtml: string;
	codeHtml: string;
	rawCode: string;
	filename: string;
	lastmod: string;
}

const EXTENSIONS: Record<string, string> = {
	typescript: 'ts',
	javascript: 'js',
	html: 'html',
	svelte: 'svelte',
	vue: 'vue',
	css: 'css',
	json: 'json',
	yaml: 'yaml',
	bash: 'sh'
};

let cachedLabs: Map<string, LabDetail> | null = null;

export async function getAllLabs(): Promise<LabDetail[]> {
	if (cachedLabs) {
		return Array.from(cachedLabs.values());
	}

	const labsMap = new Map<string, LabDetail>();

	for (const rawContent of Object.values(rawLabFiles)) {
		const doc = await processLabMarkdown(rawContent);
		const meta = doc.metadata;
		const segment = String(meta.segment || '');
		const slug = String(meta.slug || '');
		const routeKey = `${segment}/${slug}`;

		const definition: SnippetDefinition = snippets[routeKey] ?? {
			code: '// Code snippet coming soon',
			lang: 'typescript'
		};

		const lang = (meta.snippetLang as string) || definition.lang || 'typescript';
		const extension = EXTENSIONS[lang] ?? 'ts';
		const filename = `${slug}.${extension}`;
		const rawCode = definition.code.trim();
		const codeHtml = await highlightCode(rawCode, lang);

		const lab: LabDetail = {
			id: String(meta.id || slug),
			slug,
			segment,
			title: meta.title,
			track: String(meta.track || 'Engineering Track'),
			category: String(meta.category || 'Architecture Guide'),
			tech: Array.isArray(meta.tech) ? (meta.tech as string[]) : [],
			description: String(meta.description || ''),
			guideHtml: doc.contentHtml,
			codeHtml,
			rawCode,
			filename,
			lastmod: String(meta.lastmod || '2026-02-15')
		};

		labsMap.set(routeKey, lab);
	}

	cachedLabs = labsMap;
	return Array.from(labsMap.values());
}

export async function getLab(segment: string, slug: string): Promise<LabDetail | undefined> {
	const all = await getAllLabs();
	return all.find((l) => l.segment === segment && l.slug === slug);
}

export async function getAllLabEntries(): Promise<Array<{ segment: string; slug: string }>> {
	const all = await getAllLabs();
	return all.map((l) => ({ segment: l.segment, slug: l.slug }));
}
