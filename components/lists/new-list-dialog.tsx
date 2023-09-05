"use client";
import { Tag } from "@/models/tag";
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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { AddListForm } from "./add-list-form";

export const NewListDialog = ({ tags }: { tags?: Tag[] }) => {
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
            <AddListForm recurring={false} tags={tags} />
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
