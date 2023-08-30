"use client";

import { FoodType } from "@/models/food";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Button } from "../ui/button";

export const columns: ColumnDef<FoodType>[] = [
  {
    accessorKey: "name",
    header: "Name",
    enableColumnFilter: true,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">{row.getValue("price")}</div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "link",
    header: "Link",
    cell: ({ row }) => {
      return (
        <Link href={`${row.getValue("link")}`} className="underline">
          Lookup item
        </Link>
      );
    },
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => {
      return (
        <Link href={`/notes/food/${row.getValue("id")}`}>
          <Button variant="outline">Notes</Button>
        </Link>
      );
    },
  },
];
