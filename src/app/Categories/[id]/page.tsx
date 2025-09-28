import React from "react";
import { notFound } from "next/navigation";
import GetSpecificCategory from "@/api/GetSpecificCategory";
import CategoryDetail from "@/app/_components/CategoryDetails/CategoryDetails";

export default async function CategoryPage({
  params,
}: {
  params: { id: string };
}) {
  console.log("Category page params:", params);

  const category = await GetSpecificCategory(params.id);
  console.log("Fetched category:", category);

  if (!category) {
    console.log("Category not found, redirecting to not-found");
    notFound();
  }

  return <CategoryDetail category={category} />;
}
