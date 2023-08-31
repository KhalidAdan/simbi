import { User } from "@/models/user";
import { QueryRunner } from "@/services/query-runner";
import { Repository } from "./types";

export class UserRepository implements Repository<User, number> {
  constructor(private queryRunner: QueryRunner) {}

  async read() {
    const result = await this.queryRunner.execute("SELECT * FROM users");
    const users: User[] = result.map((row: any) => new User(row));
    return users;
  }

  async readById(id: number): Promise<User | undefined> {
    const [result] = await this.queryRunner.execute(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );
    if (!result) {
      return undefined;
    }
    return new User(result);
  }

  async create(entity: User): Promise<void> {
    await this.queryRunner.execute(
      "INSERT INTO users (name, email, image) VALUES ($1, $2, $3)",
      [entity.name, entity.email, entity.image]
    );
  }

  async update(entity: User): Promise<void> {
    await this.queryRunner.execute(
      "UPDATE users SET name = $1, email = $2, image = $3 WHERE id = $4",
      [entity.name, entity.email, entity.image, entity.id]
    );
  }

  async delete(entity: User): Promise<void> {
    await this.queryRunner.execute("DELETE FROM users WHERE id = $1", [
      entity.id,
    ]);
  }
}
