<script lang="ts">
	import { goto } from '$app/navigation';
	import { curriculum } from '$lib/data/curriculum';

	let open = $state(false);
	let search = $state('');

	let filtered = $derived(
		search.trim() === ''
			? curriculum
			: curriculum.filter(
					(m) =>
						m.title.toLowerCase().includes(search.toLowerCase()) ||
						m.tech.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
						m.category.toLowerCase().includes(search.toLowerCase())
				)
	);

	function handleKeydown(e: KeyboardEvent) {
		if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
			e.preventDefault();
			open = !open;
		}
		if (e.key === 'Escape' && open) {
			open = false;
		}
	}

	function navigateTo(href: string) {
		open = false;
		search = '';
		goto(href);
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<button
	onclick={() => (open = true)}
	class="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs text-slate-500 hover:border-slate-300 hover:text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:text-slate-200"
>
	<span>Search labs...</span>
	<kbd
		class="rounded border border-slate-300 bg-white px-1 py-0.5 text-[10px] dark:border-slate-700 dark:bg-slate-800"
		>⌘K</kbd
	>
</button>

{#if open}
	<div
		role="button"
		tabindex="0"
		aria-label="Close command palette"
		onclick={() => (open = false)}
		onkeydown={(e) => e.key === 'Escape' && (open = false)}
		class="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/60 p-4 pt-20 backdrop-blur-sm"
	>
		<div
			role="dialog"
			aria-modal="true"
			tabindex="-1"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
			class="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900"
		>
			<div class="border-b border-slate-200 p-3 dark:border-slate-800">
				<input
					type="text"
					placeholder="Search modules, technologies..."
					bind:value={search}
					class="w-full bg-transparent font-mono text-xs text-slate-900 placeholder-slate-400 focus:outline-none dark:text-slate-100"
				/>
			</div>
			<div class="max-h-72 overflow-y-auto p-2">
				{#each filtered as mod (mod.id)}
					<button
						onclick={() => navigateTo(mod.href)}
						class="flex w-full items-center justify-between rounded-lg p-2 text-left font-mono text-xs transition hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
					>
						<span class="font-semibold text-slate-800 dark:text-slate-200">{mod.title}</span>
						<span class="text-[10px] text-slate-400">{mod.category}</span>
					</button>
				{:else}
					<div class="p-4 text-center font-mono text-xs text-slate-400">
						No matching modules found.
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}
