import { Title } from "@/components/content-title";
import ListEmptyState from "@/components/lists/list-empty-state";
import { NewListDialog } from "@/components/lists/new-list-dialog";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ListRepository } from "@/dao/list";
import { getUserFromToken } from "@/lib/server.utils";
import { List } from "@/models/list";
import { QueryRunner } from "@/services/query-runner";
import Link from "next/link";

async function getLists() {
  const user = await getUserFromToken();

  if (!user) throw new Error("User not found");

  const listRepository = new ListRepository(new QueryRunner());
  return await listRepository.readByUserId(user.id);
}

export default async function ListPage() {
  const lists: List[] = await getLists();
  return (
    <main className="space-y-4">
      <Title>My lists</Title>
      <section className="text-end mt-16">
        <NewListDialog />
      </section>
      <section className="flex flex-col gap-6">
        {lists.length ? (
          lists.map((list, i) => (
            <Link href={`/lists/${list.id}`} key={i}>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-end">
                    <CardTitle>{list.name}</CardTitle>
                    <Badge>{list.is_public ? "Public" : "Invite only"}</Badge>
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
