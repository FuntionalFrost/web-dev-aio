import { highlightCode } from '$lib/server/shiki';
import type { PageServerLoad } from './$types';

export const prerender = true;

const module5Snippet = `
/* 1. HTML5 Popover & CSS Anchor Positioning */
#action-anchor {
  anchor-name: --menu-trigger;
}

#context-popover {
  position: absolute;
  position-anchor: --menu-trigger;
  position-area: bottom span-right;
  margin-top: 0.5rem;
}

// 2. ES2026 / TS6 Native Iterator Helpers
const telemetryLog = [12, 45, 8, 92, 104, 3, 76];

// Lazy stream pipeline with zero intermediate arrays
const topSignals = Iterator.from(telemetryLog)
  .filter((v) => v > 10)
  .map((v) => \`Signal #\${v}\`)
  .take(3)
  .toArray();
`;

export const load: PageServerLoad = async () => {
	const highlightedCode = await highlightCode(module5Snippet, 'typescript');

	return {
		meta: {
			title: 'Anchor Positioning, Native Popovers & Iterator Pipelines',
			description:
				'Bind absolute menus to triggers natively in pure CSS and transform streams lazily with Iterator.prototype helpers.'
		},
		codeHtml: highlightedCode,
		rawCode: module5Snippet
	};
};
