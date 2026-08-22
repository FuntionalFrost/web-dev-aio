import { highlightCode } from '$lib/server/shiki';
import type { PageServerLoad } from './$types';

export const prerender = true;

const tsSnippet = `
// 1. Discriminated Union Pattern
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading'; progress: number }
  | { status: 'success'; data: T; timestamp: number }
  | { status: 'error'; code: number; message: string };

// 2. Exhaustive Matcher Pattern (assertNever)
function getStatusBadge(state: AsyncState<string>): string {
  switch (state.status) {
    case 'idle':
      return 'Standby';
    case 'loading':
      return \`Syncing (\${state.progress}%)\`;
    case 'success':
      return \`Delivered: \${state.data}\`;
    case 'error':
      return \`Failed [HTTP \${state.code}]: \${state.message}\`;
    default: {
      const _exhaustive: never = state;
      throw new Error(\`Unhandled state: \${_exhaustive}\`);
    }
  }
}

// 3. 'satisfies' for Literal Preservation without Type Widening
const routeConfig = {
  home: { path: '/', access: 'public' },
  admin: { path: '/admin', access: 'restricted' }
} satisfies Record<string, { path: string; access: 'public' | 'restricted' }>;

// routeConfig.home.path retains literal type "/" rather than widening to 'string'
`;

export const load: PageServerLoad = async () => {
	const highlightedCode = await highlightCode(tsSnippet, 'typescript');

	return {
		meta: {
			title: 'Sound Type Narrowing & Exhaustive Unions in TS6',
			description:
				'Master discriminated unions, the satisfies operator, and compile-time exhaustiveness guarantees for bulletproof application state.'
		},
		codeHtml: highlightedCode,
		rawCode: tsSnippet
	};
};
