
import getMyToken from "@/utilites/GetMyToken";

export default async function getUserWish() {
  const token = await getMyToken();

  if (!token) throw new Error("please login first");

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    method: "GET",
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });

  const payload = await res.json();
  return payload;
}
