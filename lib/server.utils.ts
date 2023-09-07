import { UserRepository } from "@/dao/user";
import { UserType } from "@/models/user";
import { QueryRunner } from "@/services/query-runner";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export const getUserFromToken = async (): Promise<
  Omit<UserType, "id"> & { id: string }
> => {
  const cookieStore = cookies();
  const authCookie = cookieStore.get("next-auth.session-token");

  if (authCookie === undefined) throw new Error("Unauthorized");

  const authJwt = authCookie.value;
  const sessionToken = await decode({
    token: authJwt,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (
    !sessionToken ||
    sessionToken.email === undefined ||
    sessionToken.email === null
  )
    throw new Error("Unauthorized");

  const userRepository = new UserRepository(new QueryRunner());
  const loggedInUser = await userRepository.readByEmail(sessionToken.email);

  if (loggedInUser === undefined) throw new Error("Unauthorized");

  return {
    ...loggedInUser,
    id: String(loggedInUser.id),
  };
};
