import { highlightCode } from '$lib/server/shiki';
import type { PageServerLoad } from './$types';

export const prerender = true;

const storageSnippet = `import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Inngest } from 'inngest';

// 1. Cloudflare R2 / AWS S3 Direct Presigned URL Generator
// Client uploads directly to bucket without consuming serverless RAM
const s3 = new S3Client({ region: 'auto', endpoint: process.env.R2_ENDPOINT });

export async function createPresignedUpload(fileKey: string, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: 'user-assets-2026',
    Key: fileKey,
    ContentType: contentType
  });

  return await getSignedUrl(s3, command, { expiresIn: 300 }); // Valid for 5 minutes
}

// 2. Inngest Durable Multi-Step Background Workflow
export const inngest = new Inngest({ id: 'web-engine-orchestrator' });

export const processMediaWorkflow = inngest.createFunction(
  { id: 'process-user-media' },
  { event: 'media.uploaded' },
  async ({ event, step }) => {
    // Step 1: Scan for viruses & validate checksum
    const scan = await step.run('scan-asset', async () => ({ clean: true }));

    // Step 2: Generate multi-resolution image thumbnails (sleep if necessary)
    const thumbnails = await step.run('generate-thumbnails', async () => ({ count: 3 }));

    // Step 3: Notify user via webhook/push
    await step.run('dispatch-notification', async () => ({ notified: true }));
    return { status: 'completed', scan, thumbnails };
  }
);`;

export const load: PageServerLoad = async () => {
	const highlightedCode = await highlightCode(storageSnippet, 'typescript');

	return {
		meta: {
			title: 'Direct S3/R2 Presigned Uploads & Inngest Background Jobs',
			description:
				'Bypass serverless RAM constraints using direct client-to-storage presigned URLs and orchestrate durable multi-step background workflows.'
		},
		codeHtml: highlightedCode,
		rawCode: storageSnippet
	};
};
