import { highlightCode } from '$lib/server/shiki';
import type { PageServerLoad } from './$types';

export const prerender = true;

const tailwindSnippet = `
/* 1. CSS-First Design Tokens in app.css */
@import "tailwindcss";

@theme {
  --color-neon-accent: oklch(0.85 0.28 var(--accent-hue, 150));
  --radius-interactive: var(--custom-radius, 1rem);
  --font-mono-code: 'JetBrains Mono', monospace;
}

/* 2. Custom Utility Definitions */
@utility glass-card {
  background: radial-gradient(circle at top left, rgb(255 255 255 / 0.08), transparent);
  backdrop-filter: blur(12px);
}

/* 3. Template Usage */
<div class="glass-card rounded-(--radius-interactive) border border-neon-accent/30 p-6">
  <span class="text-neon-accent font-mono-code">OKLCH Active</span>
</div>
`;

export const load: PageServerLoad = async () => {
	const highlightedCode = await highlightCode(tailwindSnippet, 'css');

	return {
		meta: {
			title: 'Tailwind CSS v4: CSS-First Engine & Design Tokens',
			description:
				'Explore the JavaScript-free configuration engine, dynamic @theme token bindings, and runtime OKLCH color adjustments.'
		},
		codeHtml: highlightedCode,
		rawCode: tailwindSnippet
	};
};
