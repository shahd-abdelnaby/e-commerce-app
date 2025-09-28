import React from "react";
import { notFound } from "next/navigation";
import GetSpecificCategory from "@/api/GetSpecificCategory";
import GetCategoryProducts from "@/api/GetCategoryProduct";
import CategoryProductsGrid from "@/app/_components/CategoryProductGrid/CategoryProductGrid";

interface CategoryProductsPageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function CategoryProductsPage({ params }: CategoryProductsPageProps) {
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
