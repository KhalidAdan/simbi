import { ListRepository } from "@/dao/list";
import { getUserFromToken } from "@/lib/server.utils";
import { ListInput } from "@/models/list";
import { QueryRunner } from "@/services/query-runner";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    ListInput.parse(body);
  } catch (error) {
    console.error("List input parse failed", error);
  }

  const {
    name,
    type,
    is_public,
    description: list_description,
    end_date,
  } = body;

  const user = await getUserFromToken();

  const listRepository = new ListRepository(new QueryRunner());
  const list = await listRepository.create({
    name: name,
    type,
    is_public: is_public,
    description: list_description,
    user_id: user.id,
    end_date: new Date(
      new Date(end_date).toLocaleString("en-US", {
        timeZone: "America/New_York",
      })
    ),
  });

  return NextResponse.json(list, { status: 201 });
}
