"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ProductType } from "./../../../types/product.type";
import AddBtn from "./../AddBtn/AddBtn";
import AddToFavoritesBtn from "../favoriteBtn/FavoriteBtn";

export default function SingleProduct({ Product }: { Product: ProductType }) {
  return (
    <>
      <div className="w-full md:w-1/2 lg:w-1/4  xl:w-1/5" key={Product.id}>
        <div className="p-4">
          <Card className="gap-2 p-2">
            <Link href={`/Products/${Product.id}`}>
              <CardHeader>
                <CardTitle>
                  <Image
                    src={Product.imageCover}
                    alt="imageCover"
                    width={120}
                    height={100}
                  />
                </CardTitle>
                <CardDescription className="text-sm text-emerald-500">
                  {Product.category.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="font-bold">
                <p className="line-clamp-1">{Product.title}</p>
              </CardContent>
              <CardFooter>
                <div className="flex justify-between w-full">
                  <span>{Product.price}EGP</span>
                  <span>
                    {Product.ratingsAverage}
                    <i className="fa-solid fa-star text-yellow-500"></i>
                  </span>
                </div>
              </CardFooter>
            </Link>

            <AddBtn id={Product.id} />
            <AddToFavoritesBtn id={Product.id}/>
          </Card>
        </div>
      </div>
    </>
  );
}
