import { UserRepository } from "@/dao/user";
import { User } from "@/models/user";
import { QueryRunner } from "@/services/query-runner";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export const getUserFromToken = async (): Promise<User | undefined> => {
  const cookieStore = cookies();
  const authCookie = cookieStore.get("next-auth.session-token");

  if (authCookie === undefined) throw new Error("Unauthorized");

  const authJwt = authCookie.value;
  const sessionToken = await decode({
    token: authJwt,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  if (
    !sessionToken ||
    sessionToken.email === undefined ||
    sessionToken.email === null
  )
    throw new Error("Unauthorized");

  return new UserRepository(new QueryRunner()).readByEmail(sessionToken.email);
};
