import { Pool, PoolClient } from "@neondatabase/serverless";

type QueryWithParams = { query: string; params?: any[] };

export class QueryRunner<T> {
  private pool: Pool;
  private client?: PoolClient;

  constructor() {
    this.pool = new Pool({ connectionString: process.env.DATABASE_URL });
  }

  async execute(query: string, params?: any[]) {
    this.client = await this.connect();
    try {
      const result = await this.client.query(query, params);
      return result.rows;
    } finally {
      this.client.release();
    }
  }

  // A batch of only side effect queries
  async executeInTransaction(queries: QueryWithParams[]): Promise<void>;
  // callback for more complex operations as an escape hatch
  async executeInTransaction(
    callback: (client: QueryRunner<T>) => Promise<any>
  ): Promise<any>;
  async executeInTransaction(
    callbackOrQueries:
      | QueryWithParams[]
      | ((client: QueryRunner<T>) => Promise<any>)
  ) {
    this.client = await this.connect();

    try {
      await this.beginTransaction();

      if (Array.isArray(callbackOrQueries)) {
        // process queries array
        for (const { query, params } of callbackOrQueries) {
          await this.client.query(query, params); // TODO: handle errors and return results array, not sure how to group them though
        }
      } else {
        // Execute the callback
        await callbackOrQueries(this);
      }

      await this.commitTransaction();
    } catch (error) {
      await this.rollbackTransaction();
      throw error;
    } finally {
      await this.release();
    }
  }
  async beginTransaction(): Promise<void> {
    console.log("beginning transaction");
    this.client = await this.connect();

    await this.client.query("BEGIN");
  }

  async commitTransaction(): Promise<void> {
    console.log("committing transaction");
    this.client = await this.connect();

    await this.client.query("COMMIT");
  }

  async rollbackTransaction(): Promise<void> {
    console.log("rolling back transaction");
    this.client = await this.connect();

    await this.client.query("ROLLBACK");
  }

  private async connect() {
    if (!this.client) {
      this.client = await this.pool.connect();
    }
    return this.client;
  }

  async release(): Promise<void> {
    if (this.client) {
      await this.client.release();
      this.client = undefined;
    }
  }
}
