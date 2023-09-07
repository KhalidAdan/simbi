import { z } from "zod";

export const Product = z.object({
  id: z.number(),
  product_name: z.string(),
  product_description: z.string(),
  price: z.string(),
  url: z.string().optional(),
  list_id: z.coerce.number().optional(),
  created_at: z.date().optional(),
  updated_at: z.date().nullable().optional(),
  claimedBy: z.string().optional(),
});

export const ProductInput = Product.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export type ProductType = z.infer<typeof Product>;
