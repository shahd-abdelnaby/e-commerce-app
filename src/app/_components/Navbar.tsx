"use client";
import Link from "next/link";
import React, { useContext, useState, useRef, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { CartContext } from "./../../context/CartContext";
import { usePathname } from "next/navigation";
import  Image  from 'next/image';
export default function Navbar() {
  const { cartCount } = useContext(CartContext)!;
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  function logout() {
    signOut({ callbackUrl: "/Login" });
  }
  function isActive(path: string) {
  return pathname === path 
    ? "text-emerald-500 underline underline-offset-4" 
    : "hover:text-emerald-500";
}

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <>
      <nav className="bg-slate-700 text-white sticky top-0 right-0 left-0 z-50 shadow">
        <div className="container w-full lg:w-[80%] mx-auto p-4 flex flex-col gap-4  lg:flex-row justify-between items-center">
          <div className="left active:underline-offset-4">
            <ul className="flex gap-2 lg:gap-6 items-center ">
              <li className="text-2xl flex">
                <Link href="/">
                  <i className="fa-solid fa-cart-shopping"></i>
                </Link>
                <Link href="/">Fresh cart</Link>
              </li>
              <li className="hover:text-emerald-500 active:underline-offset-4">
                <Link  className={isActive("/")}  href="/">Home</Link>
              </li>

              {session && (
                <li className="hover:text-emerald-500">
                  <Link  className={`relative ${isActive("/Cart")}`}  href="/Cart">
                    Cart{" "}
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
                        {cartCount}
                      </span>
                    )}{" "}
                  </Link>
                </li>
              )}
              <li className="hover:text-emerald-500">
                <Link  className={isActive("/Products")} href="/Products">Products</Link>
              </li>
              <li className="hover:text-emerald-500">
                <Link  className={isActive("/Categories")} href="/Categories">Categories</Link>
              </li>
              <li className="hover:text-emerald-500">
                <Link  className={isActive("/Brands")} href="/Brands">Brands</Link>
              </li>
            </ul>
          </div>
          <div className="right">
            <ul className="flex gap-4">
              <>
                <li>
                  <i className="fab fa-facebook cursor-pointer transition-transform duration-300 hover:scale-250 hover:text-blue-600"> </i>
                </li>
                <li>
                  <i className="fab fa-instagram cursor-pointer transition-transform duration-300 hover:scale-250 hover:text-pink-600"></i>
                </li>
                <li>
                  <i className="fab fa-twitter cursor-pointer transition-transform duration-300 hover:scale-250 hover:text-blue-400"></i>
                </li>
                <li>
                  <i className="fab fa-linkedin cursor-pointer transition-transform duration-300 hover:scale-250 hover:text-blue-700"></i>
                </li>
                {!session ? (
                  <>
                    <li>
                      <Link href="/Login">Login</Link>
                    </li>
                    <li>
                      <Link href="/Register">Register</Link>
                    </li>
                  </>
                ) : (
                  <li className="relative">
                    <button
                      type="button"
                      className="flex cursor-pointer text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                      id="user-menu-button"
                      aria-expanded={dropdownOpen}
                      onClick={() => setDropdownOpen((open) => !open)}
                    >
                      <span className="sr-only">Open user menu</span>
                      <Image
                      width={120}
                    height={100}
                        className="w-8 h-8 rounded-full"
                        src="/docs/images/people/profile-picture-3.jpg"
                        alt="user photo"
                      />
                    </button>
                    <div
                      ref={dropdownRef}
                      className={`z-50 ${dropdownOpen ? "" : "hidden"} absolute right-0 mt-2 w-48 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600`}
                      id="user-dropdown"
                    >
                      <div className="px-4 py-3">
                        <Link href={`/Profile`} className="cursor-pointer block text-sm text-emerald-500 dark:text-white hover:bg-gray-100">
                          {session?.user?.name}`s Profile <i className="fa-solid fa-user"></i>
                        </Link>
                       
                      </div>
                      <ul className="py-2" aria-labelledby="user-menu-button">
                        <li>
                          <span onClick={logout} className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer">
                            Sign Out <i className="fa-solid fa-arrow-right-from-bracket"></i>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </li>
                )}
              </>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
