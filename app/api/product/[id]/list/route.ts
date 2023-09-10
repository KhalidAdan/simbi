import { ListRepository } from "@/dao/list";
import { QueryRunner } from "@/services/query-runner";

// delete a product from list
export async function DELETE(request: Request) {
  const { productId } = await request.json();

  const listRepository = new ListRepository(new QueryRunner());
  await listRepository.removeProductFromList(productId);
}
