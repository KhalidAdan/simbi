import { Title } from "@/components/content-title";
import { AddListForm } from "@/components/lists/add-list-form";
import { TypographyLead } from "@/components/ui/typography";
import { NextSearchParams } from "@/lib/types";

export default async function ListPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: NextSearchParams;
}) {
  const template = searchParams.template;
  return (
    <main>
      <Title>Add new list</Title>
      <TypographyLead>
        Go ahead and create a new list. You can choose to make it public or
        invite only, when it should stop accepting new pledges and if it is a
        recurring list.
      </TypographyLead>
      <section className="flex flex-col mt-16 gap-6">
        <AddListForm recurring={template === "recurring"} />
      </section>
    </main>
  );
}
