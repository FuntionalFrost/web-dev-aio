<script lang="ts">
	import {
		theme,
		Popover,
		ACCENT_PALETTES,
		NEUTRAL_PALETTES,
		RADIUS_PRESETS,
		type AccentName,
		type NeutralName,
		type RadiusPreset
	} from 'yaxa-svelte';

	let open = $state(false);
</script>

<Popover bind:open>
	{#snippet trigger()}
		<button
			type="button"
			aria-label="Theme & Customization settings"
			class="relative flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-2.5 text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:bg-slate-800"
		>
			{#if theme.resolvedTheme === 'dark'}
				<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m2.828 5.657a4 4 0 118 0 4 4 0 01-8 0z"
					/>
				</svg>
			{:else}
				<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
					/>
				</svg>
			{/if}
			<span
				class="h-2.5 w-2.5 rounded-full ring-2 ring-white transition-transform dark:ring-slate-900"
				style="background-color: {ACCENT_PALETTES[theme.accent]?.color ?? '#ff3e00'}"
			></span>
		</button>
	{/snippet}

	<div class="w-72 space-y-4 text-xs">
		<!-- Header & Mode Switch -->
		<div
			class="flex items-center justify-between border-b border-slate-200/80 pb-2.5 dark:border-slate-800/80"
		>
			<span class="font-bold tracking-wider text-slate-900 uppercase dark:text-white"
				>Theme & Palette</span
			>
			<div class="flex items-center gap-1">
				{#each ['light', 'dark', 'system'] as const as mode (mode)}
					<button
						type="button"
						onclick={() => {
							theme.setMode(mode);
							if (typeof document !== 'undefined') {
								document.documentElement.dataset.theme = theme.resolvedTheme;
							}
						}}
						class="flex h-6 w-6 items-center justify-center rounded-lg border text-[11px] transition {theme.mode ===
						mode
							? 'border-primary-500 bg-primary-500 font-bold text-white shadow-xs'
							: 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300'}"
						aria-label="{mode} mode"
						title="{mode} mode"
					>
						{#if mode === 'light'}
							☀
						{:else if mode === 'dark'}
							🌙
						{:else}
							💻
						{/if}
					</button>
				{/each}
			</div>
		</div>

		<!-- Accent Palette Grid -->
		<div class="space-y-1.5">
			<div class="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
				<span class="font-semibold tracking-wider uppercase">Accent Color</span>
				<span class="text-primary-600 dark:text-primary-400 font-bold capitalize"
					>{theme.accent}</span
				>
			</div>
			<div class="grid grid-cols-7 gap-1.5">
				{#each Object.entries(ACCENT_PALETTES) as [key, pal] (key)}
					<button
						type="button"
						onclick={() => theme.setAccent(key as AccentName)}
						class="group relative flex h-7 w-7 items-center justify-center rounded-lg border transition {theme.accent ===
						key
							? 'border-primary-500 ring-primary-500/30 ring-2'
							: 'border-transparent hover:border-slate-300 dark:hover:border-slate-700'}"
						title={pal.name}
					>
						<span
							class="h-4 w-4 rounded-full shadow-xs transition-transform group-hover:scale-110"
							style="background-color: {pal.color}"
						></span>
					</button>
				{/each}
			</div>
		</div>

		<!-- Neutral Scale -->
		<div class="space-y-1.5">
			<div class="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
				<span class="font-semibold tracking-wider uppercase">Neutral Tone</span>
				<span class="font-medium capitalize">{theme.neutral}</span>
			</div>
			<div class="grid grid-cols-4 gap-1">
				{#each Object.keys(NEUTRAL_PALETTES) as key (key)}
					<button
						type="button"
						onclick={() => theme.setNeutral(key as NeutralName)}
						class="rounded-lg border px-1.5 py-1 text-center text-[10px] font-medium capitalize transition {theme.neutral ===
						key
							? 'border-primary-500 bg-primary-50 text-primary-950 dark:bg-primary-950/50 dark:text-primary-200 font-bold'
							: 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300'}"
					>
						{key}
					</button>
				{/each}
			</div>
		</div>

		<!-- Radius Preset -->
		<div class="space-y-1.5">
			<div class="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
				<span class="font-semibold tracking-wider uppercase">Corner Radius</span>
				<span class="font-medium capitalize">{theme.radius}</span>
			</div>
			<div class="grid grid-cols-5 gap-1">
				{#each Object.entries(RADIUS_PRESETS) as [key, r] (key)}
					<button
						type="button"
						onclick={() => theme.setRadius(key as RadiusPreset)}
						class="border px-1 py-1 text-center text-[10px] font-medium transition {theme.radius ===
						key
							? 'border-primary-500 bg-primary-500 font-bold text-white shadow-xs'
							: 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300'}"
						style="border-radius: {r.value} !important;"
					>
						{r.name}
					</button>
				{/each}
			</div>
		</div>

		<!-- Footer Link to Studio -->
		<div
			class="flex items-center justify-between border-t border-slate-200/80 pt-2 text-[11px] text-slate-500 dark:border-slate-800/80"
		>
			<span class="font-mono"
				>Press <kbd
					class="rounded border border-slate-300 px-1 py-0.5 font-mono text-[10px] dark:border-slate-700"
					>T</kbd
				> to toggle</span
			>
			<a
				href="/theme"
				onclick={() => (open = false)}
				class="text-primary-600 dark:text-primary-400 font-bold hover:underline"
			>
				Theme Studio →
			</a>
		</div>
	</div>
</Popover>
