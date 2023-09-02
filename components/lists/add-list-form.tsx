import { useMutation } from "@/lib/hooks/use-mutation";
import { List } from "@/models/list";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Textarea } from "../ui/textarea";

type CreateListType = Pick<List, "name" | "type" | "is_public" | "description">;

export function AddListForm() {
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

  return (
    <form name="add-list-form" className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-1">
        <label htmlFor="list_name">Name</label>
        <Input id="list_name" name="list_name" required />
      </div>
      <div className="space-y-1">
        <label htmlFor="list_description">Description</label>
        <Textarea id="list_description" name="list_description" required />
      </div>
      <div className="space-y-1">
        <label htmlFor="list_type" className="sr-only">
          Type
        </label>
        <RadioGroup defaultValue="one_time" name="list_type" required>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="one_time" id="r1" />
            <label htmlFor="r1">One time list</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="recurring" id="r2" />
            <label htmlFor="r2">Recurring list</label>
          </div>
        </RadioGroup>
      </div>
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
