import { ListProduct } from "@/models/list-product";
import { Product } from "@/models/product";
import { QueryRunner } from "@/services/query-runner";
import { Repository } from "./types";

export class ProductRepository implements Repository<Product, string> {
  constructor(private queryRunner: QueryRunner<Product>) {}

  async read(): Promise<Product[]> {
    const result = await this.queryRunner.execute(
      `SELECT * FROM product 
       INNER JOIN list_product ON product.id = list_product.product_id 
       LEFT JOIN list ON list_product.list_id = list.id`
    );
    return result.map((row) => new Product(row));
  }

  async readById(id: string): Promise<Product> {
    const [result] = await this.queryRunner.execute(
      `SELECT * FROM product 
       INNER JOIN list_product ON product.id = list_product.product_id 
       LEFT JOIN list ON list_product.list_id = list.id 
       WHERE product.id = $1`,
      [id]
    );
    return new Product(result);
  }

  async create(entity: Omit<Product, "id" | "created_at">): Promise<Product> {
    const [result] = await this.queryRunner.execute(
      "INSERT INTO product (product_name, product_description, price) VALUES ($1, $2, $3) RETURNING *",
      [entity.product_name, entity.product_description, entity.price]
    );
    return new Product(result);
  }

  async update(entity: Product): Promise<Product> {
    const [result] = await this.queryRunner.execute(
      "UPDATE products SET product_name = $1, product_description = $2, price = $3 WHERE id = $4 RETURNING *",
      [entity.product_name, entity.product_description, entity.price, entity.id]
    );
    return new Product(result);
  }

  async delete(id: string): Promise<void> {
    await this.queryRunner.execute("DELETE FROM products WHERE id = $1", [id]);
  }

  async addProductToList(
    product: Product,
    listId: string,
    quantity: number
  ): Promise<ListProduct | void> {
    try {
      this.queryRunner.beginTransaction();
      await this.create(product);
      const [result] = await this.queryRunner.execute(
        "INSERT INTO list_product (list_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
        [listId, product.id, quantity]
      );
      this.queryRunner.commitTransaction();
      return new ListProduct(result);
    } catch (error) {
      this.queryRunner.rollbackTransaction();
    } finally {
      this.queryRunner.release();
    }
  }

  async removeProductFromList(product: Product, listId: string): Promise<void> {
    await this.queryRunner.execute(
      "DELETE FROM list_product WHERE list_id = $1 AND product_id = $2",
      [listId, product.id]
    );
  }
}
