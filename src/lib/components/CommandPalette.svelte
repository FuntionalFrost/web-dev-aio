<script lang="ts">
	import { curriculum } from '$lib/data/curriculum';
	import { goto } from '$app/navigation';

	let dialogRef = $state<HTMLDialogElement | null>(null);
	let searchQuery = $state('');

	let filtered = $derived(
		curriculum.filter(
			(m) =>
				m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				m.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
		)
	);

	function handleKeydown(e: KeyboardEvent) {
		if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
			e.preventDefault();
			dialogRef?.open ? dialogRef.close() : dialogRef?.showModal();
		}
	}

	function selectModule(href: string) {
		dialogRef?.close();
		searchQuery = '';
		goto(href);
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Navbar Trigger Button -->
<button
	onclick={() => dialogRef?.showModal()}
	class="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-100/80 px-3 py-1.5 text-xs text-slate-500 transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:border-slate-700"
>
	<span>Search labs & APIs...</span>
	<kbd
		class="rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[10px] font-semibold text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
		>⌘K</kbd
	>
</button>

<!-- Native Modal Dialog -->
<dialog
	bind:this={dialogRef}
	class="m-auto w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/60 backdrop:backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
>
	<div class="border-b border-slate-200 p-4 dark:border-slate-800">
		<input
			type="text"
			bind:value={searchQuery}
			placeholder="Filter by keyword (e.g. 'using', 'Map', 'mask')..."
			class="w-full bg-transparent text-sm placeholder-slate-400 focus:outline-none"
		/>
	</div>

	<div class="max-h-72 space-y-1 overflow-y-auto p-2">
		{#each filtered as item (item.id)}
			<button
				onclick={() => selectModule(item.href)}
				class="flex w-full items-center justify-between rounded-lg p-2.5 text-left text-xs transition hover:bg-indigo-50 hover:text-indigo-900 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-200"
			>
				<span class="font-medium">{item.title}</span>
				<span class="font-mono text-[10px] text-slate-400">{item.category}</span>
			</button>
		{:else}
			<div class="p-4 text-center font-mono text-xs text-slate-400">No matching labs found.</div>
		{/each}
	</div>
</dialog>
