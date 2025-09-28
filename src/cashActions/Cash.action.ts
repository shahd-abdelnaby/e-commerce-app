"use server";

import { checkOutSchemaType } from "@/Schema/checkout.schema";
import getMyToken from "@/utilites/GetMyToken";

export default async function CashCheckOut(
  cartId: string,
  formValues: checkOutSchemaType
) {
  const token = await getMyToken();
  if (!token) throw new Error("you are not logged in");
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
    {
      method: "POST",
      headers: { token, "Content-Type": "application/json" },
      body: JSON.stringify({ shippingAddress: formValues }),
    }
  );
  const payload = await res.json();
  return payload;
}
