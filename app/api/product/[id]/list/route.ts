import { ListRepository } from "@/dao/list";

// delete a product from list
export async function DELETE(request: Request) {
  const { productId } = await request.json();

  const listRepository = new ListRepository();
  await listRepository.removeProductFromList(productId);
}
