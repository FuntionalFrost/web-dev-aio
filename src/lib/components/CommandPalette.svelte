<script lang="ts">
	import {
		CommandPalette as YaxaCommandPalette,
		Kbd,
		useShortcuts,
		type CommandItem
	} from 'yaxa-svelte';
	import { curriculum } from '#lib/data/curriculum.js';
	import { goto } from '$app/navigation';

	let isOpen = $state(false);

	const items: CommandItem[] = [
		...curriculum.map((m) => ({
			id: m.id,
			label: m.title,
			description: `${m.category} • ${m.tech.join(', ')}`,
			group: m.track,
			icon: 'terminal',
			href: m.href,
			onSelect: () => {
				isOpen = false;
				goto(m.href);
			}
		})),
		{
			id: 'tool-roadmap',
			label: 'Skill Roadmap',
			description:
				'Interactive prerequisite skill tree tracking mastery across web engineering labs',
			group: 'Learning Tools',
			icon: 'sparkles',
			href: '/roadmap',
			onSelect: () => {
				isOpen = false;
				goto('/roadmap');
			}
		},
		{
			id: 'tool-theme-studio',
			label: 'Theme Studio',
			description: 'Customize design tokens, palettes, radius scale & export Tailwind CSS v4',
			group: 'Design System',
			icon: 'sparkles',
			shortcut: 'T',
			href: '/theme',
			onSelect: () => {
				isOpen = false;
				goto('/theme');
			}
		},
		{
			id: 'external-github',
			label: 'GitHub Repository',
			description: 'View source code, report issues, and star on GitHub',
			group: 'Community & Source',
			icon: 'github',
			shortcut: 'G',
			href: 'https://github.com/FuntionalFrost/web-dev-aio',
			onSelect: () => {
				isOpen = false;
				if (typeof window !== 'undefined') {
					window.open('https://github.com/FuntionalFrost/web-dev-aio', '_blank');
				}
			}
		}
	];

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
	class="flex h-10 w-44 items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-100/80 px-3.5 font-mono text-sm text-slate-600 transition hover:border-slate-300 hover:bg-slate-200/60 sm:w-80 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800/80"
	aria-label="Open search command palette"
>
	<span class="flex min-w-0 items-center gap-2.5">
		<span class="shrink-0">🔍</span>
		<span class="hidden truncate whitespace-nowrap sm:inline">Search labs & theme...</span>
		<span class="whitespace-nowrap sm:hidden">Search...</span>
	</span>
	<span class="shrink-0">
		<Kbd combo={['meta', 'k']} size="sm" />
	</span>
</button>

<YaxaCommandPalette
	bind:open={isOpen}
	{items}
	placeholder="Search curriculum labs, runtimes, APIs, or theme..."
/>
