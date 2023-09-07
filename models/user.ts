import { z } from "zod";

export const User = z.object({
  id: z.number(),
  name: z.string().optional(),
  email: z.string(),
  emailVerified: z.date().optional(),
  image: z.string().optional(),
  createdDate: z.date().optional(),
  updateDate: z.date().optional(),
});

export type UserType = z.infer<typeof User>;
