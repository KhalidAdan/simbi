import { columns } from "@/components/food/columns";
import { DataTable } from "@/components/food/data-table";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { FoodRepository } from "@/dao/food";
import { QueryRunner } from "@/services/query-runner";
import Link from "next/link";

async function getApprovedFoods() {
  "use server";
  const queryRunner = new QueryRunner();
  const foodRepostory = new FoodRepository(queryRunner);
  return foodRepostory.readApprovedFoods();
}

export default async function Food() {
  const food = await getApprovedFoods();
  return (
    <main>
      <nav className="pb-12">
        <div className="flex justify-between items-end py-4">
          <h1 className="text-5xl font-semibold">Groceries</h1>
          <ModeToggle />
        </div>
      </nav>
      <section className="mb-6">
        <Button>
          <Link href="/food">Go to grocery list</Link>
        </Button>
      </section>
      <section>
        {/* Add to table, page nav maybe? */}
        {/* Table for groceries */}
        <DataTable columns={columns} data={food} />
      </section>
    </main>
  );
}
