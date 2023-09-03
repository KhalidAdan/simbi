import { User } from "./user";

export class Product {
  id: number;
  product_name: string;
  product_description: string;
  url?: string;
  price: number;
  quantity: number;
  list_id?: number;
  created_at: Date;
  updated_at?: Date;
  claimedBy?: string;
  user?: User;

  constructor(row: any) {
    this.id = row.id;
    this.product_name = row.product_name;
    this.product_description = row.product_description;
    this.url = row.product_url ?? null;
    this.price = row.price;
    this.quantity = row.quantity;
    this.list_id = row.list_id ?? null;
    this.created_at = row.created_at;
    this.updated_at = row.updated_at ?? null;
    this.claimedBy = row.claimed_by ?? null;
    this.user = new User(row);
  }
}

export type ProductType = typeof Product;
