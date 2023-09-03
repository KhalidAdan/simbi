import { ListRepository } from "@/dao/list";
import { UserRepository } from "@/dao/user";
import { QueryRunner } from "@/services/query-runner";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, type, is_public, description: list_description } = body;
  const cookieStore = cookies();
  const authCookie = cookieStore.get("next-auth.session-token");

  if (authCookie === undefined) throw new Error("Unauthorized");

  const authJwt = authCookie.value;
  const sessionToken = await decode({
    token: authJwt,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  const userRepository = new UserRepository(new QueryRunner());
  const user = await userRepository.readByEmail(sessionToken?.email!);

  const listRepository = new ListRepository(new QueryRunner());
  const list = await listRepository.create({
    name: name,
    type,
    is_public: is_public,
    description: list_description,
    userId: user?.id!,
  });

  return NextResponse.json(list, { status: 201 });
}
