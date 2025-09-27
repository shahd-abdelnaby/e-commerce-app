import React from 'react';
import { notFound } from 'next/navigation';
import GetSpecificBrand from '@/api/GetSpecificBrand';
import GetBrandProducts from '@/api/GetProduct';
import BrandProductsGrid from '@/app/_components/BrandProduct/BrandProductGrid';

interface BrandProductsPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BrandProductsPage({ params, searchParams }: BrandProductsPageProps) {
  const resolvedParams = await params;
  
  
  const [brand, products] = await Promise.all([
    GetSpecificBrand(resolvedParams.id),
    GetBrandProducts(resolvedParams.id)
  ]);

  if (!brand) {
    notFound();
  }


  return (
    <BrandProductsGrid 
      products={products} 
      brand={brand} 
    />
  );
}