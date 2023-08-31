export class ListProduct {
  id: string;
  list_id: string;
  product_id: string;
  quantity: number;
  created_at: Date;
  updated_at?: Date;

  constructor(row: any) {
    this.id = row.id;
    this.list_id = row.list_id;
    this.product_id = row.product_id;
    this.quantity = row.quantity;
    this.created_at = row.created_at;
    this.updated_at = row.updated_at ?? null;
  }
}

export type ListProductType = typeof ListProduct;
