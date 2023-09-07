import { ProductRepository } from "@/dao/product";
import { ProductInput, ProductType } from "@/models/product";
import { QueryRunner } from "@/services/query-runner";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { product_name, price, quantity, url, product_description, list_id } =
    body;

  try {
    ProductInput.parse(body);
  } catch (error) {
    console.log(
      "Data received from client for product creation is invalid: ",
      error
    );
  }

  const productRepository = new ProductRepository(
    new QueryRunner<ProductType>()
  );
  const product = await productRepository.addProductToList(
    {
      product_name,
      price,
      product_description,
      url,
      list_id: list_id,
    },
    list_id,
    quantity
  );

  return NextResponse.json(product, { status: 201 });
}
