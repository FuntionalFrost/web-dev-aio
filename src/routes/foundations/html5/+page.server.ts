import { highlightCode } from '$lib/server/shiki';
import type { PageServerLoad } from './$types';

export const prerender = true;

const html5Snippet = `<details name="arch-group" open>
  <summary class="font-bold cursor-pointer">
    01. Semantic Layout
  </summary>
  <p class="mt-2 text-xs">Main document structure...</p>
</details>

<details name="arch-group">
  <summary class="font-bold cursor-pointer">
    02. Accessible Primitives
  </summary>
  <p class="mt-2 text-xs">Auto-closes sibling...</p>
</details>

<search role="search">
  <form action="/query">
    <input type="search" placeholder="Search API..." />
  </form>
</search>

<input 
  type="email" 
  required 
  class="border valid:border-emerald-500 invalid:border-rose-500" 
/>`;

export const load: PageServerLoad = async () => {
	const highlightedCode = await highlightCode(html5Snippet, 'html');

	return {
		meta: {
			title: 'Modern HTML5 & Native Document Primitives',
			description:
				'Master exclusive details accordions, the native search landmark, and interaction-driven CSS constraint validation with zero JavaScript runtime.'
		},
		codeHtml: highlightedCode,
		rawCode: html5Snippet
	};
};
