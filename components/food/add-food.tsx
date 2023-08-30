"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function AddFood() {
  const router = useRouter();
  return <Button onClick={() => router.push("/food/create")}>Add Food</Button>;
}
