"use client";
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
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { AddListForm } from "./add-list-form";

export const NewListDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <span className="border px-4 py-2 rounded leading-5 text-sm">
          Add List
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <CardTitle>Create a new list</CardTitle>
        </DialogHeader>
        <Card className="border-none">
          <CardHeader className="px-0 -mt-8">
            <CardDescription>
              On yeah, it&apos;s all coming together - Kronk
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 px-0 pb-0">
            <AddListForm recurring={false} />
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
