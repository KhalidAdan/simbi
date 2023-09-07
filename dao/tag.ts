import { Tag, TagType } from "@/models/tag";
import { QueryRunner } from "@/services/query-runner";
import { Repository } from "./types";

export class TagRepository implements Repository<TagType, string> {
  constructor(private queryRunner: QueryRunner<TagType>) {}

  async read(): Promise<TagType[]> {
    const result = await this.queryRunner.execute("SELECT * FROM tags");
    const tags = result.map((row: any) => Tag.parse(row));
    return tags;
  }

  async readById(id: string): Promise<TagType | undefined> {
    const [result] = await this.queryRunner.execute(
      "SELECT * FROM tags WHERE id = $1",
      [id]
    );
    if (!result) {
      return undefined;
    }
    return Tag.parse(result);
  }

  async create(entity: TagType): Promise<TagType> {
    const [tag] = await this.queryRunner.execute(
      "INSERT INTO tags (name, colour) VALUES ($1, $2) RETURNING id, name, colour",
      [entity.name, entity.colour]
    );
    return Tag.parse(tag);
  }

  async update(entity: TagType): Promise<void> {
    await this.queryRunner.execute(
      "UPDATE tags SET name = $1, colour = $2 WHERE id = $3",
      [entity.name, entity.colour, entity.id]
    );
  }
}
