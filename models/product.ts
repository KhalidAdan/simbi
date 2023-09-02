export class Product {
  id: number;
  product_name: string;
  product_description: string;
  price: number;
  quantity: number;
  list_id?: number;
  created_at: Date;
  updated_at?: Date;
  claimedBy?: string;

  constructor(row: any) {
    this.id = row.product_id;
    this.product_name = row.product_name;
    this.product_description = row.product_description;
    this.price = row.price;
    this.quantity = row.quantity;
    this.list_id = row.list_id ?? null;
    this.created_at = row.created_at;
    this.updated_at = row.updated_at ?? null;
    this.claimedBy = row.claimed_by ?? null;
  }
}

export type ProductType = typeof Product;
