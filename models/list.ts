import { Product } from "./product";
import { Tag } from "./tag";

export class List {
  id: number;
  name: string;
  description: string;
  type: string;
  is_public: boolean;
  created_at: Date;
  updated_at?: Date;
  products?: Product[];
  tags?: Tag[];

  constructor(row: any) {
    this.id = row.id;
    this.name = row.list_name;
    this.description = row.list_description;
    this.type = row.type;
    this.is_public = row.public;
    this.created_at = row.created_at;
    this.updated_at = row.updated_at ?? null;
    this.products = []; // change DAO's to generate models! no more results list
    this.tags = []; // change DAO's to generate models! no more results list
  }
}

export type ListType = typeof List;
