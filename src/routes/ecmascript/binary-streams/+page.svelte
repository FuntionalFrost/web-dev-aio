<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let rawInput = $state('Modern Web Architecture 2026');
	let containerWidthClass = $state('w-full');

	let base64Output = $derived.by(() => {
		const bytes = new TextEncoder().encode(rawInput);
		if (typeof (bytes as any).toBase64 === 'function') {
			return (bytes as any).toBase64();
		}
		let binary = '';
		for (let i = 0; i < bytes.byteLength; i++) {
			binary += String.fromCharCode(bytes[i]);
		}
		return btoa(binary);
	});

	let hexOutput = $derived.by(() => {
		const bytes = new TextEncoder().encode(rawInput);
		if (typeof (bytes as any).toHex === 'function') {
			return (bytes as any).toHex();
		}
		return Array.from(bytes)
			.map((b) => b.toString(16).padStart(2, '0'))
			.join(' ');
	});

	let byteLength = $derived(new TextEncoder().encode(rawInput).length);
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>Binary Streams, Buffers & Container Layouts</h3>
		<p class="text-base sm:text-lg">
			Native binary buffer transformations eliminate client-side polyfills for cryptography, file processing, and network serialization.
		</p>
		<ul>
			<li>
				<strong><code>Uint8Array.prototype.toBase64()</code>:</strong> Browser-native, specification-grade Base64 conversion without string corruption or memory overhead.
			</li>
			<li>
				<strong><code>Uint8Array.prototype.toHex()</code>:</strong> Fast hexadecimal serialization for hashes, tokens, and cryptographic signatures.
			</li>
			<li>
				<strong><code>Array.fromAsync()</code>:</strong> Consumes asynchronous iterables, ReadableStreams, and Promise batches directly into an array in a single operation.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<LabCard title="Container Query & Binary Conversion Lab" badge="@container">
			<div class="space-y-4 font-mono text-sm">
				<div class="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800">
					<span class="text-sm font-bold text-slate-600 dark:text-slate-400">Container Width:</span>
					<div class="flex gap-2">
						<button
							onclick={() => (containerWidthClass = 'max-w-xs')}
							class="rounded-xl border px-3 py-1.5 transition {containerWidthClass === 'max-w-xs'
								? 'border-indigo-600 bg-indigo-50 font-bold text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300'
								: 'border-slate-300 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'}"
						>
							Narrow (@sm)
						</button>
						<button
							onclick={() => (containerWidthClass = 'w-full')}
							class="rounded-xl border px-3 py-1.5 transition {containerWidthClass === 'w-full'
								? 'border-indigo-600 bg-indigo-50 font-bold text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300'
								: 'border-slate-300 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'}"
						>
							Full Width (@lg)
						</button>
					</div>
				</div>

				<div class="space-y-2">
					<label for="raw-input" class="text-sm font-bold text-slate-700 dark:text-slate-300">Input String Payload:</label>
					<input
						id="raw-input"
						type="text"
						bind:value={rawInput}
						class="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 text-base text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
					/>
				</div>

				<div class="mx-auto transition-all duration-300 {containerWidthClass}">
					<div class="@container rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
						<div class="grid grid-cols-1 gap-3 @sm:grid-cols-2">
							<div class="rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
								<span class="text-sm font-bold text-slate-500 uppercase">Allocated Bytes</span>
								<p class="mt-1 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
									{byteLength} B
								</p>
							</div>
							<div class="rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
								<span class="text-sm font-bold text-slate-500 uppercase">Base64 Length</span>
								<p class="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
									{base64Output.length} Chars
								</p>
							</div>
						</div>

						<div class="mt-3 space-y-3">
							<div class="rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900/60">
								<span class="text-sm font-bold text-slate-500 uppercase">Uint8Array.toBase64():</span>
								<p class="mt-1 break-all text-base font-bold text-amber-700 dark:text-amber-300">{base64Output}</p>
							</div>
							<div class="rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900/60">
								<span class="text-sm font-bold text-slate-500 uppercase">Uint8Array.toHex():</span>
								<p class="mt-1 break-all text-base font-bold text-emerald-600 dark:text-emerald-400">{hexOutput}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
