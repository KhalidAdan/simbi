import { z } from "zod";

export const InviteCode = z.object({
  id: z.number(),
  code: z.string(),
  list_id: z.number(),
  sender_user_id: z.number(),
  created_at: z.date(),
  expires_at: z.date(),
});

export const InviteCodeInput = InviteCode.pick({
  list_id: true,
  sender_user_id: true,
});

export type InviteCodeType = z.infer<typeof InviteCode>;
