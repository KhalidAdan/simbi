export class GroceryList {
  id: number;
  name: string;
  createdDate?: Date;
  updatedDate?: Date;
  purchased?: boolean;

  constructor(row: any) {
    this.id = row.id;
    this.name = row.name;
    this.createdDate = row.created_date;
    this.updatedDate = row.updated_date ?? undefined;
    this.purchased = row.purchased;
  }
}

export type GroceryListType = InstanceType<typeof GroceryList>;
