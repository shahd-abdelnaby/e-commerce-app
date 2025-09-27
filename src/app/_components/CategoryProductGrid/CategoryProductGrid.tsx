'use client';

import React from 'react';
import { ProductType } from '@/types/product.type';
import { CategoryType } from '@/types/category.type';
import ProductCard from '../ProductCard/ProductCard';
import Link from 'next/link';
import { ArrowLeft, Package, Tag } from 'lucide-react';
import  Image  from 'next/image';

interface CategoryProductsGridProps {
  products: ProductType[];
  category: CategoryType;
}

export default function CategoryProductsGrid({ products, category }: CategoryProductsGridProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link 
            href={`/categories/${category._id}`} 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to {category.name}
          </Link>
          
          <div className="flex items-center mb-4">
            <Image
              width={64}
              height={64}
              src={category.image}
              alt={category.name}
              className="w-16 h-16 object-cover rounded-lg mr-4"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{category.name} Products</h1>
              <p className="text-gray-600 flex items-center">
                <Tag className="w-4 h-4 mr-1" />
                Discover all products in {category.name}
              </p>
            </div>
          </div>
        </div>


        <div className="mb-6 flex items-center">
          <Package className="w-5 h-5 text-gray-600 mr-2" />
          <span className="text-gray-600">
            {products.length} {products.length === 1 ? 'product' : 'products'} found
          </span>
        </div>


        {products.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">
              No Products Found
            </h2>
            <p className="text-gray-500 mb-6">
              Sorry, no products are available in {category.name} at the moment.
            </p>
            <Link 
              href="/Categories"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Other Categories
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}