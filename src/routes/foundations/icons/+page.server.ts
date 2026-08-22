import { highlightCode } from '$lib/server/shiki';
import type { PageServerLoad } from './$types';

export const prerender = true;

const iconComparisonSnippet = `
<!-- Approach A: Inline SVG (Rich, multi-colored, high DOM count) -->
<svg class="h-6 w-6 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
</svg>

<!-- Approach B: CSS Mask Icon (1 DOM node, styled via Tailwind bg-* utilities) -->
<span class="inline-block h-6 w-6 bg-indigo-400 [mask:url(/icons/zap.svg)_no-repeat_center/contain]" />
`;

export const load: PageServerLoad = async () => {
	const highlightedCode = await highlightCode(iconComparisonSnippet, 'html');

	return {
		meta: {
			title: 'Iconography Engineering: Inline SVG vs CSS Masks',
			description:
				'Analyze performance trade-offs, DOM node count, and theming mechanics between inline SVGs and CSS mask-image rendering.'
		},
		codeHtml: highlightedCode,
		rawCode: iconComparisonSnippet
	};
};
