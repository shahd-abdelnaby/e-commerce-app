"use client";
import React from "react";
import img1 from "../../../../public/images/slider-image-1.jpeg";
import img2 from "../../../../public/images/slider-image-2.jpeg";
import img3 from "../../../../public/images/slider-image-3.jpeg";
import img4 from "../../../../public/images/grocery-banner.png";
import img5 from "../../../../public/images/grocery-banner-2.jpeg";
import Image from "next/image";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function MainSlider() {
  return (
    <div className="w-[80%] mx-auto  my-4 flex">
      <div className="w-3/4">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          modules={[Autoplay]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            <Image
              className="w-full object-cover h-[400px]"
              src={img1}
              alt="Slider Image 1"
            />
          </SwiperSlide>

          <SwiperSlide>
            <Image
              className="w-full object-cover h-[400px]"
              src={img2}
              alt="Slider Image 2"
            />
          </SwiperSlide>

          <SwiperSlide>
            <Image
              className="w-full object-cover h-[400px]"
              src={img3}
              alt="Slider Image 3"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="w-1/4">
        <Image
          className="w-full object-cover h-[200px]"
          src={img4}
          alt="Slider Image 2"
        />
        <Image
          className="w-full object-cover h-[200px]"
          src={img5}
          alt="Slider Image 3"
        />
      </div>
    </div>
  );
}
