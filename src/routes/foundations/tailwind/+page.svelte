<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let accentHue = $state(160);
	let customRadius = $state(16);
	let enableGlow = $state(true);
	let opacityLevel = $state(20);

	let oklchColorString = $derived(`oklch(0.72 0.22 ${accentHue})`);
</script>

<LabShell
	moduleId="foundation-tailwind"
	title={data.meta.title}
	description={data.meta.description}
>
	{#snippet guide()}
		<div class="not-prose">
			<CodeBlock codeHtml={data.codeHtml} rawCode={data.rawCode} filename="theme-engine.css" />
		</div>

		<h3>Key Architecture Upgrades in v4</h3>
		<ul>
			<li>
				<strong>Zero JS Config:</strong> Configured via CSS <code>@theme</code> directives parsed at build
				time.
			</li>
			<li>
				<strong>OKLCH Native Colors:</strong> Eliminates muddy gradient interpolations across light/dark
				palettes.
			</li>
			<li>
				<strong>Inline CSS Variables:</strong> Reference tokens directly (e.g.,
				<code>rounded-(--custom-radius)</code>).
			</li>
		</ul>
	{/snippet}

	{#snippet sandbox()}
		<div
			class="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50"
		>
			<div
				class="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800"
			>
				<span
					class="text-xs font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400"
				>
					Runtime Token Controller
				</span>
				<span class="font-mono text-[10px] text-slate-500 dark:text-slate-400"
					>@theme + CSS Variables</span
				>
			</div>

			<div
				class="grid grid-cols-1 gap-4 font-mono text-xs text-slate-700 sm:grid-cols-2 dark:text-slate-400"
			>
				<div>
					<label for="hue" class="flex justify-between">
						<span>OKLCH Hue Angle</span>
						<span class="font-bold text-slate-900 dark:text-slate-200">{accentHue}°</span>
					</label>
					<input
						id="hue"
						type="range"
						min="0"
						max="360"
						bind:value={accentHue}
						class="mt-1.5 w-full accent-indigo-600"
					/>
				</div>

				<div>
					<label for="radius" class="flex justify-between">
						<span>Border Radius Token</span>
						<span class="font-bold text-slate-900 dark:text-slate-200">{customRadius}px</span>
					</label>
					<input
						id="radius"
						type="range"
						min="0"
						max="40"
						bind:value={customRadius}
						class="mt-1.5 w-full accent-indigo-600"
					/>
				</div>

				<div>
					<label for="opacity" class="flex justify-between">
						<span>Background Alpha</span>
						<span class="font-bold text-slate-900 dark:text-slate-200">{opacityLevel}%</span>
					</label>
					<input
						id="opacity"
						type="range"
						min="5"
						max="60"
						bind:value={opacityLevel}
						class="mt-1.5 w-full accent-indigo-600"
					/>
				</div>

				<div class="flex items-center gap-2 pt-4">
					<input
						id="glow"
						type="checkbox"
						bind:checked={enableGlow}
						class="rounded border-slate-300 text-indigo-600 dark:border-slate-700"
					/>
					<label for="glow" class="cursor-pointer text-slate-700 dark:text-slate-300"
						>Custom Glow Utility</label
					>
				</div>
			</div>

			<!-- Live Dynamic Canvas -->
			<div
				class="flex min-h-64 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-8 transition-all dark:border-slate-800 dark:bg-slate-950/80"
				style:--accent-color={oklchColorString}
				style:--custom-radius="{customRadius}px"
			>
				<div
					class="w-full max-w-sm border p-6 transition-all duration-150"
					style:border-radius="var(--custom-radius)"
					style:border-color="var(--accent-color)"
					style:background-color="color-mix(in oklch, var(--accent-color) {opacityLevel}%,
					transparent)"
					style:box-shadow={enableGlow ? '0 0 35px -8px var(--accent-color)' : 'none'}
				>
					<div class="flex items-center justify-between">
						<span
							class="font-mono text-[10px] tracking-widest text-slate-700 uppercase dark:text-slate-300"
							>Design Token</span
						>
						<span class="h-2.5 w-2.5 rounded-full" style:background-color="var(--accent-color)"
						></span>
					</div>

					<h4 class="mt-3 font-mono text-lg font-bold text-slate-900 dark:text-white">
						Tailwind v4 @theme
					</h4>
					<p class="mt-1 font-mono text-xs text-slate-600 dark:text-slate-300">
						Color: <span class="font-bold text-slate-900 dark:text-white">{oklchColorString}</span>
					</p>

					<div
						class="mt-4 flex items-center justify-between border-t border-slate-300/40 pt-3 font-mono text-[11px] text-slate-700 dark:border-white/10 dark:text-slate-300"
					>
						<span>Radius: {customRadius}px</span>
						<button
							class="rounded border border-slate-300 bg-white px-2.5 py-1 text-slate-900 dark:border-white/20 dark:bg-slate-950/60 dark:text-white"
						>
							Action Button
						</button>
					</div>
				</div>
			</div>
		</div>
	{/snippet}
</LabShell>
