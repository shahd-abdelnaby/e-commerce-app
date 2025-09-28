"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import Image from 'next/image';
import getMyToken from "@/utilites/GetMyToken";

interface WishlistItem {
  _id: string;
  title: string;
  price: number;
  imageCover: string;
}

export default function WishList() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [removeDisable, setRemoveDisable] = useState(false);
  const [cartDisable, setCartDisable] = useState(false);

  async function getUserWishlist() {
    try {
      const token = await getMyToken();
      if (!token) {
        setIsLoading(false);
        toast.error("Login required");
        return;
      }

      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { headers: { token } }
      );

      if (res.data.status === "success") {
        setWishlist(res.data.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch {
      setIsLoading(false);
      toast.error("Failed to load wishlist");
    }
  }

  async function removeFromWishlist(productId: string) {
    setRemoveDisable(true);

    try {
      const token = await getMyToken();
      if (!token) {
        toast.error("Authentication required");
        setRemoveDisable(false);
        return;
      }

      const res = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers: { token } }
      );

      if (res.data.status === "success") {
        toast.success("Item removed from wishlist");
        getUserWishlist();
      } else {
        toast.error("Could not remove item, try again later");
      }
    } catch {
      toast.error("Failed to remove item");
    } finally {
      setRemoveDisable(false);
    }
  }

  async function addToCart(productId: string) {
    setCartDisable(true);

    try {
      const token = await getMyToken();
      if (!token) {
        toast.error("Authentication required");
        setCartDisable(false);
        return;
      }

      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        { headers: { token } }
      );

      if (res.data.status === "success") {
        toast.success("Item added to cart");
        await removeFromWishlist(productId);
      } else {
        toast.error("Could not add item to cart");
      }
    } catch {
      toast.error("Failed to add item to cart");
    } finally {
      setCartDisable(false);
    }
  }

  useEffect(() => {
    getUserWishlist();
  }, []);

  if (isLoading) {
    return (
    <div className=" flex items-center justify-center align-middle h-full w-full my-52">
    <div className="p-3 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 md:w-48 md:h-48 h-32 w-32 aspect-square rounded-full">
      <div className="rounded-full h-full w-full bg-slate-100 dark:bg-zinc-900 background-blur-md" />
    </div>
    </div>
    );
  }

  return (
    <>
      {wishlist.length > 0 ? (
        <div className="mx-auto my-12 w-2/3">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <h1 className="text-red-700 text-center my-4 text-3xl font-bold">Your wishList</h1>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {wishlist.map((item) => (
                  <tr
                    key={item._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <Image
                        src={item.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt={item.title}
                        width={128}
                        height={128}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 font-semibold text-emerald-600 dark:text-white">
                      {item.price} EGP
                    </td>
                    <td className="flex my-14 items-center gap-3 px-6 py-4">
                      <button
                        disabled={cartDisable}
                        onClick={() => addToCart(item._id)}
                        className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 cursor-pointer"
                      >
                        Add to Cart <i className="fa-solid fa-cart-plus"></i>
                      </button>

                      <button
                        disabled={removeDisable}
                        onClick={() => removeFromWishlist(item._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 cursor-pointer"
                      >
                        Remove <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <h1 className="text-red-700 text-center my-52 text-3xl font-bold">
          No products in the wishlist!
        </h1>
      )}
    </>
  );
}