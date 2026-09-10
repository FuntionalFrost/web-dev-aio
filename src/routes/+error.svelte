<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
</script>

<div class="flex min-h-[70vh] flex-col items-center justify-center space-y-4 p-6 text-center">
	<span
		class="rounded-full border border-rose-500/30 bg-rose-50 px-3.5 py-1 font-mono text-sm font-bold text-rose-600 dark:bg-rose-950/30 dark:text-rose-400"
	>
		Status {page.status}
	</span>
	<h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
		Lab Route Not Found
	</h1>
	<p class="max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
		The architectural module or simulator you requested does not exist or has moved in the 35-module
		curriculum.
	</p>
	<div class="flex gap-3 pt-4">
		<a
			href={resolve('/')}
			class="rounded-xl bg-indigo-600 px-5 py-2.5 font-mono text-base font-bold text-white shadow-md shadow-indigo-500/20 transition hover:bg-indigo-500"
		>
			Return to Labs Dashboard
		</a>
	</div>
</div>
