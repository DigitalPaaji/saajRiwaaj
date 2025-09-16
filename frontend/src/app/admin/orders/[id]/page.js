"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useGlobalContext } from "../../../components/context/GlobalContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Image from "next/image";
import Link from "next/link";

const OrderDetails = () => {
  const { id } = useParams();
  const { fetchOrderById } = useGlobalContext();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      setLoading(true);
      const fetchedOrder = await fetchOrderById(id);
      setOrder(fetchedOrder);
      setLoading(false);
    };
    if (id) loadOrder();
  }, [id, fetchOrderById]);

  if (loading) return <Skeleton count={10} height={30} className="mb-2 rounded" />;
  if (!order) return <p className="text-center py-6 text-gray-500">Order not found.</p>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 ">
      <h2 className="text-lg font-semibold mb-4 text-[#99571d] font-mosetta">Order Details</h2>

      {/* Order Summary */}
      <div className="mb-6 space-y-1">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Customer:</strong> {order.shippingAddress?.name || "N/A"}</p>
        <p><strong>Phone:</strong> {order.shippingAddress?.phone || "N/A"}</p>
        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
        <p><strong>Total:</strong> ₹{order.amount}</p>
        <p><strong>Payment:</strong> {order.paymentMethod}</p>
        <p><strong>Status:</strong> {order.orderStatus}</p>
      </div>

      {/* Shipping Address */}
      <div className="mb-6">
        <h3 className="font-semibold text-md mb-2">Shipping Address</h3>
        <p>
          {order.shippingAddress?.addressLine}, {order.shippingAddress?.city},{" "}
          {order.shippingAddress?.state}, {order.shippingAddress?.country} -{" "}
          {order.shippingAddress?.pincode}
        </p>
      </div>

      {/* Items */}
      <h3 className="font-semibold text-md mb-2">Items</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left text-sm text-gray-700">
            <th className="p-3 border-b">Image</th>
            <th className="p-3 border-b">Product</th>
            <th className="p-3 border-b">Quantity</th>
            <th className="p-3 border-b">Price</th>
            <th className="p-3 border-b">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, i) => (
            <tr key={i} className="text-sm hover:bg-gray-50">
              <td className="p-3 border-b">
                <Link href={`/admin/products/view/${item.product._id}`}>
                  <Image
                    alt={item.product?.name || "Product"}
                    width={220}
                    height={220}
                    src={item.product.images?.[0]}
                    className="w-16 h-16 object-cover"
                  />
                </Link>
              </td>
              <td className="p-3 border-b">{item.product?.name || "Unknown"}</td>
              <td className="p-3 border-b">{item.quantity}</td>
              <td className="p-3 border-b">₹{item.price}</td>
              <td className="p-3 border-b">₹{item.quantity * item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetails;
