import { List, ListType } from "@/models/list";
import { ProductType } from "@/models/product";
import { QueryRunner } from "@/services/query-runner";
import { Repository } from "./types";

export class ListRepository implements Repository<ListType, string> {
  private qR: QueryRunner<ListType>;
  constructor() {
    this.qR = new QueryRunner<ListType>();
  }

  async read(): Promise<ListType[]> {
    const result = await this.qR.execute(
      `SELECT *, list_name as name, 
        list_description as description FROM list
       INNER JOIN list_product ON list.id = list_product.list_id
       LEFT JOIN product ON list_product.product_id = product.id`
    );
    return result.map((row) => List.parse(row));
  }

  async readById(id: string): Promise<ListType> {
    const [result] = await this.qR.execute(
      `SELECT *, list.id as id, list.created_at, list_name as name, 
        list_description as description FROM list
       WHERE list.id = $1`,
      [id]
    );
    return List.parse(result);
  }

  async readByUserId(id: string): Promise<ListType[]> {
    const result = await this.qR.execute(
      `SELECT l.*, l.list_name as name, l.list_description as description, lu.user_id
        FROM list l
        LEFT JOIN list_user lu ON l.id = lu.list_id
        LEFT JOIN users u ON lu.user_id = u.id
        WHERE l.user_id = $1
        OR lu.user_id = $1`,
      [id]
    );
    return result.map((row) => List.parse(row));
  }

  async create(
    entity: Omit<ListType, "id" | "created_at"> & { user_id: string }
  ): Promise<ListType> {
    const [result] = await this.qR.execute(
      `INSERT INTO list 
       (
        list_name, list_description, type, public, user_id, end_date) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING 
        id, 
        list_name as name, 
        list_description as description, 
        end_date, 
        created_at, 
        updated_at, 
        type, 
        recurring_window,
        public as is_public,
        user_id as "userId"`,
      [
        entity.name,
        entity.description,
        entity.type,
        entity.is_public ? entity.is_public : false,
        entity.user_id,
        entity.end_date,
      ]
    );
    return List.parse(result);
  }

  async update(entity: ListType): Promise<ListType> {
    const [result] = await this.qR.execute(
      `UPDATE list SET list_name = $1, list_description = $2, type = $3, public = $4 WHERE id = $5 
       RETURNING 
        id, 
        list_name as name, 
        list_description as description, 
        end_date, 
        created_at, 
        updated_at, 
        type, 
        recurring_window,
        public as is_public,
        user_id as "userId"`,
      [
        entity.name,
        entity.description,
        entity.type,
        entity.is_public,
        entity.id,
      ]
    );
    return List.parse(result);
  }

  async removeProductFromList(
    productId: Pick<ProductType, "id">
  ): Promise<void> {
    await this.qR.transaction([
      {
        query: "DELETE FROM list_product WHERE product_id = $1",
        params: [productId],
      },
      {
        query: "DELETE FROM product WHERE id = $1",
        params: [productId],
      },
    ]);
  }
}
