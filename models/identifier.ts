import { z } from "zod";

export const identifier = z.object({
  id: z.coerce.number(),
});
