<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import { simulators } from '$lib/simulators';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let lab = $derived(data.lab);
	let Simulator = $derived(simulators[lab.slug]);
</script>

<LabShell
	moduleId={lab.id}
	title={lab.title}
	description={lab.description}
	codeHtml={lab.codeHtml}
	rawCode={lab.rawCode}
	filename={lab.filename}
	guideHtml={lab.guideHtml}
>
	{#if Simulator}
		<Simulator />
	{/if}
</LabShell>
