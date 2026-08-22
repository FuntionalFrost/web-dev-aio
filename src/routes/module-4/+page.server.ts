import { highlightCode } from '$lib/server/shiki';
import type { PageServerLoad } from './$types';

export const prerender = true;

const module4Snippet = `
// 1. Explicit Resource Management (TS6 / ES2026)
class StreamSession implements Disposable {
  public id = crypto.randomUUID().slice(0, 8);
  public active = true;

  [Symbol.dispose]() {
    this.active = false; // Auto-teardown when exiting block scope
  }
}

// 2. Promise.withResolvers() for decoupled async flows
const { promise, resolve, reject } = Promise.withResolvers<string>();

function triggerExternalEvent(data: string) {
  resolve(data); // Externally fulfill without wrapping in new Promise()
}
`;

export const load: PageServerLoad = async () => {
	const highlightedCode = await highlightCode(module4Snippet, 'typescript');

	return {
		meta: {
			title: 'Explicit Resource Management & Promise Resolvers',
			description:
				'Coordinate scope-bound disposables with TS6 "using" and decouple async pipelines with Promise.withResolvers.'
		},
		codeHtml: highlightedCode,
		rawCode: module4Snippet
	};
};
