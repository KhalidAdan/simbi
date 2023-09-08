import { ProductRepository } from "@/dao/product";
import { getUserFromToken } from "@/lib/server.utils";
import { ProductPledgeInput, ProductType } from "@/models/product";
import { QueryRunner } from "@/services/query-runner";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { productId, listId } = body;

  try {
    ProductPledgeInput.parse({
      ...body,
      id: productId,
    });
  } catch (error) {
    console.error("Product pledge input parse failed", error);
  }

  const user = await getUserFromToken();
  const productRepository = new ProductRepository(
    new QueryRunner<ProductType>()
  );
  await productRepository.pledgeProductOnList(user.id, productId, listId);

  return NextResponse.json({ status: 201 });
}
