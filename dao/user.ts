import { User } from "@/models/user";
import { QueryRunner } from "@/services/query-runner";
import { AdapterAccount } from "next-auth/adapters";
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

  async readByAccount(
    providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId">
  ): Promise<User | undefined> {
    const [result] = await this.queryRunner.execute(
      "SELECT * FROM account INNER JOIN users ON account.user_id = users.id WHERE account.id = $1",
      [providerAccountId]
    );
    if (!result) {
      return undefined;
    }
    return new User(result);
  }

  async readByEmail(email: string): Promise<User | undefined> {
    const [result] = await this.queryRunner.execute(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (!result) {
      return undefined;
    }
    return new User(result);
  }

  async create(entity: User): Promise<User> {
    const user = await this.queryRunner.execute(
      "INSERT INTO users (name, email, image, emailVerified) VALUES ($1, $2, $3, $4)",
      [entity.name, entity.email, entity.image, entity.emailVerified]
    );
    return new User(user);
  }

  async update(entity: User): Promise<User> {
    const user = await this.queryRunner.execute(
      "UPDATE users SET name = $1, email = $2, image = $3 WHERE id = $4",
      [entity.name, entity.email, entity.image, entity.id]
    );

    return new User(user);
  }

  async linkAccount(account: AdapterAccount): Promise<void> {
    await this.queryRunner.execute(
      "UPDATE users SET account_id = $1 WHERE id = $2",
      [account.providerAccountId, account.userId]
    );
  }

  async delete(entity: User): Promise<void> {
    await this.queryRunner.execute("DELETE FROM users WHERE id = $1", [
      entity.id,
    ]);
  }
}
