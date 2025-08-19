"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";

export default function CheckoutSidebar({ isOpen, setIsOpen, cart, total, discountPercent }) {
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const handlePlaceOrder = async () => {
    try {
      const payload = {
        items: cart.map((c) => ({
          product: c._id,
          quantity: c.quantity,
          price: c.price,
        })),
        shippingAddress: address,
        paymentMethod,
        amount: discountPercent > 0
          ? Math.floor(total * (1 - discountPercent / 100))
          : total,
      };

      const res = await fetch("https://saajriwaaj.onrender.com/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Order placed successfully!");
        setIsOpen(false);
      } else {
        toast.error(data.message || "Failed to place order");
      }
    } catch (err) {
      toast.error("Error placing order");
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-[998]" onClick={() => setIsOpen(false)} />
      )}
      <div className={`fixed top-0 right-0 min-h-screen w-[70%] md:w-[40%] xl:w-[25%] bg-white shadow-lg z-[999] transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-between items-center px-4 py-5 border-b">
          <h2 className="text-xl font-semibold">Checkout</h2>
          <button onClick={() => setIsOpen(false)} className="cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-3 overflow-y-auto">
          <input placeholder="Name" className="border-b p-2 w-full" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} />
          <input placeholder="Phone" className="border-b p-2 w-full" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} />
          <textarea placeholder="Full Address" className="border-b p-2 w-full" value={address.addressLine} onChange={(e) => setAddress({ ...address, addressLine: e.target.value })} />
          <input placeholder="City" className="border-b p-2 w-full" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
          <input placeholder="State" className="border-b p-2 w-full" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} />
          <input placeholder="Pincode" className="border-b p-2 w-full" value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} />

          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="border-b p-2 w-full">
            <option value="COD">Cash On Delivery</option>
            <option value="ONLINE" disabled>Online Payment (coming soon)</option>
          </select>

          <button onClick={handlePlaceOrder} className="w-full bg-[#B67032] text-white py-2 rounded-md">
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}
