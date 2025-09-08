"use client";

import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useGlobalContext } from "../../components/context/GlobalContext";

const OrdersList = () => {
  const { orders, loadingOrders, fetchOrders } = useGlobalContext();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="w-full">
      <ToastContainer className="z-[9999]" />
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-[#4d4c4b] drop-shadow-sm">
          All Orders
        </h2>
      </div>

      <div className="overflow-x-auto rounded-lg">
        {loadingOrders ? (
          <Skeleton count={5} height={40} className="mb-2 rounded" />
        ) : orders.length === 0 ? (
          <p className="text-center py-6 text-gray-500">No orders found.</p>
        ) : (
          <table className="min-w-full text-left">
            <thead className="bg-[#4d4c4b] text-white text-xl font-medium">
              <tr className="text-sm">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium">
              {orders.map((order, idx) => (
                <tr
                  key={order._id}
                  className="rounded-xl hover:bg-[#d6d6d6] transition"
                >
                  <td className="px-4 py-3">{idx + 1}</td>
                  <td className="px-4 py-3">{order._id}</td>
                  <td className="px-4 py-3">
                    {order.userId?.name || "N/A"}
                  </td>
                  <td className="px-4 py-3">₹{order.amount}</td>
                  <td className="px-4 py-3">
                    {order.paymentMethod} ({order.paymentStatus})
                  </td>
                  <td className="px-4 py-3 capitalize">
                    {order.orderStatus}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrdersList;
