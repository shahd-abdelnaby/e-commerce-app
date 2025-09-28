import AllBrands from '@/api/Brands.api';
import React from 'react';
import BrandsGrid from '../_components/BrandsGrid/BrandsGrid';

export const dynamic = 'force-dynamic';

export default async function BrandsPage() {
  const brands = await AllBrands();

  return (
    <main className="min-h-screen bg-gray-50">
      <BrandsGrid brands={brands} />
    </main>
  );
}