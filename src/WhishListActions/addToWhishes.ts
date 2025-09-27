"use server"
import getMyToken from "@/utilites/GetMyToken";


export default async function AddToFavorites(id: string) {
try{
    const token = await getMyToken();
  if (!token) {
    throw new Error("can not add to favorites right now, try again later!");
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
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