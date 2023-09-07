import { z } from "zod";
import { Product } from "./product";
import { Tag } from "./tag";

export const List = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  type: z.string(),
  is_public: z.boolean().default(true),
  created_at: z.date(),
  updated_at: z.date().nullable().optional(),
  end_date: z.date(),
  products: z.array(Product).optional(),
  tags: z.array(Tag).optional(),
});

export type ListType = z.infer<typeof List>;
