'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CategoryType } from '@/types/category.type';

interface CategoryCardProps {
  category: CategoryType;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/Categories/${category._id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <div className="relative h-48 w-full">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {category.name}
          </h3>
          <p className="text-sm text-gray-600 capitalize">
            {category.slug.replace('-', ' ')}
          </p>
        </div>
      </div>
    </Link>
  );
}