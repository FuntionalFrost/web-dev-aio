import { highlightCode } from '$lib/server/shiki';

export interface LabMarkdownDoc {
	metadata: {
		id?: string;
		segment?: string;
		slug?: string;
		title: string;
		track?: string;
		category?: string;
		tech?: string[];
		description?: string;
		snippetLang?: string;
		lastmod?: string;
		[key: string]: unknown;
	};
	contentHtml: string;
}

/**
 * Parses frontmatter from a markdown string (---yaml---).
 */
export function parseFrontmatter(rawContent: string): {
	data: Record<string, unknown>;
	content: string;
} {
	const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
	const match = rawContent.match(frontmatterRegex);

	if (!match) {
		return { data: {}, content: rawContent.trim() };
	}

	const yamlBlock = match[1];
	const content = match[2].trim();
	const data: Record<string, unknown> = {};

	const lines = yamlBlock.split('\n');
	let i = 0;
	while (i < lines.length) {
		const line = lines[i];
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) {
			i++;
			continue;
		}

		const colonIdx = trimmed.indexOf(':');
		if (colonIdx === -1) {
			i++;
			continue;
		}

		const key = trimmed.slice(0, colonIdx).trim();
		let valStr = trimmed.slice(colonIdx + 1).trim();

		if (valStr.startsWith('[') && !valStr.endsWith(']')) {
			while (!valStr.endsWith(']') && i + 1 < lines.length) {
				i++;
				valStr += ' ' + lines[i].trim();
			}
		} else if (valStr === '' && i + 1 < lines.length && lines[i + 1].trim().startsWith('[')) {
			while (i + 1 < lines.length) {
				i++;
				valStr += ' ' + lines[i].trim();
				if (valStr.trim().endsWith(']')) break;
			}
			valStr = valStr.trim();
		}

		let val: unknown = valStr;
		if (valStr.startsWith('[') && valStr.endsWith(']')) {
			val = valStr
				.slice(1, -1)
				.split(',')
				.map((s: string) => s.trim().replace(/^['"]|['"]$/g, ''))
				.filter(Boolean);
		} else if (valStr.startsWith('"') && valStr.endsWith('"')) {
			val = valStr.slice(1, -1);
		} else if (valStr.startsWith("'") && valStr.endsWith("'")) {
			val = valStr.slice(1, -1);
		} else if (valStr === 'true') {
			val = true;
		} else if (valStr === 'false') {
			val = false;
		}

		data[key] = val;
		i++;
	}

	return { data, content };
}

/**
 * Renders markdown text to HTML with Shiki code block highlighting.
 */
export async function renderMarkdownToHtml(markdown: string): Promise<string> {
	// 1. Extract code blocks to prevent markdown regex inside code
	const codeBlocks: string[] = [];
	const contentWithPlaceholders = markdown.replace(
		/```(\w+)?\r?\n([\s\S]*?)```/g,
		(_, lang, code) => {
			const index = codeBlocks.length;
			codeBlocks.push(JSON.stringify({ lang: lang || 'typescript', code: code.trim() }));
			return `<!--CODE_BLOCK_${index}-->`;
		}
	);

	// 2. Markdown-to-HTML parser for headings, typography, tables, and lists
	let html = contentWithPlaceholders
		// Headings
		.replace(
			/^#### (.*$)/gim,
			'<h4 class="text-lg font-bold text-slate-900 dark:text-white">$1</h4>'
		)
		.replace(
			/^### (.*$)/gim,
			'<h3 class="text-xl font-bold text-slate-900 dark:text-white">$1</h3>'
		)
		.replace(
			/^## (.*$)/gim,
			'<h2 class="text-2xl font-extrabold text-slate-900 dark:text-white">$1</h2>'
		)
		.replace(
			/^# (.*$)/gim,
			'<h1 class="text-3xl font-extrabold text-slate-900 dark:text-white">$1</h1>'
		)
		// Bold and italic
		.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
		.replace(/\*(.*?)\*/g, '<em>$1</em>')
		// Inline code
		.replace(
			/`([^`]+)`/g,
			'<code class="rounded-md border border-slate-200/90 bg-slate-100/90 px-1.5 py-0.5 font-mono text-sm font-semibold text-slate-900 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-100">$1</code>'
		)
		// Blockquotes
		.replace(
			/^> (.*$)/gim,
			'<blockquote class="border-l-4 border-indigo-500 pl-4 italic text-slate-600 dark:text-slate-300">$1</blockquote>'
		)
		// Paragraphs (double newlines)
		.split(/\n\n+/)
		.map((para) => {
			const p = para.trim();
			if (!p) return '';
			if (
				p.startsWith('<h') ||
				p.startsWith('<blockquote') ||
				p.startsWith('<!--CODE_BLOCK_') ||
				p.startsWith('<table') ||
				p.startsWith('<ul') ||
				p.startsWith('<ol')
			) {
				return p;
			}
			return `<p class="text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">${p.replace(/\n/g, '<br/>')}</p>`;
		})
		.join('\n');

	// 3. Re-inject highlighted code blocks with Shiki
	for (let i = 0; i < codeBlocks.length; i++) {
		const { lang, code } = JSON.parse(codeBlocks[i]);
		const highlighted = await highlightCode(code, lang);
		html = html.replace(
			`<!--CODE_BLOCK_${i}-->`,
			`<div class="not-prose my-4">${highlighted}</div>`
		);
	}

	return html;
}

/**
 * Loads and processes a Markdown lab document.
 */
export async function processLabMarkdown(rawMarkdown: string): Promise<LabMarkdownDoc> {
	const { data, content } = parseFrontmatter(rawMarkdown);
	const contentHtml = await renderMarkdownToHtml(content);

	return {
		metadata: {
			id: typeof data.id === 'string' ? data.id : undefined,
			segment: typeof data.segment === 'string' ? data.segment : undefined,
			slug: typeof data.slug === 'string' ? data.slug : undefined,
			title: typeof data.title === 'string' ? data.title : 'Engineering Lab',
			track: typeof data.track === 'string' ? data.track : undefined,
			category: typeof data.category === 'string' ? data.category : undefined,
			tech: Array.isArray(data.tech) ? (data.tech as string[]) : undefined,
			description: typeof data.description === 'string' ? data.description : undefined,
			snippetLang: typeof data.snippetLang === 'string' ? data.snippetLang : undefined,
			lastmod: typeof data.lastmod === 'string' ? data.lastmod : undefined,
			...data
		},
		contentHtml
	};
}
