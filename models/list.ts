import { Product } from "./product";

export class List {
  id: number;
  name: string;
  description: string;
  type: string;
  is_public: boolean;
  created_at: Date;
  updated_at?: Date;
  products?: Product[];

  constructor(row: any) {
    this.id = row.id;
    this.name = row.name;
    this.description = row.description;
    this.type = row.type;
    this.is_public = row.is_public;
    this.created_at = row.created_at;
    this.updated_at = row.updated_at ?? null;
    this.products = [];
    row.product_id && this.products.push(new Product(row.products));
  }
}

export type ListType = typeof List;
