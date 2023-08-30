export class GroceryList {
  id: number;
  name: string;
  createdDate?: Date;
  updatedDate?: Date;

  constructor(row: any) {
    this.id = row.id;
    this.name = row.name;
    this.createdDate = row.created_date ?? undefined;
    this.updatedDate = row.update_date ?? undefined;
  }
}

export type GroceryListType = InstanceType<typeof GroceryList>;
