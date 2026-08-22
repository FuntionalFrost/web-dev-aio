<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	interface PageDataPayload {
		meta: {
			title: string;
			description: string;
		};
		codeHtml: string;
		rawCode: string;
	}

	let { data }: { data: PageDataPayload } = $props();

	let rawInput = $state('Modern Web Architecture 2026');
	let containerWidthClass = $state('w-full');

	let base64Output = $derived.by(() => {
		const bytes = new TextEncoder().encode(rawInput);
		const typedBytes = bytes as Uint8Array & { toBase64?: () => string };
		if (typeof typedBytes.toBase64 === 'function') {
			return typedBytes.toBase64();
		}
		return btoa(String.fromCharCode(...bytes));
	});

	let byteLength = $derived(new TextEncoder().encode(rawInput).length);
</script>

<LabShell moduleId="module-2" title={data.meta.title} description={data.meta.description}>
	{#snippet guide()}
		<div class="not-prose">
			<CodeBlock
				codeHtml={data.codeHtml}
				rawCode={data.rawCode}
				filename="binary-and-containers.ts"
			/>
		</div>

		<h3>Architectural Features</h3>
		<ul>
			<li>
				<strong>Uint8Array.prototype.toBase64():</strong> Native binary serialization without polyfill
				overhead.
			</li>
			<li>
				<strong>Array.fromAsync():</strong> Streams promises and async iterables directly into an array.
			</li>
			<li>
				<strong>Container Queries:</strong> Modular layout changes driven by element container width.
			</li>
		</ul>
	{/snippet}

	{#snippet sandbox()}
		<div
			class="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50"
		>
			<div
				class="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800"
			>
				<span
					class="text-xs font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400"
				>
					Container Query Tester
				</span>
				<div class="flex gap-2">
					<button
						onclick={() => (containerWidthClass = 'max-w-xs')}
						class="rounded-lg border border-slate-300 bg-slate-50 px-2.5 py-1 font-mono text-xs text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 {containerWidthClass ===
						'max-w-xs'
							? 'border-indigo-600 text-indigo-600 dark:text-indigo-300'
							: ''}"
					>
						Narrow (@sm)
					</button>
					<button
						onclick={() => (containerWidthClass = 'w-full')}
						class="rounded-lg border border-slate-300 bg-slate-50 px-2.5 py-1 font-mono text-xs text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 {containerWidthClass ===
						'w-full'
							? 'border-indigo-600 text-indigo-600 dark:text-indigo-300'
							: ''}"
					>
						Full Width (@lg)
					</button>
				</div>
			</div>

			<div class="space-y-2">
				<label for="raw-input" class="font-mono text-xs text-slate-600 dark:text-slate-400"
					>Input Payload:</label
				>
				<input
					id="raw-input"
					type="text"
					bind:value={rawInput}
					class="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-500"
				/>
			</div>

			<div class="mx-auto transition-all duration-300 {containerWidthClass}">
				<div
					class="@container rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-md dark:border-slate-800 dark:bg-slate-950"
				>
					<div class="mb-3 font-mono text-xs text-slate-500">
						// @container adaptive layout card
					</div>

					<div class="grid grid-cols-1 gap-4 @sm:grid-cols-2">
						<div
							class="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
						>
							<span class="font-mono text-[11px] tracking-wider text-slate-500 uppercase"
								>Allocated Bytes</span
							>
							<p class="mt-1 font-mono text-2xl font-bold text-indigo-600 dark:text-indigo-400">
								{byteLength} B
							</p>
						</div>
						<div
							class="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
						>
							<span class="font-mono text-[11px] tracking-wider text-slate-500 uppercase"
								>Base64 Length</span
							>
							<p class="mt-1 font-mono text-2xl font-bold text-emerald-600 dark:text-emerald-400">
								{base64Output.length} Chars
							</p>
						</div>
					</div>

					<div
						class="mt-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/60"
					>
						<span class="font-mono text-[11px] tracking-wider text-slate-500 uppercase"
							>Uint8Array Base64 Output:</span
						>
						<p
							class="mt-2 rounded border border-slate-200 bg-slate-100 p-2 font-mono text-xs break-all text-amber-700 dark:border-slate-900 dark:bg-slate-950 dark:text-amber-300"
						>
							{base64Output}
						</p>
					</div>
				</div>
			</div>
		</div>
	{/snippet}
</LabShell>
