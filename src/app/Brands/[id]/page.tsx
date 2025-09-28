import React from "react";
import { notFound } from "next/navigation";
import GetSpecificBrand from "@/api/GetSpecificBrand";
import BrandDetail from "@/app/_components/BrandDetails/BrandDetails";

export default async function BrandPage({
  params,
}: {
  params: { id: string };
}) {
  const brand = await GetSpecificBrand(params.id);

  if (!brand) {
    notFound();
  }

  return <BrandDetail brand={brand} />;
}
