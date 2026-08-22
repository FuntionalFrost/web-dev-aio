import { highlightCode } from '$lib/server/shiki';
import type { PageServerLoad } from './$types';

export const prerender = true;

const shadcnSnippet = `<!-- Headless Bits UI + Tailwind v4 Merge (shadcn-svelte pattern) -->
<script lang="ts">
  import { Dialog } from 'bits-ui';
  import { cva } from 'class-variance-authority';
  import { clsx, type ClassValue } from 'clsx';
  import { twMerge } from 'tailwind-merge';

  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }

  const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-xl font-medium transition text-xs',
    {
      variants: {
        variant: {
          default: 'bg-indigo-600 text-white hover:bg-indigo-500',
          outline: 'border border-slate-300 dark:border-slate-700 hover:bg-slate-100',
          destructive: 'bg-rose-600 text-white hover:bg-rose-500'
        },
        size: {
          default: 'h-9 px-4 py-2',
          sm: 'h-8 px-3'
        }
      },
      defaultVariants: { variant: 'default', size: 'default' }
    }
  );
</script>

<!-- Fully Accessible Headless Dialog Primitive -->
<Dialog.Root>
  <Dialog.Trigger class={cn(buttonVariants({ variant: 'default' }))}>
    Open Headless Dialog
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay class="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50" />
    <Dialog.Content class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 border rounded-2xl p-6 shadow-2xl z-50">
      <Dialog.Title class="text-base font-bold">shadcn-svelte Architecture</Dialog.Title>
      <Dialog.Description class="text-xs text-slate-500 mt-2">
        Unstyled accessibility primitives from Bits UI styled with atomic Tailwind v4 tokens.
      </Dialog.Description>
      <Dialog.Close class={cn(buttonVariants({ variant: 'outline' }), 'mt-4')}>
        Close
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>`;

export const load: PageServerLoad = async () => {
	const highlightedCode = await highlightCode(shadcnSnippet, 'svelte');

	return {
		meta: {
			title: 'shadcn-svelte, Bits UI & CVA Component Architecture',
			description:
				'Explore the copy-paste component model combining headless unstyled primitives with class-variance-authority and Tailwind CSS v4.'
		},
		codeHtml: highlightedCode,
		rawCode: shadcnSnippet
	};
};
