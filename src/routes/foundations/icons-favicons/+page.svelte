<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let isDarkMode = $state(false);
	let iconColor = $state('#4f46e5');
	let iconSize = $state(32);
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>Modern Icon & Favicon Systems</h3>
		<p class="text-base sm:text-lg">
			Modern web standards eliminate large icon sprite libraries by leveraging responsive SVG favicons and CSS mask icons.
		</p>
		<ul>
			<li>
				<strong>Theme-Aware SVG Favicons:</strong> SVG favicons support embedded <code>&lt;style&gt;</code> tags and <code>@media (prefers-color-scheme: dark)</code>, dynamically switching colors without JavaScript.
			</li>
			<li>
				<strong>CSS Mask Icons:</strong> By rendering a single <code>&lt;span&gt;</code> with <code>mask: url(...)</code>, icons inherit CSS <code>background-color</code> and <code>currentColor</code> while keeping the DOM tree flat.
			</li>
			<li>
				<strong>PWA Manifest & Apple Touch Icons:</strong> Configure <code>manifest.webmanifest</code> and <code>apple-touch-icon.png</code> for seamless cross-device home screen installation.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<LabCard title="Theme-Reactive SVG Favicon Simulator" badge="Dynamic SVG Media">
			<div class="space-y-4">
				<div class="flex items-center justify-between">
					<span class="text-sm font-bold text-slate-700 dark:text-slate-300">Simulate Operating System Theme:</span>
					<button
						onclick={() => (isDarkMode = !isDarkMode)}
						class="rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 font-mono text-sm font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800"
					>
						Toggle: {isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
					</button>
				</div>

				<div class="flex items-center justify-center rounded-2xl border border-slate-200 p-8 transition-colors {isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-900'}">
					<div class="flex items-center gap-4 rounded-xl border border-slate-300/40 bg-white/10 px-5 py-3 backdrop-blur-md">
						<!-- Simulated SVG Favicon -->
						<svg class="h-10 w-10 transition-colors duration-300" viewBox="0 0 32 32">
							<path
								fill={isDarkMode ? '#818cf8' : '#4f46e5'}
								d="M16 2L3 9l13 7 13-7-13-7zM3 23l13 7 13-7V13L16 20 3 13v10z"
							/>
						</svg>
						<div>
							<p class="font-mono text-sm font-bold">Browser Tab Simulation</p>
							<p class="text-xs opacity-75">Favicon fill: {isDarkMode ? '#818cf8 (Indigo 400)' : '#4f46e5 (Indigo 600)'}</p>
						</div>
					</div>
				</div>
			</div>
		</LabCard>

		<LabCard title="CSS Mask Icon vs Inline SVG" badge="1 DOM Node">
			<div class="space-y-4 font-mono text-sm">
				<div class="grid grid-cols-2 gap-4">
					<div>
						<label for="icon-color-picker" class="block mb-1 font-bold text-slate-600 dark:text-slate-400">Color (Inherits via bg):</label>
						<input
							id="icon-color-picker"
							type="color"
							bind:value={iconColor}
							class="h-10 w-full rounded-xl border border-slate-300 cursor-pointer"
						/>
					</div>
					<div>
						<label for="icon-size-range" class="block mb-1 font-bold text-slate-600 dark:text-slate-400">Icon Size: {iconSize}px</label>
						<input
							id="icon-size-range"
							type="range"
							min="20"
							max="64"
							bind:value={iconSize}
							class="w-full accent-indigo-600"
						/>
					</div>
				</div>

				<div class="flex items-center justify-around rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
					<div class="text-center space-y-2">
						<div
							style="background-color: {iconColor}; width: {iconSize}px; height: {iconSize}px; -webkit-mask: url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22currentColor%22 stroke-width=%222%22><path d=%22M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z%22/></svg>') no-repeat center/contain;"
							class="mx-auto inline-block"
						></div>
						<p class="text-xs font-bold text-slate-500 uppercase">CSS Mask (1 DOM Node)</p>
					</div>
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
