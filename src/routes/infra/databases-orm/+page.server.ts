import { highlightCode } from '$lib/server/shiki';
import type { PageServerLoad } from './$types';

export const prerender = true;

const dbSnippet = `import { pgTable, text, timestamp, uuid, integer, index } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// 1. Schema-First DDL Declaration
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  role: text('role', { enum: ['admin', 'member'] }).default('member').notNull(),
  reputation: integer('reputation').default(0).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
}, (table) => [
  index('email_idx').on(table.email)
]);

// 2. Serverless Connection Pooling Client
// In serverless/edge environments, direct TCP connections exhaust PostgreSQL limits.
// Use connection pooling URLs with max: 1 connection per isolate instance.
const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, { max: 1, idle_timeout: 20 });
export const db = drizzle(client);

// 3. Relational Type-Safe Query Execution
export async function getTopUsers(minRep: number) {
  return await db.select({
    id: users.id,
    email: users.email,
    reputation: users.reputation
  })
  .from(users)
  .where((t) => gt(t.reputation, minRep))
  .limit(10);
}`;

export const load: PageServerLoad = async () => {
	const highlightedCode = await highlightCode(dbSnippet, 'typescript');

	return {
		meta: {
			title: 'Modern Databases, Type-Safe ORMs & Connection Pooling',
			description:
				'Design schema-first databases with Drizzle ORM, construct type-safe SQL queries, and manage connection exhaustion in serverless environments.'
		},
		codeHtml: highlightedCode,
		rawCode: dbSnippet
	};
};
