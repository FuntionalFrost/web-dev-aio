import { createLabLoader } from '$lib/server/labs';

export const prerender = true;
export const load = createLabLoader();
