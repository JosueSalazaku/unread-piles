import dotenv from 'dotenv';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

// Load environment variables from .env file
dotenv.config();

// Check if DATABASE_URL is set
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set.");
}

// Initialize the PostgreSQL client
const migrationClient = postgres(process.env.DATABASE_URL, { max: 10 }); // Adjust max connections as needed

// Initialize drizzle with the migration client
const db = drizzle(migrationClient);

// Perform migrations
async function runMigrations() {
    try {
        await migrate(db, './src/drizzle/migrations'); // Path to your migrations folder
        console.log("Migrations ran successfully.");
    } catch (error) {
        console.error("Error running migrations:", error);
    } finally {
        await migrationClient.end(); // Ensure the client is properly closed
    }
}

// Execute migrations
runMigrations();
