import { highlightCode } from '$lib/server/shiki';
import type { PageServerLoad } from './$types';

export const prerender = true;

const billingSnippet = `import { Resend } from 'resend';
import { Polar } from '@polar-sh/sdk';

// 1. Resend Transactional Email Dispatcher
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(toEmail: string, name: string) {
  return await resend.emails.send({
    from: 'Web Engine <billing@modern-web.org>',
    to: [toEmail],
    subject: 'Your Enterprise Workspace is Provisioned',
    html: \`<h1>Welcome, \${name}</h1><p>Your subscription is active.</p>\`
  });
}

// 2. Polar.sh Merchant of Record (MoR) Webhook Receiver
const polar = new Polar({ accessToken: process.env.POLAR_ACCESS_TOKEN });

export async function handlePolarWebhook(event: { type: string; data: Record<string, unknown> }) {
  switch (event.type) {
    case 'subscription.created':
    case 'subscription.updated': {
      const { customer, price, status } = event.data as { customer: { email: string; name: string }; price: { amount: number }; status: string };
      if (status === 'active') {
        await sendWelcomeEmail(customer.email, customer.name);
      }
      break;
    }
    case 'subscription.canceled':
      // Downgrade organization access in database
      break;
  }
}`;

export const load: PageServerLoad = async () => {
	const highlightedCode = await highlightCode(billingSnippet, 'typescript');

	return {
		meta: {
			title: 'Resend Transactional Email & Polar.sh Monetization',
			description:
				'Accept global developer payments with Polar.sh Merchant of Record and trigger reliable transactional emails via Resend.'
		},
		codeHtml: highlightedCode,
		rawCode: billingSnippet
	};
};
