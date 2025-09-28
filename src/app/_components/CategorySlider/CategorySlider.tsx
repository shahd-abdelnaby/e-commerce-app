import AllCategories from '@/api/AllCategories'
import React from 'react'
import CategorySwiper from '../CategorySwiper/CategorySwiper'

export default async function CategorySlider() {

const data = await  AllCategories()

  return (<>

   <CategorySwiper data={data}/>
  </>
  )
}
 