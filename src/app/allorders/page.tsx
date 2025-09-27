import Image from "next/image";
import { jwtDecode } from "jwt-decode";
import getMyToken from "@/utilites/GetMyToken";
import { Order } from "@/types/AllOrders";
import { fetchUserOrders } from "@/api/GetUserOrders";

async function getCurrentUserId(): Promise<string | null> {
  try {
    const token = await getMyToken();

    // Check if token exists and is a valid string
    if (!token || typeof token !== "string") {
      console.warn("No valid token found");
      return null;
    }

    let decoded: { id?: string } | null = null;

    try {
      decoded = jwtDecode<{ id?: string }>(token);
    } catch (decodeErr) {
      console.error("Failed to decode JWT:", decodeErr);
      return null;
    }

    return decoded?.id ?? null;
  } catch (err) {
    console.error("Error decoding user token", err);
    return null;
  }
}

function OrderStatusBadge({
  isPaid,
  isDelivered,
}: {
  isPaid: boolean;
  isDelivered: boolean;
}) {
  if (isDelivered) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        Delivered
      </span>
    );
  }

  if (isPaid) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        Paid – Processing
      </span>
    );
  }

  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
      Pending Payment
    </span>
  );
}

function OrderCard({ order }: { order: Order }) {
  const totalItems = order.cartItems.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Order #{order._id}
          </h3>
        </div>
        <OrderStatusBadge
          isPaid={order.isPaid}
          isDelivered={order.isDelivered}
        />
      </div>

      <div className="space-y-4 mb-4">
        {order.cartItems.map((item) => (
          <div key={item._id} className="flex items-center space-x-4">
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src={item.product.imageCover}
                alt={item.product.title}
                fill
                sizes="64px"
                className="object-cover rounded-md"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 truncate">
                {item.product.title}
              </h4>
              <p className="text-sm text-gray-500">
                {item.product.category.name} • {item.product.brand.name}
              </p>
              <p className="text-sm text-gray-500">
                Quantity: {item.count} • ${item.price}
              </p>
            </div>
            <div className="text-sm font-medium text-gray-900">
              ${(item.price * item.count).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Items ({totalItems})</span>
          <span className="text-sm text-gray-900">
            $
            {order.cartItems
              .reduce((sum, item) => sum + item.price * item.count, 0)
              .toFixed(2)}
          </span>
        </div>
        {order.taxPrice > 0 && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Tax</span>
            <span className="text-sm text-gray-900">
              ${order.taxPrice.toFixed(2)}
            </span>
          </div>
        )}
        {order.shippingPrice > 0 && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Shipping</span>
            <span className="text-sm text-gray-900">
              ${order.shippingPrice.toFixed(2)}
            </span>
          </div>
        )}
        <div className="flex justify-between items-center font-semibold text-lg border-t pt-2">
          <span className="text-gray-900">Total</span>
          <span className="text-gray-900">
            ${order.totalOrderPrice.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-md">
        <h5 className="text-sm font-medium text-gray-900 mb-1">
          Shipping Address
        </h5>
        <p className="text-sm text-gray-600">
          {order.shippingAddress.city} • {order.shippingAddress.phone}
        </p>
        <p className="text-sm text-gray-600">{order.shippingAddress.details}</p>
        <p className="text-sm text-gray-600 mt-1">
          Payment:{" "}
          {order.paymentMethodType === "cash"
            ? "Cash on Delivery"
            : order.paymentMethodType}
        </p>
      </div>
    </div>
  );
}

export default async function AllOrdersPage() {
  const userId = await getCurrentUserId();

  if (!userId) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">My Orders</h1>
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-red-800">Please log in to view your orders.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const ordersResponse = await fetchUserOrders(userId);

  if (!ordersResponse.success) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">My Orders</h1>
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-red-800">
                {ordersResponse.message ||
                  "Failed to load orders. Please try again later."}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (ordersResponse.data.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">My Orders</h1>
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="text-gray-400 mb-4">
                <svg
                  className="mx-auto h-16 w-16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No orders found
              </h3>
              <p className="text-gray-500">no orders</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-2">
            Track and manage your orders ({ordersResponse.data.length}{" "}
            {ordersResponse.data.length === 1 ? "order" : "orders"})
          </p>
        </div>

        <div className="space-y-6">
          {ordersResponse.data.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}
