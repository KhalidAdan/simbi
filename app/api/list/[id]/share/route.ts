import { InviteCodeRepository } from "@/dao/invite-code";
import { getUserFromToken } from "@/lib/server.utils";
import { InviteCodeInput } from "@/models/invite-code";
import { QueryRunner } from "@/services/query-runner";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { list_id } = await request.json();
  const user = await getUserFromToken();

  try {
    InviteCodeInput.parse({
      list_id,
      sender_user_id: user.id,
    });
  } catch (error) {
    console.error("Invite code parse error", error);
    return NextResponse.error();
  }

  try {
    const inviteRepository = new InviteCodeRepository(new QueryRunner());
    const invite = await inviteRepository.createOrReturnExisting({
      list_id,
      sender_user_id: Number(user.id),
    });

    return NextResponse.json(invite, { status: 201 });
  } catch (error) {
    console.error("Invite code create/fetch error", error);
    return NextResponse.error();
  }
}

export async function PUT(request: Request) {
  const { inviteCodeId } = await request.json();
  const user = await getUserFromToken();

  const inviteRepository = new InviteCodeRepository(new QueryRunner());
}
