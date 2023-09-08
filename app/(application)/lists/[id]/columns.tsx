"use client";

import { DataTable } from "@/components/data-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { ProductType } from "@/models/product";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import React from "react";

export const TableWrapper: React.FC<{
  products: ProductType[];
  listId: string;
}> = ({ products, listId }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const columns: ColumnDef<ProductType>[] = [
    {
      accessorKey: "product_name",
      header: "Name",
      enableColumnFilter: true,
      cell: ({ row }) => {
        const product = row.original;
        return product.url ? (
          <Link href={product.url} className="hover:underline" target="_blank">
            {product.product_name}
          </Link>
        ) : (
          <span>{product.product_name}</span>
        );
      },
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
    },
    {
      accessorKey: "product_description",
      header: "Description",
    },
    {
      accessorKey: "claimed_by",
      header: "Pledged by",
      cell: ({ row }) => {
        const product = row.original;
        if (!product.claimed_by)
          return (
            <div className="w-full flex justify-center">
              <Button
                variant="secondary"
                disabled={isLoading}
                onClick={async () => {
                  try {
                    setIsLoading(true);
                    await fetch(`/api/product/${product.id}/user`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        productId: product.id,
                        listId,
                      }),
                    });
                  } catch (error) {
                    console.error(error);
                  } finally {
                    setIsLoading(false);
                  }
                }}
              >
                {isLoading && (
                  <Icons.loading className="mr-2 h-4 w-4 animate-spin" />
                )}
                Pledge
              </Button>
            </div>
          );
        return (
          <div className="w-full flex justify-center">
            <Avatar className="text-center">
              <AvatarImage src={product.user?.image} alt={product.user?.name} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={products} />;
};
