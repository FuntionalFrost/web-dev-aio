import { createHighlighter, type Highlighter } from 'shiki';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';

let highlighterPromise: Promise<Highlighter> | null = null;

export async function getHighlighter(): Promise<Highlighter> {
	if (!highlighterPromise) {
		highlighterPromise = createHighlighter({
			themes: ['github-dark-dimmed'],
			langs: ['typescript', 'javascript', 'html', 'css', 'svelte', 'vue', 'json', 'yaml', 'bash'],
			engine: createJavaScriptRegexEngine()
		});
	}
	return highlighterPromise;
}

export async function highlightCode(code: string, lang = 'typescript'): Promise<string> {
	const highlighter = await getHighlighter();

	return highlighter.codeToHtml(code.trim(), {
		lang,
		theme: 'github-dark-dimmed'
	});
}
