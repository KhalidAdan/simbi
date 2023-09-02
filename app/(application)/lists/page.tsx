import ListEmptyState from "@/components/lists/list-empty-state";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { TypographyTitle } from "@/components/ui/typography";
import { ListRepository } from "@/dao/list";
import { UserRepository } from "@/dao/user";
import { List } from "@/models/list";
import { QueryRunner } from "@/services/query-runner";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getLists() {
  const cookieStore = cookies();
  const authCookie = cookieStore.get("next-auth.session-token");

  if (authCookie === undefined) redirect("/login");

  const authJwt = authCookie.value;
  const sessionToken = await decode({
    token: authJwt,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  const listRepository = new ListRepository(new QueryRunner());
  const userRepository = new UserRepository(new QueryRunner());

  const user = await userRepository.readByEmail(sessionToken?.email!);
  return await listRepository.readByUserId(user?.id!);
}

export default async function ListPage() {
  const lists: List[] = await getLists();
  return (
    <main>
      <div className="flex justify-between">
        <TypographyTitle>Your lists</TypographyTitle>
        <ModeToggle />
      </div>
      <section className="flex flex-col mt-16 gap-6">
        {lists.length ? (
          lists.map((list, i) => (
            <Link href={`/lists/${list.id}`} key={i}>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-end">
                    <CardTitle>{list.name}</CardTitle>
                    <Badge>{!list.is_public ? "Public" : "Invite only"}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex justify-between gap-10">
                  <CardDescription>{list.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <ListEmptyState />
        )}
      </section>
    </main>
  );
}
