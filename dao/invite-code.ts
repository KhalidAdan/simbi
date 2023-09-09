import { InviteCode, InviteCodeType } from "@/models/invite-code";
import { QueryRunner } from "@/services/query-runner";
import { Repository } from "./types";

export class InviteCodeRepository
  implements Repository<InviteCodeType, string>
{
  constructor(private qR: QueryRunner<InviteCodeType>) {}

  async read() {
    const result = await this.qR.execute("SELECT * FROM invite_code");
    const inviteCodes: InviteCodeType[] = result.map((row: any) =>
      InviteCode.parse(row)
    );
    return inviteCodes;
  }

  async readById(id: string): Promise<InviteCodeType | undefined> {
    const [result] = await this.qR.execute(
      "SELECT * FROM invite_code WHERE id = $1",
      [id]
    );
    if (!result) {
      return undefined;
    }
    return InviteCode.parse(result);
  }

  async readByCode(code: string): Promise<InviteCodeType | undefined> {
    const [result] = await this.qR.execute(
      "SELECT * FROM invite_code WHERE code = $1",
      [code]
    );
    if (!result) {
      return undefined;
    }
    return InviteCode.parse(result);
  }

  async create(
    entity: Pick<InviteCodeType, "list_id" | "sender_user_id">
  ): Promise<InviteCodeType> {
    const [result] = await this.qR.execute(
      `INSERT INTO invite_code 
        (
         list_id, 
         sender_user_id
        )
       VALUES ($1, $2) RETURNING *`,
      [entity.list_id, entity.sender_user_id]
    );
    return InviteCode.parse(result);
  }

  async createOrReturnExisting(
    entity: Pick<InviteCodeType, "list_id" | "sender_user_id">
  ): Promise<InviteCodeType> {
    // check if there is an existing invite code for this user on this list
    const [result] = await this.qR.execute(
      `SELECT * FROM invite_code
        WHERE list_id = $1
        AND sender_user_id = $2
        AND expires_at > NOW()`,
      [entity.list_id, entity.sender_user_id]
    );
    if (result) {
      return InviteCode.parse(result);
    }
    // otherwise create a new one
    return this.create(entity);
  }

  async trackInviteCodeUse(
    user_id: string,
    invite_code_id: string
  ): Promise<InviteCodeType> {
    const [result] = await this.qR.execute(
      `INSERT INTO user_signup_codes (user_id, invite_code_id) VALUES ($1, $2) RETURNING *`,
      [user_id, invite_code_id]
    );
    return InviteCode.parse(result);
  }

  async update(entity: InviteCodeType): Promise<InviteCodeType> {
    const [inviteCode] = await this.qR.execute(
      `UPDATE invite_code 
        SET code = $2, 
            list_id = $3, 
            user_id = $4
        WHERE id = $1
        RETURNING *`,
      [entity.code, entity.list_id, entity.sender_user_id]
    );
    return inviteCode;
  }

  async delete(id: string): Promise<InviteCodeType> {
    const [inviteCode] = await this.qR.execute(
      `DELETE FROM invite_code 
        WHERE id = $1`,
      [id]
    );
    return inviteCode;
  }
}
