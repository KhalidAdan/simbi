import { z } from "zod";

export const Tag = z.object({
  id: z.number(),
  name: z.string(),
  colour: z.string(),
});

export type TagType = z.infer<typeof Tag>;
