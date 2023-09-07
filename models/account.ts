import { z } from "zod";

export const Account = z.object({
  id: z.number().optional(),
  userId: z.number(),
  provider: z.string().optional(),
  providerAccountId: z.string().optional(),
  refreshToken: z.string().optional(),
  accessToken: z.string().optional(),
  expiresAt: z.date().optional(),
  tokenType: z.string().optional(),
  scope: z.string().optional(),
  idToken: z.string().optional(),
  sessionState: z.string().optional(),
  createdDate: z.date().optional(),
  updatedDate: z.date().optional(),
});

export type AccountType = z.infer<typeof Account>;
