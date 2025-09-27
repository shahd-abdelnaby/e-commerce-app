"use client";
import GetLoggedUserCart from "@/CartActions/GetLoggedUserCart.action";
import { createContext, useEffect, useState, ReactNode } from "react";

interface CartContextType {
  cartCount: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartContextProviderProps {
  children: ReactNode;
}

export default function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartCount, setCartCount] = useState<number>(0);

  async function getUserCart() {
    try {
      const res = await GetLoggedUserCart();

      if (res.status === "success") {
        let sum = 0;
        res.data.products.forEach((product: { count: number }) => {
          sum += product.count;
        });
        setCartCount(sum);
      }
    } catch {
      console.log("not logged");
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
}
