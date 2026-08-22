import { highlightCode } from '$lib/server/shiki';
import type { PageServerLoad } from './$types';

export const prerender = true;

const module3Snippet = `
/* Modern CSS & HTML5: @starting-style and inert focus containment */

/* 1. Transition entry styles natively in pure CSS */
dialog[open] {
  opacity: 1;
  transform: scale(1) translateY(0);
  transition: opacity 0.3s ease-out, transform 0.3s ease-out, display 0.3s allow-discrete;

  @starting-style {
    opacity: 0;
    transform: scale(0.95) translateY(12px);
  }
}

/* 2. Inert attribute isolates background completely from focus & accessibility tree */
/* <main inert={isModalOpen}> ... </main> */
`;

export const load: PageServerLoad = async () => {
	const highlightedCode = await highlightCode(module3Snippet, 'css');

	return {
		meta: {
			title: 'Modern DOM Orchestration & Discrete Transitions',
			description:
				'Leverage the native HTML5 inert attribute and CSS @starting-style entry animations with zero transition JavaScript.'
		},
		codeHtml: highlightedCode,
		rawCode: module3Snippet
	};
};
