"use server"

export async function AllUserOrders(id:string) {
  
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch orders");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}
