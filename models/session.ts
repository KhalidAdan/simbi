import { z } from "zod";
import { User } from "./user";

export const Session = z.object({
  id: z.number().optional(),
  user: User,
  expires: z.date().optional(),
  sessionToken: z.string().optional(),
});

export type SessionType = z.infer<typeof Session>;
