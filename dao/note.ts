import { Note } from "@/models/note";
import { QueryRunner } from "@/services/query-runner";
import { Repository } from "./types";

export class NoteRepository implements Repository<Note, number> {
  constructor(private queryRunner: QueryRunner) {}

  async read() {
    const result = await this.queryRunner.execute("SELECT * FROM note");
    const notes: Note[] = result.map((row: any) => new Note(row));
    return notes;
  }

  async readById(id: number): Promise<Note | undefined> {
    const [result] = await this.queryRunner.execute(
      "SELECT * FROM note WHERE id = $1",
      [id]
    );
    if (!result) {
      return undefined;
    }
    return new Note(result);
  }

  async create(entity: Note): Promise<void> {
    await this.queryRunner.execute("INSERT INTO note (content) VALUES ($1)", [
      entity.content,
    ]);
  }

  async update(entity: Note): Promise<void> {
    await this.queryRunner.execute(
      "UPDATE note SET content = $1 WHERE id = $2",
      [entity.content, entity.id]
    );
  }

  async delete(entity: Note): Promise<void> {
    await this.queryRunner.execute("DELETE FROM note WHERE id = $1", [
      entity.id,
    ]);
  }
}
