import React from "react";
import { notFound } from "next/navigation";
import GetSpecificBrand from "@/api/GetSpecificBrand";
import BrandDetail from "@/app/_components/BrandDetails/BrandDetails";

interface BrandPageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function BrandPage({ params }: BrandPageProps) {
  const brand = await GetSpecificBrand(params.id);

  if (!brand) {
    notFound();
  }

  return <BrandDetail brand={brand} />;
}
