import { Account } from "@/models/account";
import { QueryRunner } from "@/services/query-runner";
import { AdapterAccount } from "next-auth/adapters";
import { Repository } from "./types";

export class AccountRepository implements Repository<Account, number> {
  constructor(private queryRunner: QueryRunner) {}

  async read() {
    const result = await this.queryRunner.execute("SELECT * FROM account");
    const accounts: Account[] = result.map((row: any) => new Account(row));
    return accounts;
  }

  async readById(id: number): Promise<Account | undefined> {
    const [result] = await this.queryRunner.execute(
      "SELECT * FROM account WHERE id = $1",
      [id]
    );
    if (!result) {
      return undefined;
    }
    return new Account(result);
  }

  async readByProviderAccountId(
    providerAccountId: string
  ): Promise<Account | undefined> {
    const [result] = await this.queryRunner.execute(
      "SELECT * FROM account WHERE provider_account_id = $1",
      [providerAccountId]
    );
    if (!result) {
      return undefined;
    }
    return new Account(result);
  }

  async create(entity: Account): Promise<Account> {
    const [account] = await this.queryRunner.execute(
      "INSERT INTO account (user_id, provider, provider_account_id, refresh_token, access_token, expires_at, token_type, scope, id_token, session_state) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id, user_id",
      [
        entity.userId,
        entity.provider,
        entity.providerAccountId,
        entity.refreshToken,
        entity.accessToken,
        entity.accessTokenExpiresAt,
        entity.tokenType,
        entity.scope,
        entity.idToken,
        entity.sessionState,
      ]
    );
    return new Account(account);
  }

  async update(entity: Account): Promise<void> {
    await this.queryRunner.execute(
      "UPDATE account SET refresh_token = $1, access_token = $2, expires_at = $3, token_type = $4, scope = $5, id_token = $6, session_state = $7, updated_date = $8 WHERE id = $9",
      [
        entity.refreshToken,
        entity.accessToken,
        entity.accessTokenExpiresAt,
        entity.tokenType,
        entity.scope,
        entity.idToken,
        entity.sessionState,
        entity.updatedDate,
        entity.id,
      ]
    );
  }

  async delete(entity: Account): Promise<void> {
    await this.queryRunner.execute("DELETE FROM account WHERE id = $1", [
      entity.id,
    ]);
  }

  async linkAccount(account: AdapterAccount): Promise<void> {
    await this.queryRunner.execute(
      "UPDATE account SET user_id = $1 WHERE provider_account_id = $2",
      [account.userId, account.providerAccountId]
    );
  }
}
