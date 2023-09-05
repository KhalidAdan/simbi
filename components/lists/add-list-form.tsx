"use client";

import { useMutation } from "@/lib/hooks/use-mutation";
import { cn } from "@/lib/utils";
import { List } from "@/models/list";
import React from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { DatePicker } from "../ui/date-picker";
import { Icons } from "../ui/icons";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

type CreateListType = Pick<List, "name" | "type" | "is_public" | "description">;

export function AddListForm({
  recurring,
  tags,
}: {
  recurring?: boolean;
  tags?: { name: string; colour: string }[];
}) {
  const [isRecurring, setRecurring] = React.useState(recurring);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const { mutate, isLoading, isError, isSuccess, data, error } = useMutation<
    List,
    CreateListType
  >({
    mutationFn: async (variables) => {
      const response = await fetch("/api/list", {
        method: "POST",
        body: JSON.stringify(variables),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    },
    onMutate: (variables) => {
      // This function is called before the mutation starts.
      // You can use it to prepare the UI or store data for later use.
      return { variables };
    },
    onError: (error) => {
      // This function is called if the mutation fails.
      // You can use it to display an error message or log the error.
      console.error("onError", error);
    },
    onSuccess: (data, variables, context) => {
      // This function is called if the mutation succeeds.
      // You can use it to update the UI or store data for later use.
      console.log("onSuccess", data);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    mutate({
      name: formData.get("list_name") as string,
      description: formData.get("list_description") as string,
      type: formData.get("list_type") as string,
      is_public: formData.get("is_public") === "on",
    });
  };

  const handleChange = (e: any) => {
    setRecurring(e.target.value === "recurring");
  };

  return (
    <form name="add-list-form" className="space-y-5" onSubmit={handleSubmit}>
      <div className="space-y-1">
        <label htmlFor="list_name">Name</label>
        <Input id="list_name" name="list_name" required />
      </div>

      <div className="space-y-1">
        <label htmlFor="list_description">Description</label>
        <Textarea id="list_description" name="list_description" required />
      </div>

      {tags && (
        <div className="flex flex-wrap">
          {tags.map(({ name, colour }, i) => (
            <span
              key={i}
              role="button"
              className={cn(
                selectedTags.includes(name) && `bg-${colour}-300 `,
                "px-2 py-1 mr-1 mb-1 cursor-pointer rounded-lg border "
              )}
              onClick={() => {
                if (selectedTags.includes(name)) {
                  setSelectedTags((prev) => prev.filter((t) => t !== name));
                } else {
                  setSelectedTags((prev) => [...prev, name]);
                }
              }}
            >
              {name}{" "}
              {selectedTags.includes(name) ? (
                <Icons.close className="inline" />
              ) : (
                ""
              )}
            </span>
          ))}
        </div>
      )}

      <div className="space-y-1 pb-4">
        <label htmlFor="end_date" className="block">
          End date{" "}
        </label>
        <DatePicker />
      </div>

      <div className="space-y-1">
        <label htmlFor="list_type" className="sr-only">
          Type
        </label>
        <RadioGroup
          defaultValue={recurring ? "recurring" : "one_time"}
          name="list_type"
          required
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="one_time" id="r1" onClick={handleChange} />
            <label htmlFor="r1">One time list</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="recurring" id="r2" onClick={handleChange} />
            <label htmlFor="r2">Recurring list</label>
          </div>
        </RadioGroup>
      </div>

      {isRecurring && (
        <div className="space-y-1 pb-4">
          <label htmlFor="window">Recurring window</label>
          <Select name="window" defaultValue="thirty">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="seven" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="seven">every 7 days</SelectItem>
              <SelectItem value="fourteen">every 14 days</SelectItem>
              <SelectItem value="thirty">every 30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex items-center space-x-2">
        <Checkbox id="is_public" name="is_public" />
        <label htmlFor="is_public">Is this list public?</label>
      </div>

      <div className="flex justify-start">
        <Button type="submit" disabled={isLoading}>
          Save changes
        </Button>
      </div>
    </form>
  );
}
