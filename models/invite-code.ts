import { z } from "zod";

export const InviteCode = z.object({
  id: z.number(),
  code: z.string(),
  list_id: z.coerce.number(),
  sender_user_id: z.coerce.number(),
  created_at: z.date(),
  expires_at: z.date(),
});

export const InviteCodeInput = InviteCode.pick({
  list_id: true,
  sender_user_id: true,
});

export type InviteCodeType = z.infer<typeof InviteCode>;
