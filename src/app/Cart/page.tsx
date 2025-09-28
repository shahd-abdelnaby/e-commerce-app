"use client";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/CartContext";
import { CartProductType } from "./../../types/cart.type";
import Link from "next/link";
import axios from "axios";
import getMyToken from '@/utilites/GetMyToken';
import Image from 'next/image';

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [removeDisable, setremoveDisable] = useState(false);
  const [updateDisable, setupdateDisable] = useState(false);
  const [loadingUpdate, setloadingUpdate] = useState(false);
  const [currentid, setcurrentid] = useState("");
  const { cartCount, setCartCount } = useContext(CartContext)!;
  const [total, setTotal] = useState(0);
  const [cartId, setcartId] = useState("");

 async function getUserCart() {
    try {
      const token = await getMyToken();
      
      if (!token) {
        setisLoading(false);
        toast.error("login required");
        return;
      }

      const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token },
      });
      
      if (res.data.status === "success") {
        setTotal(res.data.data.totalCartPrice);
        setcartId(res.data.cartId);
        setProducts(res.data.data.products);
        setisLoading(false);
      } else {
        setisLoading(false);
      }
    } catch {
      setisLoading(false);
      toast.error("Failed to load cart");
    }
  }

  async function RemoveItem(id: string) {
    setremoveDisable(true);
    setupdateDisable(true);
    
    try {
      const token = await getMyToken();
      if (!token) {
        toast.error("Authentication required");
        setremoveDisable(false);
        setupdateDisable(false);
        return;
      }
      
      const res = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { headers: { token } }
      );
      
      if (res.data.status === "success") {
        setProducts(res.data.data.products);
        toast.success("item removed from the cart", {
          duration: 4000,
          position: "top-center",
        });
        let sum = 0;
        res.data.data.products.forEach((product: CartProductType) => {
          sum += product.count;
        });
        getUserCart();
        setCartCount(sum);
        setremoveDisable(false);
        setupdateDisable(false);
      } else {
        toast.error(
          "can not remove item from the cart right now, try again later!",
          { duration: 4000, position: "top-center" }
        );
        setremoveDisable(false);
      }
    } catch {
      toast.error("Failed to remove item");
      setremoveDisable(false);
      setupdateDisable(false);
    }
  }

  async function UpdateProduct(id: string, count: string, sign: string) {
    setcurrentid(id);
    setloadingUpdate(true);
    setupdateDisable(true);
    setremoveDisable(true);
    
    try {
      const token = await getMyToken();
      if (!token) {
        toast.error("Authentication required");
        setupdateDisable(false);
        setloadingUpdate(false);
        setremoveDisable(false);
        return;
      }
      
      const res = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count },
        { headers: { token } }
      );
      
      if (res.data.status === "success") {
        setProducts(res.data.data.products);
        toast.success("cart updated", { duration: 4000, position: "top-center" });
        if (sign === "-") {
          setCartCount(cartCount - 1);
        } else if (sign === "+") {
          setCartCount(cartCount + 1);
        }
        getUserCart();
        setupdateDisable(false);
        setloadingUpdate(false);
        setremoveDisable(false);
      } else {
        toast.error("cart updated failed", {
          duration: 4000,
          position: "top-center",
        });
        setupdateDisable(false);
        setloadingUpdate(false);
        setremoveDisable(false);
      }
    } catch {
      toast.error("Failed to update cart");
      setupdateDisable(false);
      setloadingUpdate(false);
      setremoveDisable(false);
    }
  }

  async function clear() {
    try {
      const token = await getMyToken();
      if (!token) {
        toast.error("Authentication required");
        return;
      }
      
      const res = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { headers: { token } }
      );
      
      if (res.data.message === "success") {
        setProducts([]);
        setCartCount(0);
        toast.success("Cart cleared successfully",{ duration: 4000, position: "top-center" });
      }
    } catch {
      toast.error("Failed to clear cart");
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

 if (isLoading) {
    return ( <> 
    <div className=" flex items-center justify-center align-middle h-full w-full my-52">
    <div className="p-3 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 md:w-48 md:h-48 h-32 w-32 aspect-square rounded-full">
      <div className="rounded-full h-full w-full bg-slate-100 dark:bg-zinc-900 background-blur-md" />
    </div>
    </div>
    
    </>

    );
  } 
  
  return (
    <>
      {products.length > 0 ? (
        <div className="mx-auto my-12 w-2/3">
          <div className="flex justify-end">
            <Button
              onClick={() => clear()}
              className="bg-emerald-600 hover:bg-emerald-700 p-2 my-4 text-center cursor-pointer"
            >
              Clear Cart
            </Button>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span>Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: CartProductType) => (
                  <tr
                    key={product._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <Image
                        src={product.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt={product.product.title}
                        width={128}
                        height={128}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          disabled={updateDisable}
                          onClick={() =>
                            UpdateProduct(
                              product.product.id,
                              `${product.count - 1}`,
                              "-"
                            )
                          }
                          className="inline-flex disabled:cursor-not-allowed items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>
                          {product.product.id === currentid ? (
                            loadingUpdate ? (
                              <i className="fa-solid fa-spinner fa-spin"></i>
                            ) : (
                              <span>{product.count}</span>
                            )
                          ) : (
                            <span>{product.count}</span>
                          )}
                        </div>
                        <button
                          disabled={updateDisable}
                          onClick={() =>
                            UpdateProduct(
                              product.product.id,
                              `${product.count + 1}`,
                              "+"
                            )
                          }
                          className="inline-flex disabled:cursor-not-allowed items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-emerald-600 dark:text-white">
                      {product.price * product.count} EGP
                    </td>
                    <td>
                      <button
                        disabled={removeDisable}
                        onClick={() => RemoveItem(product.product.id)}
                        className="group cursor-pointer disabled:cursor-not-allowed relative flex h-14 w-14 flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-red-800 bg-red-400 hover:bg-red-600"
                      >
                        <svg
                          viewBox="0 0 1.625 1.625"
                          className="absolute -top-7 fill-white delay-100 group-hover:top-6 group-hover:animate-[spin_1.4s] group-hover:duration-1000"
                          height="15"
                          width="15"
                        >
                          <path d="M.471 1.024v-.52a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099h-.39c-.107 0-.195 0-.195-.195"></path>
                          <path d="M1.219.601h-.163A.1.1 0 0 1 .959.504V.341A.033.033 0 0 0 .926.309h-.26a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099v-.39a.033.033 0 0 0-.032-.033"></path>
                          <path d="m1.245.465-.15-.15a.02.02 0 0 0-.016-.006.023.023 0 0 0-.023.022v.108c0 .036.029.065.065.065h.107a.023.023 0 0 0 .023-.023.02.02 0 0 0-.007-.016"></path>
                        </svg>
                        <svg
                          width="16"
                          fill="none"
                          viewBox="0 0 39 7"
                          className="origin-right duration-500 group-hover:rotate-90"
                        >
                          <line
                            strokeWidth="4"
                            stroke="white"
                            y2="5"
                            x2="39"
                            y1="5"
                          ></line>
                          <line
                            strokeWidth="3"
                            stroke="white"
                            y2="1.5"
                            x2="26.0357"
                            y1="1.5"
                            x1="12"
                          ></line>
                        </svg>
                        <svg width="16" fill="none" viewBox="0 0 33 39">
                          <mask fill="white" id="path-1-inside-1_8_19">
                            <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
                          </mask>
                          <path
                            mask="url(#path-1-inside-1_8_19)"
                            fill="white"
                            d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                          ></path>
                          <path
                            strokeWidth="4"
                            stroke="white"
                            d="M12 6L12 29"
                          ></path>
                          <path
                            strokeWidth="4"
                            stroke="white"
                            d="M21 6V29"
                          ></path>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-center text-3xl font-bold my-12 text-emerald-700">
              Total cart price:{total}
            </p>
          </div>

        <div className="flex justify-center gap-4">
           <Link href={`/Checkout/${cartId}`}>
            <div className="relative inline-flex items-center justify-center gap-4 group my-10 mx-auto">
              <div className="absolute inset-0 duration-1000 opacity-60 transitiona-all bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"></div>
              <button
                type="submit"
                role="button"
                className="group relative cursor-pointer inline-flex items-center justify-center text-base rounded-xl bg-gray-900 px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30"
                title="payment"
              >
                pay online
                <svg
                  aria-hidden="true"
                  viewBox="0 0 10 10"
                  height="10"
                  width="10"
                  fill="none"
                  className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
                >
                  <path
                    d="M0 5h7"
                    className="transition opacity-0 group-hover:opacity-100"
                  ></path>
                  <path
                    d="M1 1l4 4-4 4"
                    className="transition group-hover:translate-x-[3px]"
                  ></path>
                </svg>
              </button>
            </div>
          </Link>
          <Link href={`/CashCheckout/${cartId}`}>
            <div className="relative inline-flex items-center justify-center gap-4 group my-10 mx-auto">
              <div className="absolute inset-0 duration-1000 opacity-60 transitiona-all bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"></div>
              <button
                type="submit"
                role="button"
                className="group relative cursor-pointer inline-flex items-center justify-center text-base rounded-xl bg-gray-900 px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30"
                title="payment"
              >
               pay cash 
                <svg
                  aria-hidden="true"
                  viewBox="0 0 10 10"
                  height="10"
                  width="10"
                  fill="none"
                  className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
                >
                  <path
                    d="M0 5h7"
                    className="transition opacity-0 group-hover:opacity-100"
                  ></path>
                  <path
                    d="M1 1l4 4-4 4"
                    className="transition group-hover:translate-x-[3px]"
                  ></path>
                </svg>
              </button>
            </div>
          </Link>
        </div>
         
        </div>
      ) : (
        <h1 className="text-red-700 text-center my-52 text-3xl font-bold">
          No products in the cart!
        </h1>
      )}
    </>
  );
}