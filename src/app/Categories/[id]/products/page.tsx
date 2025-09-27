import React from 'react';
import { notFound } from 'next/navigation';
import GetSpecificCategory from '@/api/GetSpecificCategory';
import GetCategoryProducts from '@/api/GetCategoryProduct';
import CategoryProductsGrid from '@/app/_components/CategoryProductGrid/CategoryProductGrid';

interface CategoryProductsPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function resolveParams(params: Promise<{ id: string }>): Promise<{ id: string }> {
  return await params;
}

export default async function CategoryProductsPage({ params }: CategoryProductsPageProps) {
  const resolvedParams = await resolveParams(params);
  console.log('Category products page params:', resolvedParams);
  
  const [category, products] = await Promise.all([
    GetSpecificCategory(resolvedParams.id),
    GetCategoryProducts(resolvedParams.id)
  ]);

  if (!category) {
    console.log('Category not found for products page');
    notFound();
  }

  return <CategoryProductsGrid products={products} category={category} />;
}

