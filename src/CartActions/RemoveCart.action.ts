"use server"
import getMyToken from "@/utilites/GetMyToken";


export default async function RemoveCartItem(id:string) {
  const token = await getMyToken();
  if (!token) {
    throw new Error("can not remove from the cart right now, try again later!");
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    method: "DELETE",
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });
  const payload= await res.json() 
  return payload
}
