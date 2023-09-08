import { Pool, PoolClient } from "@neondatabase/serverless";
export class QueryRunner<T> {
  private pool: Pool;
  private client?: PoolClient;

  constructor() {
    this.pool = new Pool({ connectionString: process.env.DATABASE_URL });
  }

  async execute(query: string, params?: any[]) {
    this.client = await this.pool.connect();

    try {
      const result = await this.client.query(query, params);
      return result.rows;
    } finally {
      this.client.release();
    }
  }

  async executeInTransaction(query: string, params?: any[]) {
    this.client = await this.pool.connect();
    try {
      await this.client.query("BEGIN");
      const result = await this.execute(query, params);
      await this.client.query("COMMIT");
      return result;
    } catch (error) {
      await this.client.query("ROLLBACK");
      throw error;
    } finally {
      this.client.release();
    }
  }

  async beginTransaction(): Promise<void> {
    console.log("beginning transaction");
    if (!this.client) this.client = await this.pool.connect();

    await this.client.query("BEGIN");
  }

  async commitTransaction(): Promise<void> {
    console.log("committing transaction");
    if (!this.client) this.client = await this.pool.connect();

    await this.client.query("COMMIT");
  }

  async rollbackTransaction(): Promise<void> {
    console.log("rolling back transaction");
    if (!this.client) this.client = await this.pool.connect();

    await this.client.query("ROLLBACK");
  }

  async release(): Promise<void> {
    if (!this.client) this.client = await this.pool.connect();

    await this.client.release();
  }
}
