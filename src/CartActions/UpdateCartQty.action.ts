"use server"
import getMyToken from "@/utilites/GetMyToken";


export default async function UpdateCartQty(id:string , count:string) {
  const token = await getMyToken();
  if (!token) {
    throw new Error("can not update  the cart right now, try again later!");
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    method: "PUT",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ count, }),
  });
  const payload= await res.json() 
  return payload
}
