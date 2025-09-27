"use server"
import getMyToken from "@/utilites/GetMyToken";


export default async function AddToCart(id: string) {
try{
    const token = await getMyToken();
  if (!token) {
    throw new Error("can not add to cart right now, try again later!");
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "POST",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId: id }),
  });
  const payload= await res.json() 
  return payload;
}
catch(err){
  console.log(err);
  return err
}
}
