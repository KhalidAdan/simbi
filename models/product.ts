export class Product {
  id: number;
  product_name: string;
  product_description: string;
  price: number;
  list_id?: number;
  created_at: Date;
  updated_at?: Date;

  constructor(row: any) {
    this.id = row.id;
    this.product_name = row.product_name;
    this.product_description = row.product_description;
    this.price = row.price;
    this.list_id = row.list_id ?? null;
    this.created_at = row.created_at;
    this.updated_at = row.updated_at ?? null;
  }
}

export type ProductType = typeof Product;
