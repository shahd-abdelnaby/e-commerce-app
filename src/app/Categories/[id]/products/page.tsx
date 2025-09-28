import React from "react";
import { notFound } from "next/navigation";
import GetSpecificCategory from "@/api/GetSpecificCategory";
import GetCategoryProducts from "@/api/GetCategoryProduct";
import CategoryProductsGrid from "@/app/_components/CategoryProductGrid/CategoryProductGrid";

export default async function CategoryProductsPage({
  params,
}: {
  params: { id: string };
}) {
  console.log("Category products page params:", params);

  const [category, products] = await Promise.all([
    GetSpecificCategory(params.id),
    GetCategoryProducts(params.id),
  ]);

  if (!category) {
    console.log("Category not found for products page");
    notFound();
  }

  return <CategoryProductsGrid products={products} category={category} />;
}
