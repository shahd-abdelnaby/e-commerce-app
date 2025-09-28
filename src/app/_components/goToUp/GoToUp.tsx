"use client"
import React from 'react'

export default function GoToUp() {
  return (<>
   <div>
      <button onClick={
        () => window.scrollTo(0, 0)}
         className=" bottom-4 right-4 cursor-pointer fixed 
          w-16 h-16 rounded-full  border-4 border-sky-200 bg-black pointer
            flex items-center justify-center duration-300 hover:rounded-[50px] 
         group/button overflow-hidden active:scale-90 text-white text-4xl font-bold
          hover:scale-90 shadow-xlg hover:shadow-sky-200
         ">
        ↑
      </button>
    </div>
  
  
  </>
   
  )
}
