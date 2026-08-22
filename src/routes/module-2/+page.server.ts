import { highlightCode } from '$lib/server/shiki';
import type { PageServerLoad } from './$types';

export const prerender = true;

const module2Snippet = `
// ES2026: Native Uint8Array Base64 & Streaming Async Collection
const encoder = new TextEncoder();
const bytes = encoder.encode("Modern Web Architecture 2026");

// Native binary serialization (no external btoa/Buffer polyfills)
const base64String = bytes.toBase64();

// Streaming async iterator into an aggregated array
async function* generateChunks() {
  yield Promise.resolve(bytes.subarray(0, 6));
  yield Promise.resolve(bytes.subarray(6, 12));
}

const chunks = await Array.fromAsync(generateChunks());
`;

export const load: PageServerLoad = async () => {
	const highlightedCode = await highlightCode(module2Snippet, 'typescript');

	return {
		meta: {
			title: 'Native Binary Buffers & Container Layouts',
			description:
				'Stream byte transformations using ES2026 Uint8Array APIs inside adaptive Tailwind v4 container query cards.'
		},
		codeHtml: highlightedCode
	};
};
