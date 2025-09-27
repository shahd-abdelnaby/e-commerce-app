import React from 'react'
import { ProductType } from './../../../types/product.type';
import AddBtn from '../AddBtn/AddBtn';
import AddToFavoritesBtn from '../favoriteBtn/FavoriteBtn';
import  Image  from 'next/image';

export default function Details({ data }:{ data: ProductType }) {
  return (<>
   <div className="container w-full  lg:w-[60%] mx-auto flex">
        <div className="w-1/4">
        <div className="p-4">
          <Image
           className='w-full' src={data.imageCover} alt={data.title} />
        </div>
        </div>

        <div className=" w-3/4">
       <div className="p-4">
          <h1 className='text-2xl font-bold my-4 text-emerald-600'>{data.title}</h1>
          <p>{data.description}</p>
          <p className='text-sm text-gray-500'>{data.category.name}</p>
       <div className="flex justify-between w-full my-4">
              <span>{data.price}EGP</span>
              <span>{data.ratingsAverage}<i className="fa-solid fa-star text-yellow-500"></i></span>
            </div>
              <div className="w-1/2  flex justify-between">
            <AddBtn id={data.id} />
            <AddToFavoritesBtn id={data.id}/>
            </div>
            </div>
          
       </div>
       </div>
  </>
  )
}
