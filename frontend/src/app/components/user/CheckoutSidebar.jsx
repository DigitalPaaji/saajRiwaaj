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

      <div className={`fixed top-0 right-0 min-h-screen w-[85%] sm:w-[55%] md:w-[45%] xl:w-[30%] bg-white shadow-lg z-[999] transition-transform duration-300
      ${isOpen ? "translate-x-0" : "translate-x-full"}`}>

        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b-[1px]">
          <h2 className="text-xl font-bold">Delivery Details</h2>
          <button onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-6 overflow-y-auto text-sm">

          {/* Address Section */}
          <div className="space-y-3">
            <input value={address.name} placeholder="Full Name" onChange={(e)=>setAddress({...address,name:e.target.value})}
              className="border rounded-md w-full p-2 focus:border-black" />
            <input value={address.phone} placeholder="Phone Number" onChange={(e)=>setAddress({...address,phone:e.target.value})}
              className="border rounded-md w-full p-2 focus:border-black" />
            <textarea value={address.addressLine} placeholder="House / Street Address" onChange={(e)=>setAddress({...address,addressLine:e.target.value})}
              className="border rounded-md w-full p-2 focus:border-black" rows={2} />
            <div className="flex gap-3">
              <input value={address.city} placeholder="City" onChange={(e)=>setAddress({...address,city:e.target.value})}
                className="border rounded-md w-full p-2 focus:border-black" />
              <input value={address.state} placeholder="State" onChange={(e)=>setAddress({...address,state:e.target.value})}
                className="border rounded-md w-full p-2 focus:border-black" />
            </div>
            <input value={address.pincode} placeholder="Pincode" onChange={(e)=>setAddress({...address,pincode:e.target.value})}
              className="border rounded-md w-full p-2 focus:border-black" />
          </div>

          <hr />

          {/* Payment Section */}
          <div className="space-y-3">
            <h3 className="font-semibold">Payment Method</h3>
            <select value={paymentMethod} onChange={(e)=>setPaymentMethod(e.target.value)}
              className="border rounded-md p-2 w-full focus:border-black">
              <option value="COD">Cash on Delivery</option>
              <option value="ONLINE" disabled>Online Payment (coming soon)</option>
            </select>
          </div>

          {/* Amount */}
          <div className="flex justify-between font-semibold text-base mt-3">
            <span>Total Amount</span>
            <span>₹{discountPercent>0 ? Math.floor(total*(1-discountPercent/100)): total}</span>
          </div>

          <button onClick={handlePlaceOrder} className="block w-full bg-[#B67032] hover:bg-[#9c5a2b] text-white py-3 rounded-md text-center mt-2 font-semibold">
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}
