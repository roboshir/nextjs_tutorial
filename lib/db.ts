import { neon } from "@neondatabase/serverless";

export function getDatabase() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured");
  }
  return neon(connectionString);
}

export async function ensureIndexesTable() {
  const sql = getDatabase();
  await sql`
    CREATE TABLE IF NOT EXISTS public_indexes (
      id BIGSERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      stock_ids JSONB NOT NULL,
      points JSONB NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  return sql;
}
