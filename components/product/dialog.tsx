"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { AddListForm } from "./add-list-form";
import { AddProductForm } from "./add-product-form";

export function AddProductDialogue() {
  return (
    <Dialog>
      <DialogTrigger>
        <span className="border px-4 py-2 rounded leading-5 text-sm">
          Add Product
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Record</DialogTitle>
          <DialogDescription>
            Add a new product to your list, or create a new list!
          </DialogDescription>
        </DialogHeader>
        <div>
          <Tabs defaultValue="add-product" className="">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="add-product">Product</TabsTrigger>
              <TabsTrigger value="add-list">List</TabsTrigger>
            </TabsList>
            <TabsContent value="add-product">
              <Card>
                <CardHeader>
                  <CardTitle>Add Product</CardTitle>
                  <CardDescription>
                    I&apos;ve always wanted new stuff, and this is how you get
                    new stuff! - Sokka of the water tribe, probably
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AddProductForm />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="add-list">
              <Card>
                <CardHeader>
                  <CardTitle>Create a new list</CardTitle>
                  <CardDescription>
                    On yeah, it&apos;s all coming together - Kronk
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <AddListForm />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
