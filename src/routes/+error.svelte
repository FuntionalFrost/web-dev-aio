<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
</script>

<div class="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center">
	<span
		class="rounded-full border border-rose-500/30 bg-rose-50 px-3 py-1 font-mono text-xs text-rose-600 dark:bg-rose-950/30 dark:text-rose-400"
	>
		Status {page.status}
	</span>
	<h1
		class="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white"
	>
		Lab Route Not Found
	</h1>
	<p class="mt-2 max-w-md text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-400">
		The architectural module or simulator you requested does not exist or has moved.
	</p>
	<div class="mt-6 flex gap-3">
		<a
			href={resolve('/')}
			class="rounded-xl bg-indigo-600 px-4 py-2 font-mono text-xs font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:bg-indigo-500"
		>
			Return to Index
		</a>
	</div>
</div>
