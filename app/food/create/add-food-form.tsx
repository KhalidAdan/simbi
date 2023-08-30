import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FoodRepository } from "@/dao/food";
import { QueryRunner } from "@/services/query-runner";
import { redirect } from "next/navigation";

export default async function AddNewFoodForm() {
  async function addFoodToDb(formData: FormData) {
    "use server";
    const queryRunner = new QueryRunner();
    const foodRepostory = new FoodRepository(queryRunner);
    await foodRepostory.create({
      name: formData.get("name") as string,
      price: formData.get("price") as string,
      quantity: Number(formData.get("quantity")),
      link: formData.get("link") as string,
      groceryListId: 1,
    });
    redirect("/food");
  }

  return (
    <form
      name="add-food-form"
      className="w-full flex flex-col gap-y-4"
      action={addFoodToDb}
    >
      <div className="flex flex-col gap-y-1">
        <label htmlFor="name">Name</label>
        <Input id="name" name="name" />
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
