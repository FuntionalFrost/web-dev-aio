<script lang="ts">
	let {
		codeHtml,
		rawCode = '',
		filename = 'snippet.ts'
	}: {
		codeHtml: string;
		rawCode?: string;
		filename?: string;
	} = $props();

	let copied = $state(false);

	async function copyToClipboard() {
		let textToCopy = rawCode;
		if (!textToCopy && typeof document !== 'undefined') {
			const el = document.createElement('div');
			el.innerHTML = codeHtml;
			textToCopy = el.innerText || el.textContent || '';
		}

		await navigator.clipboard.writeText(textToCopy.trim());
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<div
	class="relative my-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 font-mono text-sm shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:shadow-xl"
>
	<!-- Top Bar -->
	<div
		class="flex items-center justify-between border-b border-slate-200 bg-slate-100/90 px-4 py-2 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400"
	>
		<span class="flex items-center gap-2">
			<span class="h-2 w-2 rounded-full bg-indigo-500"></span>
			{filename}
		</span>
		<button
			onclick={copyToClipboard}
			aria-label="Copy code to clipboard"
			class="flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-2 py-1 text-[11px] font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700/60 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
		>
			{#if copied}
				<span class="font-bold text-emerald-600 dark:text-emerald-400">✓ Copied</span>
			{:else}
				<span>Copy</span>
			{/if}
		</button>
	</div>

	<!-- Shiki Code Surface -->
	<div
		class="overflow-x-auto p-4 text-xs sm:text-sm [&_pre]:m-0! [&_pre]:bg-transparent! [&_pre]:p-0!"
	>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html codeHtml}
	</div>
</div>
