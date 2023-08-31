import { DataTable } from "@/components/data-table";
import { AddProductDialogue } from "@/components/product/dialog";
import { TypographyMuted, TypographyTitle } from "@/components/ui/typography";

export default async function ListPage({
  title,
  description,
  type,
  products,
}: any) {
  return (
    <main>
      <TypographyTitle>Products</TypographyTitle>
      <TypographyMuted>Manage the products on your List!</TypographyMuted>
      <section className="space-y-5 justify-start mt-6 pt-6 text-end">
        <AddProductDialogue />
        <DataTable columns={[]} data={[]} />
      </section>
    </main>
  );
}
