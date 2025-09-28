'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { BrandType } from '@/types/Brand.type';

interface BrandDetailProps {
  brand: BrandType;
}

export default function BrandDetail({ brand }: BrandDetailProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/Brands" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Brands
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 flex items-center justify-center bg-gray-50">
              <div className="relative w-full h-96">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>

            <div className="md:w-1/2 p-8">
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {brand.name}
                  </h1>
                  <p className="text-xl text-gray-600 capitalize">
                    {brand.slug.replace('-', ' ')}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-3" />
                    <div>
                      <span className="font-medium">Created:</span>
                      <span className="ml-2">{formatDate(brand.createdAt)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-3" />
                    <div>
                      <span className="font-medium">Last Updated:</span>
                      <span className="ml-2">{formatDate(brand.updatedAt)}</span>
                    </div>
                  </div>
                </div>

             

                <div className="flex space-x-4">
                  <Link href={`/Brands/${brand._id}/products`}>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                      View Products
                    </button>
                  </Link>
              
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}