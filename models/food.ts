import { Note } from "./note";

export class Food {
  id?: number;
  name: string;
  price: string;
  link: string;
  approved?: boolean;
  createdDate?: Date;
  updatedDate?: Date;
  notes?: (typeof Note)[];
  quantity?: number;
  groceryListId: number;

  constructor(row: any) {
    this.id = row.id;
    this.name = row.name;
    this.price = row.price;
    this.link = row.link;
    this.approved = row.approved ?? undefined;
    this.createdDate = row.created_date ?? undefined;
    this.updatedDate = row.update_date ?? undefined;
    this.notes =
      (row.notes &&
        row.notes.map(
          (note: any) =>
            new Note({
              id: note.id,
              content: note.content,
            })
        )) ??
      undefined;
    this.quantity = row.quantity ?? undefined;
    this.groceryListId = row.grocery_list_id;
  }
}

export type FoodType = InstanceType<typeof Food>;
