import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@/lib/hooks/use-mutation";
import { FoodType } from "@/models/food";

type CreateFoodType = Pick<FoodType, "name" | "price" | "link" | "quantity">;
// TODO: need to add validation
// TODO: need to add error handling
// TODO: need to add success handling, maybe a toast?
// TODO: need to add loading state
// TODO: need to add a hidden input that gets the grocery list id from the url params, so we can use it in the context

export default async function AddNewFoodForm() {
  const { mutate, isLoading, isError, isSuccess, data, error } = useMutation<
    FoodType,
    CreateFoodType
  >({
    mutationFn: async (variables) => {
      const response = await fetch("/api/add-food", {
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
      console.error(error);
    },
    onSuccess: (data, variables, context) => {
      // This function is called if the mutation succeeds.
      // You can use it to update the UI or store data for later use.
      console.log(data);
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({
      name: event.currentTarget.food_name.value,
      price: event.currentTarget.price.value,
      quantity: event.currentTarget.quantity.value,
      link: event.currentTarget.link.value,
    });
  };

  return (
    <form
      name="add-food-form"
      className="w-full flex flex-col gap-y-4"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-y-1">
        <label htmlFor="food_name">Name</label>
        <Input id="food_name" name="food_name" />
      </div>
      <div className="flex flex-col gap-y-1">
        <label htmlFor="price">Price</label>
        <Input id="price" name="price" />
      </div>
      <div className="flex flex-col gap-y-1">
        <label htmlFor="quantity">Quantity</label>
        <Input id="quantity" name="quantity" type="number" />
      </div>
      <div className="flex flex-col gap-y-1">
        <label htmlFor="link">Link</label>
        <Input id="link" name="link" type="url" />
      </div>
      <Button type="submit" className="mt-4">
        Add
      </Button>
    </form>
  );
}
