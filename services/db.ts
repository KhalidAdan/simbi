import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL not set, check your .env file");
}

const sql = neon(process.env.DATABASE_URL);

export async function helloWorld() {
  const start = Date.now();
  const [result] = await sql`SELECT * FROM grocery_list`;
  const end = Date.now();
  console.log(result, { latency: Math.abs(start - end) });
  return result.id;
}
