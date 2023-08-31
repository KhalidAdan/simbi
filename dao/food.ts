import { Food } from "@/models/food";
import { QueryRunner } from "@/services/query-runner";
import { Repository } from "./types";

export class FoodRepository implements Repository<Food, number> {
  constructor(private queryRunner: QueryRunner) {}

  async read() {
    const result = await this.queryRunner.execute("SELECT * FROM food");
    const foods: Food[] = result.map((row: any) => new Food(row));
    return foods;
  }

  async readById(id: number): Promise<Food | undefined> {
    const [result] = await this.queryRunner.execute(
      "SELECT * FROM food WHERE id = $1",
      [id]
    );
    if (!result) {
      return undefined;
    }
    return new Food(result);
  }

  async readByGroceryListId(groceryListId: number): Promise<Food[]> {
    const result = await this.queryRunner.execute(
      "SELECT * FROM food WHERE grocery_list_id = $1",
      [groceryListId]
    );
    const foods: Food[] = result.map((row: any) => new Food(row));
    return foods;
  }

  async readApprovedFoods(): Promise<Food[]> {
    const result = await this.queryRunner.execute(
      "SELECT * FROM food WHERE approved = true"
    );
    const foods: Food[] = result.map((row: any) => new Food(row));
    return foods;
  }

  async create(entity: Food): Promise<void> {
    await this.queryRunner.execute(
      "INSERT INTO food (name, price, quantity, link, grocery_list_id) VALUES ($1, $2, $3, $4, $5)",
      [
        entity.name,
        entity.price,
        entity.quantity,
        entity.link,
        entity.groceryListId,
      ]
    );
  }

  async update(entity: Food): Promise<void> {
    await this.queryRunner.execute(
      "UPDATE food SET name = $1, price = $2, link = $3, approved = $4, updated_at = $5 WHERE id = $6",
      [
        entity.name,
        entity.price,
        entity.link,
        entity.approved,
        entity.updatedDate,
        entity.id,
      ]
    );
  }

  async updateApproved(entity: Food): Promise<void> {
    await this.queryRunner.execute(
      "UPDATE food SET approved = $1 WHERE id = $2",
      [entity.approved, entity.id]
    );
  }

  async delete(entity: Food): Promise<void> {
    await this.queryRunner.execute("DELETE FROM food WHERE id = $1", [
      entity.id,
    ]);
  }
}
