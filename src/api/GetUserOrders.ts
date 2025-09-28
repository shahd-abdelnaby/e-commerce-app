
import { OrdersResponse } from "@/types/AllOrders";
import getMyToken from "@/utilites/GetMyToken";

export async function fetchUserOrders(userId: string): Promise<OrdersResponse> {
  try {
    const token = await getMyToken();
    
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        cache: 'no-store', 
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      data: Array.isArray(data) ? data : [],
      success: true,
    };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return {
      data: [],
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch orders",
    };
  }
}

export async function fetchUserOrdersClient(userId: string, token: string): Promise<OrdersResponse> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      data: Array.isArray(data) ? data : [],
      success: true,
    };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return {
      data: [],
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch orders",
    };
  }
}