"use server"
import getMyToken from "@/utilites/GetMyToken";


export default async function GetLoggedUserCart() {
  const token = await getMyToken();
  if (!token) {
    throw new Error("can not add to cart right now, try again later!");
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "GET",
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });
  const payload= await res.json() 
  return payload
}
