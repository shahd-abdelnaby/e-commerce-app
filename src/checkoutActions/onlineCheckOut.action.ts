"use server";

import { checkOutSchemaType } from "@/Schema/checkout.schema";
import getMyToken from "@/utilites/GetMyToken";

export default async function onlineCheckOut(
  cartId: string,
  url: string,
  formValues: checkOutSchemaType
) {
  const token = await getMyToken();
  if (!token) throw new Error("you are not logged in");
  
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
    {
      method: "POST",
      headers: { token, "Content-Type": "application/json" },
      body: JSON.stringify({ shippingAddress: formValues }),
    }
  );
  
  const payload = await res.json();
  return payload;
}