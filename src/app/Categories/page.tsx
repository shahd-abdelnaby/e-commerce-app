import React from 'react';
import AllCategories from '@/api/AllCategories';
import CategoriesGrid from '../_components/CategoriesGrid/CategoriesGrid';

export default async function CategoriesPage() {
  const categories = await AllCategories();

  return (
    <main className="min-h-screen bg-gray-50">
      <CategoriesGrid categories={categories} />
    </main>
  );
}

 

