import { getUserFromToken } from "@/lib/server.utils";

export async function POST(request: Request) {
  const { listId } = await request.json();
  const user = await getUserFromToken();
  if (!user) throw new Error("Unauthorized");

  console.log("Sharing list", listId, "by user", user.id);

  // TODO: create model / dao for invites
  // insert new invite, return uuid
  //
}
