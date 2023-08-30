import Link from "next/link";
import AddNewFoodForm from "./add-food-form";

export default function AddFood() {
  return (
    <>
      <Link href="/food" className="flex gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        Go back to grocery list
      </Link>
      <div className="my-6">
        <h1 className="text-5xl font-semibold mb-16">
          Add Food to grocery list
        </h1>
        <AddNewFoodForm />
      </div>
    </>
  );
}
