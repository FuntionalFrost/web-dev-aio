<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let rawInput = $state('Modern Web Architecture 2026');
	let containerWidthClass = $state('w-full');

	let base64Output = $derived.by(() => {
		const bytes = new TextEncoder().encode(rawInput);
		if (typeof bytes.toBase64 === 'function') {
			return bytes.toBase64();
		}
		return btoa(String.fromCharCode(...bytes));
	});

	let hexOutput = $derived.by(() => {
		const bytes = new TextEncoder().encode(rawInput);
		if (typeof bytes.toHex === 'function') {
			return bytes.toHex();
		}
		return Array.from(bytes)
			.map((b) => b.toString(16).padStart(2, '0'))
			.join(' ');
	});

	let byteLength = $derived(new TextEncoder().encode(rawInput).length);
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>Architectural Features</h3>
		<ul>
			<li>
				<strong><code>Uint8Array.prototype.toBase64()</code>:</strong> Native browser-level Base64 conversion
				avoiding polyfills and UTF-16 binary corruption.
			</li>
			<li>
				<strong><code>Array.fromAsync()</code>:</strong> Aggregates async iterators and Promise streams
				into an array in a single call.
			</li>
			<li>
				<strong>Container Queries:</strong> Modular layout changes driven by parent container widths rather
				than the viewport.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<LabCard title="Container Query & Binary Conversion Lab" badge="@container">
			<div
				class="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800"
			>
				<span class="font-mono text-xs text-slate-500">Container Width:</span>
				<div class="flex gap-1.5 font-mono text-xs">
					<button
						onclick={() => (containerWidthClass = 'max-w-xs')}
						class="rounded-lg border px-2.5 py-1 transition {containerWidthClass === 'max-w-xs'
							? 'border-indigo-600 bg-indigo-50 font-semibold text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300'
							: 'border-slate-300 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'}"
					>
						Narrow (@sm)
					</button>
					<button
						onclick={() => (containerWidthClass = 'w-full')}
						class="rounded-lg border px-2.5 py-1 transition {containerWidthClass === 'w-full'
							? 'border-indigo-600 bg-indigo-50 font-semibold text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300'
							: 'border-slate-300 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'}"
					>
						Full Width (@lg)
					</button>
				</div>
			</div>

			<div class="space-y-2 font-mono text-xs">
				<label for="raw-input" class="text-slate-600 dark:text-slate-400">Input Payload:</label>
				<input
					id="raw-input"
					type="text"
					bind:value={rawInput}
					class="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
				/>
			</div>

			<div class="mx-auto transition-all duration-300 {containerWidthClass}">
				<div
					class="@container rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
				>
					<div class="grid grid-cols-1 gap-3 font-mono text-xs @sm:grid-cols-2">
						<div
							class="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
						>
							<span class="text-[10px] text-slate-500 uppercase">Allocated Bytes</span>
							<p class="mt-1 text-xl font-bold text-indigo-600 dark:text-indigo-400">
								{byteLength} B
							</p>
						</div>
						<div
							class="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
						>
							<span class="text-[10px] text-slate-500 uppercase">Base64 Length</span>
							<p class="mt-1 text-xl font-bold text-emerald-600 dark:text-emerald-400">
								{base64Output.length} Chars
							</p>
						</div>
					</div>

					<div class="mt-3 space-y-2 font-mono text-xs">
						<div
							class="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900/60"
						>
							<span class="text-[10px] text-slate-500 uppercase">toBase64():</span>
							<p class="mt-1 break-all text-amber-700 dark:text-amber-300">{base64Output}</p>
						</div>
						<div
							class="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900/60"
						>
							<span class="text-[10px] text-slate-500 uppercase">toHex():</span>
							<p class="mt-1 break-all text-emerald-600 dark:text-emerald-400">{hexOutput}</p>
						</div>
					</div>
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
