import React from "react";
import { notFound } from "next/navigation";
import GetSpecificBrand from "@/api/GetSpecificBrand";
import GetBrandProducts from "@/api/GetProduct";
import BrandProductsGrid from "@/app/_components/BrandProduct/BrandProductGrid";

interface BrandProductsPageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function BrandProductsPage({ params }: BrandProductsPageProps) {
  const [brand, products] = await Promise.all([
    GetSpecificBrand(params.id),
    GetBrandProducts(params.id),
  ]);

  if (!brand) {
    notFound();
  }

  return <BrandProductsGrid products={products} brand={brand} />;
}
