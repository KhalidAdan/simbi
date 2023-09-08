import { ListProduct, ListProductType } from "@/models/list-product";
import { Product, ProductType } from "@/models/product";
import { User } from "@/models/user";
import { QueryRunner } from "@/services/query-runner";
import { Repository } from "./types";

export class ProductRepository implements Repository<ProductType, string> {
  constructor(private queryRunner: QueryRunner<ProductType>) {}

  async read(): Promise<ProductType[]> {
    const result = await this.queryRunner.execute(
      `SELECT * FROM product 
       INNER JOIN list_product ON product.id = list_product.product_id 
       LEFT JOIN list ON list_product.list_id = list.id`
    );
    return result.map((row) => Product.parse(row));
  }

  async readById(id: string): Promise<ProductType> {
    const [result] = await this.queryRunner.execute(
      `SELECT * FROM product 
       INNER JOIN list_product ON product.id = list_product.product_id 
       LEFT JOIN list ON list_product.list_id = list.id 
       WHERE product.id = $1`,
      [id]
    );
    return Product.parse(result);
  }

  async readProductsByListId(listId: string): Promise<ProductType[]> {
    const result = await this.queryRunner.execute(
      `SELECT *, p.id, u.id as user_id, u.name as user_name, p.product_url as url, lp.claimed_by, SUM(p.price) OVER (PARTITION BY l.id) as sum
        FROM product p
        INNER JOIN list_product lp ON p.id = lp.product_id
        LEFT JOIN list l ON lp.list_id = l.id
        LEFT JOIN users u ON lp.claimed_by = u.id
        WHERE l.id = $1`,
      [listId]
    );
    return result.map((row) =>
      Product.parse({
        ...row,
        user:
          row.user_id && // only parse user if there is a user_id on the row
          User.parse({
            id: row.user_id,
            name: row.user_name,
            email: row.email,
            emailVerified: row.email_verified,
            image: row.image,
          }),
      })
    );
  }

  async create(
    entity: Omit<ProductType, "id" | "created_at">
  ): Promise<ProductType> {
    const [result] = await this.queryRunner.execute(
      `INSERT INTO product (product_name, product_description, price, product_url) VALUES ($1, $2, $3, $4) RETURNING *, product_name as name, product_description as description, product_url as url, created_at`,
      [
        entity.product_name,
        entity.product_description,
        entity.price,
        entity.url,
      ]
    );
    console.log(result);
    return Product.parse({ ...result });
  }

  async update(entity: ProductType): Promise<ProductType> {
    const [result] = await this.queryRunner.execute(
      "UPDATE products SET product_name = $1, product_description = $2, price = $3 WHERE id = $4 RETURNING *",
      [entity.product_name, entity.product_description, entity.price, entity.id]
    );
    return Product.parse(result);
  }

  async delete(id: string): Promise<void> {
    await this.queryRunner.execute("DELETE FROM products WHERE id = $1", [id]);
  }

  async addProductToList(
    product: Omit<ProductType, "id">,
    listId: string,
    quantity: number
  ): Promise<ListProductType | void> {
    try {
      this.queryRunner.beginTransaction();
      const newProduct = await this.create(product);
      const [result] = await this.queryRunner.execute(
        "INSERT INTO list_product (list_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
        [listId, newProduct.id, quantity]
      );
      this.queryRunner.commitTransaction();
      return ListProduct.parse(result);
    } catch (error) {
      console.error(error);
      this.queryRunner.rollbackTransaction();
    } finally {
      this.queryRunner.release();
    }
  }

  async removeProductFromList(
    product: ProductType,
    listId: string
  ): Promise<void> {
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
    console.log(userId, productId, listId);
    await this.queryRunner.execute(
      `UPDATE list_product SET claimed_by = $1 WHERE product_id = $2 AND list_id = $3 RETURNING *`,
      [userId, productId, listId]
    );
  }
}
