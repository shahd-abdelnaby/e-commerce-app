'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BrandType } from '@/types/Brand.type';

interface BrandCardProps {
  brand: BrandType;
}

export default function BrandCard({ brand }: BrandCardProps) {
  return (
    <Link href={`/Brands/${brand._id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <div className="relative h-48 w-full">
          <Image
            src={brand.image}
            alt={brand.name}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
            {brand.name}
          </h3>
          <p className="text-sm text-gray-600 capitalize text-center">
            {brand.slug.replace('-', ' ')}
          </p>
        </div>
      </div>
    </Link>
  );
}