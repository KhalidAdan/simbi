import { ListRepository } from "@/dao/list";
import { QueryRunner } from "@/services/query-runner";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, type, is_public, description: list_description } = body;
  const listRepository = new ListRepository(new QueryRunner());
  const list = await listRepository.create({
    name: name,
    type,
    is_public,
    description: list_description,
  });

  return NextResponse.json(list, { status: 201 });
}
