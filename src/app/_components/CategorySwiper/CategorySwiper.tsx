"use client";

import React from "react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { CategoryType } from "./../../../types/category.type";
import  Image  from 'next/image';

export default function CategorySwiper({ data }: { data: CategoryType[] }) {
  return (
    <>
 <div className="w-[80%] mx-auto">
  <h1 className="font-semibold text-slate-500 my-2">shop popular categories</h1>
       <Swiper
        spaceBetween={0}
        slidesPerView={7}
        modules={[Autoplay]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
      >


        {data.map((category)=> 
        
           <SwiperSlide key={category._id}>
                    <Image
                    width={120}
                    height={100}
                      className="w-full object-cover h-[150px]"
                      src={category.image}
                      alt="Slider Image 1"
                    />
                    <p className="text-center font-bold">{category.name}</p>
                  </SwiperSlide>)}

      </Swiper>
  </div>
    </>
  );
}
