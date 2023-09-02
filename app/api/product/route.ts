import { ProductRepository } from "@/dao/product";
import { Product } from "@/models/product";
import { QueryRunner } from "@/services/query-runner";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { product_name, price, quantity, product_description, list_id } = body;

  const productRepository = new ProductRepository(new QueryRunner<Product>());
  const product = await productRepository.addProductToList(
    new Product({
      product_name,
      price,
      product_description,
    }),
    list_id,
    quantity
  );

  return NextResponse.json(product, { status: 201 });
}
