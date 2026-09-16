<script lang="ts">
	import {
		CommandPalette as YaxaCommandPalette,
		Kbd,
		useShortcuts,
		type CommandItem
	} from 'yaxa-svelte';
	import { curriculum } from '$lib/data/curriculum';
	import { goto } from '$app/navigation';

	let isOpen = $state(false);

	const items: CommandItem[] = curriculum.map((m) => ({
		id: m.id,
		label: m.title,
		description: `${m.category} • ${m.tech.join(', ')}`,
		group: m.track,
		href: m.href,
		onSelect: () => {
			isOpen = false;
			goto(m.href);
		}
	}));

	useShortcuts({
		'meta_k, ctrl_k': (e) => {
			e.preventDefault();
			isOpen = !isOpen;
		}
	});
</script>

<!-- Prominent Navbar Search Trigger -->
<button
	onclick={() => (isOpen = true)}
	class="flex h-10 w-48 items-center justify-between rounded-xl border border-slate-200 bg-slate-100/80 px-3.5 font-mono text-sm text-slate-600 transition hover:border-slate-300 hover:bg-slate-200/60 sm:w-72 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800/80"
	aria-label="Open search command palette"
>
	<span class="flex items-center gap-2.5">
		<span>🔍</span>
		<span class="hidden sm:inline">Search labs...</span>
		<span class="sm:hidden">Search...</span>
	</span>
	<Kbd size="sm">⌘K</Kbd>
</button>

<YaxaCommandPalette
	bind:open={isOpen}
	{items}
	placeholder="Search curriculum labs, runtimes, or APIs..."
/>
