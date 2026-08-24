import type { ServerLoadEvent } from '@sveltejs/kit';
import { highlightCode } from '$lib/server/shiki';
import { snippets, type SnippetDefinition } from '$lib/data/snippets';

const EXTENSIONS: Record<string, string> = {
	typescript: 'ts',
	javascript: 'js',
	html: 'html',
	svelte: 'svelte',
	vue: 'vue',
	css: 'css',
	json: 'json'
};

export interface LabPageData {
	codeHtml: string;
	rawCode: string;
	filename: string;
}

export function createLabLoader() {
	return async ({ route }: ServerLoadEvent): Promise<LabPageData> => {
		// 1. Clean route ID (e.g. "/foundations/html5" -> "foundations/html5")
		const rawRouteId = route.id ?? '';
		const routeKey = rawRouteId.replace(/^\//, '');
		const folderSlug = routeKey.split('/').filter(Boolean).pop() ?? 'snippet';

		// 2. Fetch snippet from dictionary
		const definition: SnippetDefinition = snippets[routeKey] ?? {
			code: '// Code snippet coming soon',
			lang: 'typescript'
		};

		const lang = definition.lang ?? 'typescript';
		const extension = EXTENSIONS[lang] ?? 'ts';
		const filename = `${folderSlug}.${extension}`;

		// 3. Highlight code at build time
		const codeHtml = await highlightCode(definition.code.trim(), lang);

		return {
			codeHtml,
			rawCode: definition.code.trim(),
			filename
		};
	};
}
