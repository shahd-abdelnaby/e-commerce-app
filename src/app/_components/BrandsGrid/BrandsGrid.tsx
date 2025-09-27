'use client';

import React from 'react';
import BrandCard from '../SingleBrand/SingleBrand';
import { BrandType } from '@/types/Brand.type';

interface BrandsGridProps {
  brands: BrandType[];
}

export default function BrandsGrid({ brands }: BrandsGridProps) {
  if (brands.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">No brands found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Brands</h1>
        <p className="text-gray-600">Explore our featured brands</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {brands.map((brand) => (
          <BrandCard key={brand._id} brand={brand} />
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-500">
          Showing {brands.length} brands
        </p>
      </div>
    </div>
  );
}