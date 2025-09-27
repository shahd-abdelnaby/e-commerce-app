'use client';

import React from 'react';
import { CategoryType } from '@/types/category.type';
import CategoryCard from '../SingleCategory/SingleCategory';

interface CategoriesGridProps {
  categories: CategoryType[];
}

export default function CategoriesGrid({ categories }: CategoriesGridProps) {
  if (categories.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">No categories found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Categories</h1>
        <p className="text-gray-600">Explore our product categories</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-500">
          Showing {categories.length} categories
        </p>
      </div>
    </div>
  );
}