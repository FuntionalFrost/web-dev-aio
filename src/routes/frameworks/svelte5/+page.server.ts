import { highlightCode } from '$lib/server/shiki';
import type { PageServerLoad } from './$types';

export const prerender = true;

const svelte5Snippet = `<!-- Svelte 5 Component Architecture -->
<script lang="ts">
  import type { Snippet } from 'svelte';

  // 1. $props & $bindable two-way bindings
  let { 
    count = $bindable(0), 
    header, 
    children 
  }: { 
    count?: number; 
    header?: Snippet<[string]>; 
    children?: Snippet; 
  } = $props();

  // 2. Fine-grained universal reactive runes
  let multiplier = $state(2);
  let total = $derived(count * multiplier);
  
  // 3. Side-effect runes
  $effect(() => {
    console.log(\`Synchronized total: \${total}\`);
  });
</script>

<!-- 4. Snippet Invocation (Replacing Legacy Slots) -->
<div class="card">
  {#if header}
    {@render header('Active State')}
  {/if}
  <button onclick={() => count++}>Count: {count} (x{multiplier} = {total})</button>
  {@render children?.()}
</div>`;

export const load: PageServerLoad = async () => {
	const highlightedCode = await highlightCode(svelte5Snippet, 'svelte');

	return {
		meta: {
			title: 'Svelte 5 Runes & SvelteKit 2 Reactive Engine',
			description:
				'Master fine-grained reactivity with $state and $derived, component parameter snippets replacing slots, and two-way $bindable properties.'
		},
		codeHtml: highlightedCode,
		rawCode: svelte5Snippet
	};
};
