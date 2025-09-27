'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductType } from '@/types/product.type';
import { Star} from 'lucide-react';
import AddBtn from '../AddBtn/AddBtn';
import AddToFavoritesBtn from '../favoriteBtn/FavoriteBtn';

interface ProductCardProps {
  product: ProductType;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price / 100);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />
        );
      } else {
        stars.push(
          <Star key={i} className="w-4 h-4 text-gray-300" />
        );
      }
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-64 w-full ">
          <Image
            src={product.imageCover}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {product.sold > 1000 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
              Hot Sale
            </div>
          )}
        </div>
      
      <div className="p-4">
        <Link href={`/products/${product._id}`}>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors cursor-pointer line-clamp-2">
            {product.title}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center mb-3">
          <div className="flex items-center mr-2">
            {renderStars(product.ratingsAverage)}
          </div>
          <span className="text-sm text-gray-600">
            ({product.ratingsQuantity})
          </span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="text-2xl font-bold text-green-600">
            {formatPrice(product.price)}
          </div>
          <div className="text-sm text-gray-500">
            {product.quantity} in stock
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Image
              src={product.brand.image}
              alt={product.brand.name}
              width={20}
              height={20}
              className="object-contain"
            />
            <span className="text-sm text-gray-600">{product.brand.name}</span>
          </div>
          <div className="text-sm text-gray-500">
            Sold: {product.sold}
          </div>
        </div>

              <div className="flex justify-around">
                <AddBtn id={product._id} />
              <AddToFavoritesBtn id={product._id}/></div>
      </div>
    </div>
  );
}