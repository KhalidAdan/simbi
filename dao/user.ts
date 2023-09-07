import { User, UserType } from "@/models/user";
import { QueryRunner } from "@/services/query-runner";
import { AdapterAccount } from "next-auth/adapters";
import { Repository } from "./types";

export class UserRepository implements Repository<UserType, string> {
  constructor(private queryRunner: QueryRunner<UserType>) {}

  async read() {
    const result = await this.queryRunner.execute("SELECT * FROM users");
    const users = result.map((row: any) => User.parse(row));
    return users;
  }

  async readById(id: string): Promise<UserType | undefined> {
    const [result] = await this.queryRunner.execute(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );
    if (!result) {
      return undefined;
    }
    return User.parse(result);
  }

  async readByAccount(
    providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId">
  ): Promise<UserType | undefined> {
    const [result] = await this.queryRunner.execute(
      "SELECT * FROM account INNER JOIN users ON account.user_id = users.id WHERE account.provider = $1 AND account.provider_account_id = $2",
      [providerAccountId.provider, providerAccountId.providerAccountId]
    );
    if (!result) {
      return undefined;
    }
    return User.parse(result);
  }

  async readByEmail(email: string): Promise<UserType | undefined> {
    const [result] = await this.queryRunner.execute(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (!result) {
      return undefined;
    }
    return User.parse(result);
  }

  async readBySessionToken(
    sessionToken: string
  ): Promise<UserType | undefined> {
    const [result] = await this.queryRunner.execute(
      `SELECT * FROM users u
       INNER JOIN session s ON u.id = s.user_id
       WHERE s.session_token = $1`,
      [sessionToken]
    );
    if (!result) {
      return undefined;
    }
    return User.parse(result);
  }

  async create(
    entity: Pick<UserType, "name" | "email" | "emailVerified" | "image">
  ): Promise<UserType> {
    const [user] = await this.queryRunner.execute(
      "INSERT INTO users (name, email, image, email_verified) VALUES ($1, $2, $3, $4) RETURNING id, name, email, image, email_verified",
      [entity.name, entity.email, entity.image, entity.emailVerified]
    );
    return User.parse(user);
  }

  async update(entity: UserType): Promise<UserType> {
    const user = await this.queryRunner.execute(
      "UPDATE users SET name = $1, email = $2, image = $3 WHERE id = $4",
      [entity.name, entity.email, entity.image, entity.id]
    );

    return User.parse(user);
  }

  async delete(entity: UserType): Promise<void> {
    await this.queryRunner.execute("DELETE FROM users WHERE id = $1", [
      entity.id,
    ]);
  }
}
