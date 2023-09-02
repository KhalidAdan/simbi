"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Product } from "@/models/product";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

export const TableWrapper: React.FC<{
  products: Product[];
  listId: string;
}> = ({ products, listId }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "product_name",
      header: "Name",
      enableColumnFilter: true,
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
      accessorKey: "claimedBy",
      header: "Pledged by",
      cell: ({ row }) => {
        const product = row.original;
        if (!product.claimedBy)
          return (
            <Button
              variant="link"
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
          );
        return <div>Pledged by {product.claimedBy}</div>;
      },
    },
  ];

  return <DataTable columns={columns} data={products} />;
};
