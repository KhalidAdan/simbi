import { Session } from "@/models/session";
import { QueryRunner } from "@/services/query-runner";
import { Repository } from "./types";

export class SessionRepository implements Repository<Session, string> {
  constructor(private queryRunner: QueryRunner) {}

  async read(): Promise<Session[]> {
    const result = await this.queryRunner.execute(
      "SELECT * FROM session INNER"
    );
    const sessions: Session[] = result.map((row: any) => new Session(row));
    return sessions;
  }

  async readById(id: string): Promise<Session | undefined> {
    const [result] = await this.queryRunner.execute(
      "SELECT * FROM session INNER JOIN users ON session.user_id = users.id WHERE id = $1",
      [id]
    );
    if (!result) {
      return undefined;
    }
    return new Session(result);
  }

  async readByToken(id: string): Promise<Session | undefined> {
    const [result] = await this.queryRunner.execute(
      "SELECT * FROM session INNER JOIN users ON session.user_id = users.id WHERE session_token = $1",
      [id]
    );
    if (!result) {
      return undefined;
    }
    return new Session(result);
  }

  async create(entity: Session): Promise<Session> {
    const [session] = await this.queryRunner.execute(
      "INSERT INTO session (user_id, expires, session_token) VALUES ($1, $2, $3) RETURNING id, user_id, expires, session_token",
      [entity.user.id, entity.expires, entity.sessionToken]
    );
    return new Session(session);
  }

  async update(entity: Session): Promise<void> {
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
