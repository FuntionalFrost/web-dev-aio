import { createHighlighter, type Highlighter } from 'shiki';

let highlighterPromise: Promise<Highlighter> | null = null;

export async function getHighlighter(): Promise<Highlighter> {
	if (!highlighterPromise) {
		highlighterPromise = createHighlighter({
			themes: ['github-light', 'github-dark-dimmed'],
			langs: ['typescript', 'javascript', 'html', 'css', 'svelte']
		});
	}
	return highlighterPromise;
}

export async function highlightCode(code: string, lang = 'typescript'): Promise<string> {
	const highlighter = await getHighlighter();
	return highlighter.codeToHtml(code.trim(), {
		lang,
		themes: {
			light: 'github-light',
			dark: 'github-dark-dimmed'
		},
		defaultColor: false
	});
}
