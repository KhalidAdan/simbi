"use client";

import { useMutation } from "@/lib/hooks/use-mutation";
import { ListProduct } from "@/models/list-product";
import { Product } from "@/models/product";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type CreateProductType = Pick<
  Product,
  "product_name" | "price" | "product_description" | "url"
> &
  Pick<ListProduct, "list_id" | "quantity">;

export function AddProductForm({ listId }: { listId: string }) {
  const router = useRouter();
  const { mutate, isLoading, isError, isSuccess, data, error } = useMutation<
    Product,
    CreateProductType
  >({
    mutationFn: async (variables) => {
      const response = await fetch("/api/product", {
        method: "POST",
        body: JSON.stringify(variables),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    },
    onMutate: (variables) => {
      // This function is called before the mutation starts.
      // You can use it to prepare the UI or store data for later use.
      return { variables };
    },
    onError: (error) => {
      // This function is called if the mutation fails.
      // You can use it to display an error message or log the error.
      console.error("onError", error);
    },
    onSuccess: (data, variables, context) => {
      // This function is called if the mutation succeeds.
      // You can use it to update the UI or store data for later use.
      console.log("onSuccess", data);
      router.push(`/lists/${listId}`);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      product_name: e.currentTarget.product_name.value,
      url: e.currentTarget.product_url.value,
      price: e.currentTarget.price.value,
      quantity: e.currentTarget.quantity.value,
      product_description: e.currentTarget.product_description.value,
      list_id: listId,
    });
  };

  return (
    <form
      action="add-product-form"
      className="space-y-4"
      onSubmit={handleSubmit}
    >
      <div className="space-y-1">
        <label htmlFor="product_name">Name</label>
        <Input id="product_name" name="product_name" required />
      </div>
      <div className="space-y-1">
        <label htmlFor="product_url">Link</label>
        <Input id="product_url" name="product_url" required />
      </div>
      <div className="space-y-1">
        <label htmlFor="price">Price</label>
        <Input id="price" name="price" required />
      </div>
      <div className="space-y-1">
        <label htmlFor="quantity">Quantity</label>
        <Input id="quantity" name="quantity" type="number" required />
      </div>
      <div className="space-y-1">
        <label htmlFor="product_description">Description</label>
        <Textarea
          id="product_description"
          name="product_description"
          required
        />
      </div>
      <div className="flex justify-start">
        <Button type="submit" disabled={isLoading}>
          Save changes
        </Button>
      </div>
    </form>
  );
}
