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

  async readProductsByListId(listId: string): Promise<Product[]> {
    const result = await this.queryRunner.execute(
      `SELECT *, p.id, u.name as user_name FROM product p
        INNER JOIN list_product lp ON p.id = lp.product_id
        LEFT JOIN list l ON lp.list_id = l.id
        LEFT JOIN users u ON lp.claimed_by = u.id 
        WHERE l.id = $1`,
      [listId]
    );
    return result.map((row) => new Product(row));
  }

  async create(entity: Omit<Product, "id" | "created_at">): Promise<Product> {
    const [result] = await this.queryRunner.execute(
      "INSERT INTO product (product_name, product_description, price, product_url) VALUES ($1, $2, $3, $4) RETURNING *",
      [
        entity.product_name,
        entity.product_description,
        entity.price,
        entity.url,
      ]
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
      const newProduct = await this.create(product);
      console.log(newProduct);
      const [result] = await this.queryRunner.execute(
        "INSERT INTO list_product (list_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
        [listId, newProduct.id, quantity]
      );
      this.queryRunner.commitTransaction();
      return new ListProduct(result);
    } catch (error) {
      console.error(error);
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

  async pledgeProductOnList(
    userId: string,
    productId: string,
    listId: string
  ): Promise<void> {
    await this.queryRunner.execute(
      `UPDATE list_product SET claimed_by = $1 WHERE product_id = $2 AND list_id = $3 RETURNING *`,
      [userId, productId, listId]
    );
  }
}
