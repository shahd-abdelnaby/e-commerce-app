"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { toast } from "sonner";
import AddToFavorites from "@/WhishListActions/addToWhishes";

export default function AddToFavoritesBtn({ id }: { id: string }) {
  const [isFavorite, setIsFavorite] = useState(false);

  async function checkAddedProduct(productId: string) {
    const res = await AddToFavorites(productId);

    if (res.status === "success") {
      setIsFavorite(true); // make heart red
      toast.success("Product added to favorites ✔", {
        position: "top-center",
        duration: 2000,
      });
    } else {
      toast.error(res.message || "Failed to add to favorites", {
        position: "top-center",
        duration: 2000,
      });
    }
  }

  return (
    <Button
      onClick={() => checkAddedProduct(id)}
      className={`py-2 px-4 rounded cursor-pointer transition 
        ${isFavorite ? "bg-red-600 hover:bg-red-700" : "bg-gray-500 hover:bg-emerald-800"} 
        text-white`}
    >
      {isFavorite ? "Added to wishlist" : "Add to wishlist"}{" "}
      <i
        className={`ml-2 fa-heart ${
          isFavorite ? "fa-solid text-white" : "fa-regular text-white"
        }`}
      ></i>
    </Button>
  );
}
