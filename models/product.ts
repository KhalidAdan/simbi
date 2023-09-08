import { z } from "zod";
import { User } from "./user";

export const Product = z.object({
  id: z.number(),
  product_name: z.string(),
  product_description: z.string(),
  price: z.string(),
  url: z.string().optional(),
  list_id: z.coerce.number().optional(),
  created_at: z.date().optional(),
  updated_at: z.date().nullable().optional(),
  claimed_by: z.number().nullable().optional(),
  user: User.optional().nullish(),
  sum: z.string().optional(), // sum total of all products in a list
});

export const ProductInput = Product.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const ProductPledgeInput = Product.pick({
  id: true,
  list_id: true,
  user_id: true,
});

export type ProductType = z.infer<typeof Product>;
