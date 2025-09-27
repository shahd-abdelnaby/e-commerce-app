import React from 'react';
import { notFound } from 'next/navigation';
import GetSpecificBrand from '@/api/GetSpecificBrand';
import BrandDetail from '@/app/_components/BrandDetails/BrandDetails';

interface BrandPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BrandPage({ params, searchParams }: BrandPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  
  console.log('Brand page params:', resolvedParams);
  console.log('Search params:', resolvedSearchParams);

  const brand = await GetSpecificBrand(resolvedParams.id);
  console.log('Fetched brand:', brand);

  if (!brand) {
    console.log('Brand not found, redirecting to not-found');
    notFound();
  }

  return <BrandDetail brand={brand} />;
}