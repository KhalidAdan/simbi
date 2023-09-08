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
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

export function ShareList({ listId }: { listId: string }) {
  const { toast } = useToast();
  const [uuid, setUuid] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const data = await fetch(`/api/list/${listId}/share`, {
        method: "POST",
        body: JSON.stringify({ list_id: listId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { code: uuid } = await data.json();
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
          Invite
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
          <Input id="share_code" name="share_code" value={uuid} disabled />
          <Button
            variant="secondary"
            onClick={() => {
              //copy the value of uuid into the clipboard
              navigator.clipboard.writeText(
                "https://localhost:3000/register?invite_code=" + uuid
              );
              toast({
                title: "Copied invite code to link to clipboard",
              });
            }}
          >
            Copy
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
