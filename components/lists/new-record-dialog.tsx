"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";
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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { AddListForm } from "./add-list-form";
import { AddProductForm } from "./add-product-form";

export function NewRecordDialogue({ listId }: { listId: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="px-4 py-2 self-end">
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Record</DialogTitle>
          <DialogDescription>
            Add a new product to your current list, or create a new list if
            you&apos;re feeling spicy.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Tabs defaultValue="add-product" className="">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="add-product">Product</TabsTrigger>
              <TabsTrigger value="add-list">List</TabsTrigger>
            </TabsList>
            <TabsContent value="add-product">
              <Card className="border-none">
                <CardHeader className="px-0">
                  <CardTitle>Add Product</CardTitle>
                  <CardDescription>
                    I&apos;ve always wanted new stuff, and this is how you get
                    new stuff!{" "}
                    <span className="block">
                      - Sokka of the water tribe, probably
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <AddProductForm listId={listId} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="add-list">
              <Card className="border-none">
                <CardHeader className="px-0">
                  <CardTitle>Create a new list</CardTitle>
                  <CardDescription>
                    <HoverCard>
                      <HoverCardTrigger>
                        On yeah, it&apos;s all coming together. - Kronk
                      </HoverCardTrigger>
                      <HoverCardContent>
                        <img
                          alt="Kronk, being kronk!"
                          src="https://media.giphy.com/media/KEYEpIngcmXlHetDqz/giphy.gif"
                        />
                      </HoverCardContent>
                    </HoverCard>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 px-0 pb-0">
                  <AddListForm recurring={false} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
