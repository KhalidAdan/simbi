import AddFood from "@/components/food/add-food";
import { columns } from "@/components/food/columns";
import { DataTable } from "@/components/food/data-table";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { FoodRepository } from "@/dao/food";
import { Food } from "@/models/food";
import { QueryRunner } from "@/services/query-runner";

async function getAllFood() {
  const queryRunner = new QueryRunner();
  const foodRepostory = new FoodRepository(queryRunner);
  return foodRepostory.read();
}

async function getApprovedFoods() {
  "use server";
  const queryRunner = new QueryRunner();
  const foodRepostory = new FoodRepository(queryRunner);
  return foodRepostory.readApprovedFoods();
}

export default async function FoodHomepage() {
  const food = await getAllFood();
  const approvedFoods = await getApprovedFoods();

  const formatPricesToNumbers = (price: string) => {
    return parseFloat(price.slice(1));
  };

  const sumTotalofGroceries = (arr: Food[]) =>
    arr.reduce((acc, food) => acc + formatPricesToNumbers(food.price), 0);

  return (
    <main>
      <nav className="pb-12">
        <div className="flex justify-between items-end py-4">
          <h1 className="text-5xl font-semibold">Grocery List</h1>
          <ModeToggle />
        </div>
      </nav>
      <section className="mb-6">
        <AddFood />
      </section>
      <section className="mb-24">
        {/* Add to table, page nav maybe? */}
        {/* Table for groceries */}
        <DataTable columns={columns} data={food} />
        <div className="text-right semibold mt-2">
          Total:{" "}
          {Intl.NumberFormat("en-CA", {
            style: "currency",
            currency: "CAD",
          }).format(sumTotalofGroceries(food))}
        </div>
      </section>
      <section className="mb-6">
        <h2 className="text-5xl font-semibold mb-6">
          This week&apos;s approved grocery list
        </h2>
        <DataTable columns={columns} data={approvedFoods} />
        {approvedFoods && (
          <div className="text-right mt-2">
            Total:
            {Intl.NumberFormat("en-CA", {
              style: "currency",
              currency: "CAD",
            }).format(sumTotalofGroceries(approvedFoods))}
          </div>
        )}
      </section>
    </main>
  );
}
