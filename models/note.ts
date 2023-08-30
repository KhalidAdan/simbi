export class Note {
  id: number;
  content: string;

  constructor(row: any) {
    this.id = row.id;
    this.content = row.content;
  }
}

export type NoteType = InstanceType<typeof Note>;
