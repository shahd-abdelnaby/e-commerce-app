"use client";
import AddToCart from "@/CartActions/AddToCart.Action";
import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "sonner";
import { useContext } from "react";
import { CartContext } from '@/context/CartContext';


export default  function AddBtn({ id }: { id: string }) {
    const { cartCount ,setCartCount} = useContext(CartContext)!;

  async function checkAddedProduct(id: string) {
    const res = await AddToCart(id);
    console.log(res);
    if (res.status === "success") {
      toast.success("Product added to cart ✔", {
        position: "top-center",
        duration: 2000,
      });
      setCartCount(cartCount + 1);
    } else {
      toast.error(res.message, {
        position: "top-center",
        duration: 2000,
      });
    }
  }
  return (
    <>
      <Button
        onClick={() => checkAddedProduct(id)}
        className="bg-emerald-700 text-white py-2 px-4 rounded cursor-pointer hover:bg-emerald-800"
      >
        Add to Cart <i className="fa-solid fa-cart-plus text-white"></i>
      </Button>



    </>
  );
}
