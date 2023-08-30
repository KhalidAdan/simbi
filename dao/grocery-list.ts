import { GroceryList } from "@/models/grocery-list";
import { QueryRunner } from "@/services/query-runner";
import { Repository } from "./types";

export class GroceryListRepository implements Repository<GroceryList, number> {
  constructor(private queryRunner: QueryRunner) {}

  async read() {
    const result = await this.queryRunner.execute("SELECT * FROM grocery_list");
    const groceryLists: GroceryList[] = result.map(
      (row: any) => new GroceryList(row)
    );
    return groceryLists;
  }

  async readById(id: number): Promise<GroceryList | undefined> {
    const [result] = await this.queryRunner.execute(
      "SELECT * FROM grocery_list WHERE id = $1",
      [id]
    );
    if (!result) {
      return undefined;
    }
    return new GroceryList(result);
  }

  async create(entity: GroceryList): Promise<void> {
    await this.queryRunner.execute(
      "INSERT INTO grocery_list (name, updated_at, created_at) VALUES ($1, $2, $3)",
      [entity.name, entity.updatedDate, entity.createdDate]
    );
  }

  async update(entity: GroceryList): Promise<void> {
    await this.queryRunner.execute(
      "UPDATE grocery_list SET name = $1, updated_at = $2 WHERE id = $3",
      [entity.name, entity.updatedDate, entity.id]
    );
  }

  async delete(entity: GroceryList): Promise<void> {
    await this.queryRunner.execute("DELETE FROM grocery_list WHERE id = $1", [
      entity.id,
    ]);
  }
}
