<script lang="ts">
	import { curriculum } from '$lib/data/curriculum';
	import { goto } from '$app/navigation';

	let isOpen = $state(false);
	let searchQuery = $state('');

	let filtered = $derived(
		curriculum.filter((m) => {
			const q = searchQuery.toLowerCase().trim();
			return (
				!q ||
				m.title.toLowerCase().includes(q) ||
				m.description.toLowerCase().includes(q) ||
				m.category.toLowerCase().includes(q) ||
				m.tech.some((t) => t.toLowerCase().includes(q))
			);
		})
	);

	function handleKeydown(e: KeyboardEvent) {
		if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
			e.preventDefault();
			isOpen = !isOpen;
		}
		if (e.key === 'Escape' && isOpen) {
			isOpen = false;
		}
	}

	function selectModule(href: string) {
		isOpen = false;
		searchQuery = '';
		goto(href);
	}

	function focusOnMount(node: HTMLElement) {
		node.focus();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Prominent Navbar Search Trigger -->
<button
	onclick={() => (isOpen = true)}
	class="flex h-9 w-44 items-center justify-between rounded-xl border border-slate-200 bg-slate-100/80 px-3 font-mono text-xs text-slate-500 transition hover:border-slate-300 hover:bg-slate-200/60 sm:w-64 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:bg-slate-800/80"
	aria-label="Open search command palette"
>
	<span class="flex items-center gap-2">
		<span>🔍</span>
		<span class="hidden sm:inline">Search labs...</span>
		<span class="sm:hidden">Search...</span>
	</span>
	<kbd
		class="rounded border border-slate-300 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 shadow-xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
	>
		⌘K
	</kbd>
</button>

<!-- Modal Palette Overlay -->
{#if isOpen}
	<div
		role="button"
		tabindex="0"
		aria-label="Close command palette overlay"
		onclick={() => (isOpen = false)}
		onkeydown={(e) => e.key === 'Escape' && (isOpen = false)}
		class="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/60 p-4 pt-16 backdrop-blur-sm sm:pt-24"
	>
		<div
			role="dialog"
			tabindex="-1"
			aria-modal="true"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
			class="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900"
		>
			<div class="flex items-center border-b border-slate-200 px-4 dark:border-slate-800">
				<span class="text-slate-400">🔍</span>
				<input
					use:focusOnMount
					type="text"
					bind:value={searchQuery}
					placeholder="Search modules, tech tags, or topics..."
					class="h-12 w-full bg-transparent px-3 font-mono text-xs text-slate-900 focus:outline-none dark:text-slate-100"
				/>
				<button
					onclick={() => (isOpen = false)}
					class="rounded px-1.5 py-0.5 font-mono text-[11px] text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
				>
					ESC
				</button>
			</div>

			<div class="max-h-80 overflow-y-auto p-2">
				{#each filtered as mod (mod.id)}
					<button
						onclick={() => selectModule(mod.href)}
						class="flex w-full items-start justify-between rounded-xl p-3 text-left transition hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
					>
						<div class="space-y-0.5">
							<span class="block font-mono text-xs font-bold text-slate-900 dark:text-slate-100">
								{mod.title}
							</span>
							<span class="line-clamp-1 block text-[11px] text-slate-500 dark:text-slate-400">
								{mod.description}
							</span>
						</div>
						<span
							class="shrink-0 rounded bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-600 dark:bg-slate-800 dark:text-slate-400"
						>
							{mod.category}
						</span>
					</button>
				{:else}
					<div class="p-8 text-center font-mono text-xs text-slate-400">
						No matching engineering labs found.
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}
