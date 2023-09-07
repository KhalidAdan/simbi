import { z } from "zod";

export const ListProduct = z.object({
  id: z.number(),
  list_id: z.coerce.number(),
  product_id: z.coerce.number(),
  quantity: z.number(),
  created_at: z.date(),
  updated_at: z.date().optional(),
});

export type ListProductType = z.infer<typeof ListProduct>;
