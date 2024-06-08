import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './src/drizzle/schema';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('SUPABASE_URL is not defined in the environment variables');
}

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema, logger: true});

// Attempt a simple query to ensure the connection works
client`SELECT 1`.then(() => {
  console.log('Connected to Supabase DB');
}).catch((err) => {
  console.error('Connection to Supabase DB failed:', err);
});