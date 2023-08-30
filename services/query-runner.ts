import { Pool, PoolClient } from "@neondatabase/serverless";
export class QueryRunner {
  private pool: Pool;
  private client?: PoolClient;

  constructor() {
    this.pool = new Pool({ connectionString: process.env.DATABASE_URL });
  }

  async execute(query: string, params?: any[]) {
    const client = await this.pool.connect();

    try {
      const result = await client.query(query, params);
      return result.rows;
    } finally {
      client.release();
    }
  }

  async executeInTransaction(query: string, params?: any[]) {
    const client = await this.pool.connect();
    try {
      await this.client?.query("BEGIN");
      const result = await this.execute(query, params);
      await this.client?.query("COMMIT");
      return result;
    } catch (error) {
      await this.client?.query("ROLLBACK");
      throw error;
    } finally {
      await client.release();
    }
  }
}
