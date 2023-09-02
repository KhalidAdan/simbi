import { NewRecordDialogue } from "@/components/lists/new-record-dialog";
import { TypographyMuted, TypographyTitle } from "@/components/ui/typography";
import { ListRepository } from "@/dao/list";
import { ProductRepository } from "@/dao/product";
import { QueryRunner } from "@/services/query-runner";
import { TableWrapper } from "./columns";

async function getProductsByList(listId: string) {
  const productRepository = new ProductRepository(new QueryRunner());
  const products = await productRepository.readProductsByListId(listId);
  return products;
}

async function getListById(listId: string) {
  const listRepository = new ListRepository(new QueryRunner());
  const list = await listRepository.readById(listId);
  return list;
}

export default async function ProductListPage({
  params,
}: {
  params: { id: string };
}) {
  const products = await getProductsByList(params.id);
  const list = await getListById(params.id);
  return (
    <main>
      <TypographyTitle>{list.name}</TypographyTitle>
      <TypographyMuted>{list.description}</TypographyMuted>
      <section className="space-y-5 justify-start mt-6 pt-6 text-end">
        <NewRecordDialogue listId={params.id} />
        <TableWrapper products={products} listId={params.id} />
      </section>
      <section></section>
    </main>
  );
}
