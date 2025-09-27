import React from 'react';
import { notFound } from 'next/navigation';
import GetSpecificCategory from '@/api/GetSpecificCategory';
import CategoryDetail from '@/app/_components/CategoryDetails/CategoryDetails';

interface CategoryPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function resolveParams(params: Promise<{ id: string }>): Promise<{ id: string }> {
  return await params;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await resolveParams(params);
  console.log('Category page params:', resolvedParams);
  
  const category = await GetSpecificCategory(resolvedParams.id);
  console.log('Fetched category:', category);

  if (!category) {
    console.log('Category not found, redirecting to not-found');
    notFound();
  }

  return <CategoryDetail category={category} />;
}

