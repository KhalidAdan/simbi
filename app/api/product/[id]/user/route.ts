import { ProductRepository } from "@/dao/product";
import { getUserFromToken } from "@/lib/server.utils";
import { Product } from "@/models/product";
import { QueryRunner } from "@/services/query-runner";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { productId, listId } = await request.json();

  if (!productId) throw new Error("Missing product id");

  const user = await getUserFromToken();
  if (!user) throw new Error("User not found");

  const productRepository = new ProductRepository(new QueryRunner<Product>());
  console.log("user id", user?.id);
  console.log("product id", productId);
  console.log("list id", listId);
  await productRepository.pledgeProductOnList(user?.id, productId, listId);

  return NextResponse.json({ status: 201 });
}
