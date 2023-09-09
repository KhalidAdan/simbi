import { z } from "zod";
import { Product } from "./product";
import { Tag } from "./tag";

export const List = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  type: z.string(),
  is_public: z.boolean().default(true),
  user_id: z.coerce.string(), // owner of the list
  created_at: z.date(),
  updated_at: z.date().nullable().optional(),
  end_date: z.date(),
  products: z.array(Product).optional(),
  tags: z.array(Tag).optional(),
});

export const ListInput = List.omit({
  id: true,
  created_at: true,
  updated_at: true,
  products: true,
  tags: true,
});

export type ListType = z.infer<typeof List>;
