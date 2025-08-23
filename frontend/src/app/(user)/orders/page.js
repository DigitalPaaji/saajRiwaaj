"use client";
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { useGlobalContext } from "../../components/context/GlobalContext";
import Link from "next/link";

export default function OrdersPage() {
  const { allProducts } = useGlobalContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user orders
  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch("https://saajriwaaj.onrender.com/order/my", {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to load orders");
      }

      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, []);

  // Cancel order
  const cancelOrder = useCallback(
    async (id) => {
      try {
        const res = await fetch(
          `https://saajriwaaj.onrender.com/order/cancel/${id}`,
          {
            method: "PUT",
            credentials: "include",
          }
        );

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "Failed to cancel order");
        }

        toast.success("Order cancelled");
        fetchOrders(); // refresh orders after cancel
      } catch (err) {
        console.error(err);
        toast.error(err.message || "Failed to cancel order");
      }
    },
    [fetchOrders]
  );

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (loading) return <p className="p-6">Loading your orders...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">You have not placed any orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) =>
            order.items.map((item) => {
              // ✅ find product details from allProducts
              const product =
                allProducts.find((p) => p._id === item.product) || {};

              return (
                <div
                  key={item._id}
                  className="flex items-start gap-4 bg-white rounded-lg shadow-sm p-3 "
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                  <Link href={`/product/${product.name}/${product._id}`}>
                <Image
                  src={product.images?.[0] || '/Images/1.webp'}
                  alt=' '
                  width={400}
                  height={400}
                  className="w-32 h-auto rounded-md object-cover"
                />
                    </Link>
                  </div>

                  {/* Details */}
                  <div className=" flex items-start justify-batween">
                 <div className="space-y-0.5"> 
                           {/* Status */}
                    <p
                      className={`font-semibold text-md ${
                        order.orderStatus === "delivered"
                          ? "text-green-600"
                          : order.orderStatus === "cancelled"
                          ? "text-red-500"
                          : "text-yellow-600"
                      }`}
                    >
                      {order.orderStatus === "delivered"
                        ? "Delivered"
                        : order.orderStatus === "cancelled"
                        ? "Order Cancelled"
                        : "Order Placed"}
                    </p>
                     {/* Product Name */}
                  
                    <p className="text-sm font-medium text-gray-800">
                      {product.name || "Unknown Product"}
                    </p>
           

                    {/* Delivery/Refund info */}
                    <p className="text-xs text-gray-500">
                      {order.orderStatus === "delivered"
                        ? `Delivered on ${new Date(
                            order.updatedAt
                          ).toLocaleDateString()}`
                        : order.orderStatus === "cancelled"
                        ? "As per your request"
                        : `Delivery by ${new Date(
                            order.createdAt
                          ).toLocaleDateString()}`}
                    </p>
</div>  
               

                    {/* Price, Qty */}
                    {/* <p className="text-xs text-gray-600 mt-1">
                      ₹{item.price * item.quantity} • Qty: {item.quantity}
                    </p> */}

                    {/* Cancel button */}
                    {/* {order.orderStatus === "placed" && (
                      <button
                        onClick={() => cancelOrder(order._id)}
                        className="mt-2 px-3 py-1 text-xs bg-red-500 text-white rounded-md"
                      >
                        Cancel Order
                      </button>
                    )} */}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
