import { AnimatedContainer } from "@/components/animated-container";
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
import { TagRepository } from "@/dao/tag";
import { getUserFromToken } from "@/lib/server.utils";
import { ListType } from "@/models/list";
import { TagType } from "@/models/tag";
import { QueryRunner } from "@/services/query-runner";
import Link from "next/link";

async function getLists() {
  const user = await getUserFromToken();
  const listRepository = new ListRepository(new QueryRunner());
  return await listRepository.readByUserId(user.id);
}

async function getTags() {
  const tagRepository = new TagRepository(new QueryRunner());
  return await tagRepository.read();
}

export default async function ListPage() {
  const lists: ListType[] = await getLists();
  const tags: TagType[] = await getTags();
  return (
    <main>
      <AnimatedContainer>
        <div className="space-y-4">
          <Title>My lists</Title>
          <section className="text-end mt-16 min-h-[24px]">
            {lists.length !== 0 && <NewListDialog tags={tags} />}
          </section>
          <section className="flex flex-col gap-6">
            {lists.length ? (
              lists.map((list, i) => (
                <Link href={`/lists/${list.id}`} key={i}>
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-end">
                        <CardTitle>{list.name}</CardTitle>
                        <Badge>
                          {list.is_public ? "Public" : "Invite only"}
                        </Badge>
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
        </div>
      </AnimatedContainer>
    </main>
  );
}
