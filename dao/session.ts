import { Session, SessionType } from "@/models/session";
import { QueryRunner } from "@/services/query-runner";
import { Repository } from "./types";

export class SessionRepository implements Repository<SessionType, string> {
  constructor(private queryRunner: QueryRunner<SessionType>) {}

  async read(): Promise<SessionType[]> {
    const result = await this.queryRunner.execute(
      "SELECT * FROM session INNER"
    );
    const sessions = result.map((row: any) => Session.parse(row));
    return sessions;
  }

  async readById(id: string): Promise<SessionType | undefined> {
    const [result] = await this.queryRunner.execute(
      "SELECT * FROM session INNER JOIN users ON session.user_id = users.id WHERE id = $1",
      [id]
    );
    if (!result) {
      return undefined;
    }
    return Session.parse(result);
  }

  async readByToken(id: string): Promise<SessionType | undefined> {
    const [result] = await this.queryRunner.execute(
      "SELECT * FROM session INNER JOIN users ON session.user_id = users.id WHERE session_token = $1",
      [id]
    );
    if (!result) {
      return undefined;
    }
    return Session.parse(result);
  }

  async create(entity: SessionType): Promise<SessionType> {
    const [result] = await this.queryRunner.execute(
      "INSERT INTO session (user_id, expires, session_token) VALUES ($1, $2, $3) RETURNING id, user_id, expires, session_token",
      [entity.user.id, entity.expires, entity.sessionToken]
    );
    return Session.parse(result);
  }

  async update(entity: SessionType): Promise<void> {
    await this.queryRunner.execute(
      "UPDATE session SET user_id = $1, expires = $2, session_token = $3 WHERE id = $4",
      [entity.user.id, entity.expires, entity.sessionToken, entity.id]
    );
  }

  async deleteById(sessionId: string): Promise<void> {
    await this.queryRunner.execute("DELETE FROM session WHERE id = $1", [
      sessionId,
    ]);
  }

  async deleteByToken(sessionToken: string): Promise<void> {
    await this.queryRunner.execute(
      "DELETE FROM session WHERE session_token = $1",
      [sessionToken]
    );
  }
}
