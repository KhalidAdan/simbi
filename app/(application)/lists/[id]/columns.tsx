"use client";

import { DataTable } from "@/components/data-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { ProductType } from "@/models/product";
import { ColumnDef } from "@tanstack/react-table";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import React from "react";

export const TableWrapper: React.FC<{
  products: ProductType[];
  listId: string;
  isListOwner?: boolean;
}> = ({ products, listId, isListOwner = false }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handlePledge = async (product: ProductType) => {
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
      revalidatePath(`/lists/${listId}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (product: ProductType) => {
    try {
      setIsLoading(true);
      await fetch(`/api/product/${product.id}/list`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
        }),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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
      header: () => <div className="my-2 text-center">Pledged by</div>,
      cell: ({ row }) => {
        const product = row.original;

        if (!product.claimed_by)
          return (
            <Button
              variant="secondary"
              disabled={isLoading}
              onClick={() => handlePledge(product)}
            >
              {isLoading && (
                <Icons.loading className="mr-2 h-4 w-4 animate-spin" />
              )}
              Pledge
            </Button>
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

  isListOwner &&
    columns.push({
      accessorKey: "delete",
      header: () => <div className="my-2 text-center">Remove Item</div>,
      cell: ({ row }) => {
        const product = row.original;

        return (
          <Button
            variant="secondary"
            disabled={isLoading}
            onClick={() => handleDelete(product)}
          >
            {isLoading && (
              <Icons.loading className="mr-2 h-4 w-4 animate-spin" />
            )}
            Delete
          </Button>
        );
      },
    });

  return <DataTable columns={columns} data={products} />;
};
