"use client";
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import { useGlobalContext } from "../../components/context/GlobalContext";
import Banner from "../../components/user/InnerBanner";

export default function OrdersPage() {
  const { allProducts } = useGlobalContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user orders
  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/order/my`, {
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
          `${process.env.NEXT_PUBLIC_LOCAL_PORT}/order/cancel/${id}`,
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

  return (
    <div>
      {/* Banner */}
      <Banner title="My Orders" />

      {/* Content */}
      <div className="px-4 sm:px-8 lg:px-24 xl:px-60 mx-auto my-16">
        {loading ? (
          <p className="text-gray-500">Loading your orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-500">You have not placed any orders yet.</p>
        ) : (
  <div className="space-y-6">
  {orders.map((order) =>
    order.items.map((item) => {
      const product = allProducts.find((p) => p._id === item.product) || {};

      return (
        <div
          key={item._id}
          className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition p-5"
        >
          {/* Grid Layout */}
          <div className="flex flex-wrap  md:grid  md:grid-cols-5 lg:grid-cols-12 px-4 place-items-center">
            {/* 1st Column: Image + Details */}
            {/* <div className="flex items-start gap-4"> */}
              <div className="lg:col-span-1 w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50">
                <Link href={`/product/${product.name}/${product._id}`}>
                  <Image
                    src={product.images?.[0] || "/Images/1.webp"}
                    alt={product.name || " "}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </Link>
              </div>

              <div className="lg:col-span-4 xl:col-span-6 flex flex-col w-full xl:ml-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <p className="text-lg font-medium text-gray-700 font-serif">
                    {product.name || "Unknown Product"}
                  </p>
              
                </div>

                

                <p className="text-sm text-gray-500 mt-1">
                  {order.orderStatus === "delivered"
                    ? `Delivered on ${new Date(
                        order.updatedAt
                      ).toLocaleDateString()}`
                    : order.orderStatus === "cancelled"
                    ? "Cancelled as per your request"
                    : `Estimated by ${new Date(
                        order.createdAt
                      ).toLocaleDateString()}`}
                </p>
              </div>

            {/* </div> */}

            {/* 2nd Column: Qty + Price */}
            <div className="lg:col-span-1 flex md:flex-col items-center md:items-start gap-6 md:gap-0">
              <p className="text-sm text-gray-700">
                Qty: <span className="font-medium">{item.quantity}</span>
              </p>
              <p className="text-lg font-semibold text-[#99571d] md:mt-1">
                ₹{item.price * item.quantity}
              </p>
            </div>
<div className="lg:col-span-2">
                  <span className={` text-center text-xs sm:text-sm font-medium px-3 py-1 rounded-lg ${
                      order.orderStatus === "delivered"
                        ? "bg-green-100 text-green-700"
                        : order.orderStatus === "cancelled"
                        ? "bg-red-100 text-red-600"
                        : order.orderStatus === "shipped"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {order.orderStatus === "delivered"
                      ? "Delivered"
                      : order.orderStatus === "cancelled"
                      ? "Cancelled"
                      : order.orderStatus === "shipped"
                      ? "Shipped"
                      : "Placed"}
                  </span>
                  </div>
            {/* 3rd Column: Buttons */}
            <div className="lg:col-span-4 xl:col-span-2 flex flex-row md:flex-col gap-2 w-full lg:w-fit">
              {order.orderStatus === "placed" && (
                <button
                  onClick={() => cancelOrder(order._id)}
                  className="w-full sm:w-auto px-4 py-2 text-sm font-medium bg-[#c74444] hover:bg-[#da3838] text-white rounded-md shadow-sm"
                >
                  Cancel Order
                </button>
              )}
              {(order.orderStatus === "placed" ||
                order.orderStatus === "shipped") && (
                <button
                  onClick={() => toast.info("Tracking feature coming soon!")}
                  className="w-full sm:w-auto px-4 py-2 text-sm font-medium bg-[#3a67c9] hover:bg-[#3168dd] text-white rounded-md shadow-sm"
                >
                  Track Order
                </button>
              )}
            </div>
          </div>
        </div>
      );
    })
  )}
</div>

        )}
      </div>
    </div>
  );
}
