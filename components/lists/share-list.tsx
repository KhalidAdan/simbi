"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Icons } from "../ui/icons";
import { Input } from "../ui/input";

export function ShareList({ listId }: { listId: string }) {
  const [uuid, setUuid] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const data = await fetch(`/api/list/${listId}/share`, {
        method: "POST",
        body: JSON.stringify({ listId: listId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { uuid } = await data.json();
      setUuid(uuid);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="px-4 py-2 self-end"
          onClick={handleClick}
          disabled={isLoading}
        >
          {isLoading && <Icons.spinner className="animate-spin" />} Invite
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite others to your list</DialogTitle>
          <DialogDescription>
            Anyone with this link can view and participate in your list. Your
            link expires in 7 days.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-1 mt-4">
          <Input id="share_code" name="share_code" />
          <Button variant="secondary">Copy</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
