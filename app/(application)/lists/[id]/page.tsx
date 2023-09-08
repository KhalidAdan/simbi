import { AnimatedContainer } from "@/components/animated-container";
import { NewRecordDialogue } from "@/components/lists/new-record-dialog";
import { ShareList } from "@/components/lists/share-list";
import {
  TypographyH4,
  TypographyMuted,
  TypographyTitle,
} from "@/components/ui/typography";
import { ListRepository } from "@/dao/list";
import { ProductRepository } from "@/dao/product";
import { getUserFromToken } from "@/lib/server.utils";
import { ProductType } from "@/models/product";
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

function itemsPledged(products: ProductType[]) {
  // return the % of items pledged
  const pledged = products.filter((product) => product.claimed_by);
  return Math.round((pledged.length / products.length) * 100);
}

async function isListOwner(userId: string) {
  const user = await getUserFromToken();
  return user.id == userId;
}

export default async function ProductListPage({
  params,
}: {
  params: { id: string };
}) {
  const products = await getProductsByList(params.id);
  const list = await getListById(params.id);
  const isOwner = await isListOwner(list.user_id);
  return (
    <main>
      <AnimatedContainer>
        <TypographyTitle>{list.name}</TypographyTitle>
        <TypographyMuted>{list.description}</TypographyMuted>
        <section className="space-y-5 justify-start mt-6 pt-6 text-end">
          {isOwner && (
            <div className="space-x-2">
              <ShareList listId={params.id} />
              <NewRecordDialogue listId={params.id} />
            </div>
          )}
          <TableWrapper products={products} listId={params.id} isListOwner />
          <div className="flex justify-end items-end gap-x-2">
            <span>Pledged:</span>
            <TypographyH4>{itemsPledged(products)}%</TypographyH4>
            <span className="opacity-25">|</span>
            <span>Total:</span> <TypographyH4>{products[0].sum}</TypographyH4>
          </div>
        </section>
      </AnimatedContainer>
    </main>
  );
}
