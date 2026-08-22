import { highlightCode } from '$lib/server/shiki';
import type { PageServerLoad } from './$types';

export const prerender = true; // Prerenders to pure static HTML at build time

const es2026DemoSnippet = `
// ES2026: Precise sum & Map.prototype.getOrInsert
const transactions = [0.1, 0.2, 0.3];
const total = Math.sumPrecise(transactions);

const categoryLedger = new Map<string, number[]>();
categoryLedger
  .getOrInsert('finances', () => [])
  .push(total);
`;

export const load: PageServerLoad = async () => {
	const highlightedCode = await highlightCode(es2026DemoSnippet, 'typescript');

	return {
		meta: {
			title: 'Precision Arithmetic & Collection Insertion in ES2026',
			description: 'Explore Math.sumPrecise and Map getOrInsert with TypeScript 6.'
		},
		codeHtml: highlightedCode
	};
};
