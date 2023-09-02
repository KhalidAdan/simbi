import { List } from "@/models/list";
import { QueryRunner } from "@/services/query-runner";
import { Repository } from "./types";

export class ListRepository implements Repository<List, string> {
  constructor(private queryRunner: QueryRunner<List>) {}

  async read(): Promise<List[]> {
    const result = await this.queryRunner.execute(
      `SELECT * FROM list
       INNER JOIN list_product ON list.id = list_product.list_id
       LEFT JOIN product ON list_product.product_id = product.id`
    );
    return result.map((row) => new List(row));
  }

  async readById(id: string): Promise<List> {
    const [result] = await this.queryRunner.execute(
      `SELECT * FROM list
       LEFT JOIN list_product ON list.id = list_product.list_id
       LEFT JOIN product ON list_product.product_id = product.id
       WHERE list.id = $1`,
      [id]
    );
    return new List(result);
  }

  async readByUserId(id: string): Promise<List[]> {
    const result = await this.queryRunner.execute(
      `SELECT * FROM list
        WHERE list.user_id = $1`,
      [id]
    );
    return result.map((row) => new List(row));
  }

  async create(
    entity: Omit<List, "id" | "created_at"> & { userId: string }
  ): Promise<List> {
    const [result] = await this.queryRunner.execute(
      "INSERT INTO list (list_name, list_description, type, public, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        entity.name,
        entity.description,
        entity.type,
        entity.is_public ? entity.is_public : false,
        entity.userId,
      ]
    );
    return new List(result);
  }

  async update(entity: List): Promise<List> {
    const [result] = await this.queryRunner.execute(
      "UPDATE list SET list_name = $1, list_description = $2, type = $3, public = $4 WHERE id = $5 RETURNING *",
      [
        entity.name,
        entity.description,
        entity.type,
        entity.is_public,
        entity.id,
      ]
    );
    return new List(result);
  }
}
