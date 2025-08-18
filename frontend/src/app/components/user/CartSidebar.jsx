"use client";
import { useGlobalContext } from "../context/GlobalContext";
import { X } from "lucide-react";
import Image from "next/image";
import { React, useState } from "react";
import { toast } from "react-toastify";
import CheckoutSidebar from "./CheckoutSidebar";

export default function CartSidebar() {
  const { isCartOpen, setIsCartOpen, cart, removeFromCart, updateQty } = useGlobalContext();
const [coupon, setCoupon] = useState("");
const [appliedCoupon, setAppliedCoupon] = useState("");
const [discountPercent, setDiscountPercent] = useState(0);
const [showCheckout, setShowCheckout] = useState(false);
const handleApplyCoupon = async () => {
  const code = coupon.trim();
  if (!code) return;

  try {
    const res = await fetch(`http://localhost:5000/coupon/${code}`);
    const data = await res.json();

    if (res.ok && data.valid) {
      setAppliedCoupon(code);
      setDiscountPercent(data.discountPercent);
    } else {
      setAppliedCoupon("");
      setDiscountPercent(0);
      toast.error(data.message || "Invalid coupon code");
    }
  } catch (err) {
    toast.error("Failed to validate coupon");
  }
};


  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
    {isCartOpen && (
  <div
    className="fixed inset-0 bg-black/50 z-[998]"
    onClick={() => setIsCartOpen(false)} // close on overlay click
  />
)}

 
    <div
      className={`fixed top-0 right-0 min-h-screen 
         w-[70%] md:w-[40%] xl:w-[25%] bg-white shadow-lg z-[999] transition-transform duration-300 ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >



      <div className="flex justify-between items-center px-4 py-6 border-b border-[#4b4b4b]">
        <h2 className="text-xl font-semibold">Cart</h2>
        <button className="cursor-pointer" onClick={() => setIsCartOpen(false)}>
          <X className="w-5 h-5" />
        </button>
      </div>

      {cart.length === 0 ? (
       <div className="flex items-center justify-center h-full w-full text-center text-gray-500 px-6">
   <div className="flex flex-col items-center justify-center">
  <img
    src="/Images/cart.gif" 
    alt="Empty Cart"
    className="w-40 h-40 mb-4 "
  />
  <p className="text-md">Your Cart Is Empty</p>
  </div>
</div>

      ) : (
        <div className="flex flex-col justify-between h-full">
          <div className="p-4 space-y-4 overflow-y-auto flex-1">
            {cart.map((item) => (
              <div key={item._id} className="flex items-start gap-4 text-md">
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  width={400}
                  height={400}
                  className="w-24 h-24 rounded-md object-cover"
                />
                <div className="flex-1 space-y-2">
                  <p className="  ">{item.name}</p>
                  <p className="">₹{item.price}</p>
                  <div className="flex items-center gap-2 ">
                    <button
                      className="cursor-pointer px-2 text-md bg-gray-100"
                      onClick={() =>
                        updateQty(item._id, Math.max(1, item.quantity - 1))
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="cursor-pointer px-2 bg-gray-100"
                      onClick={() => updateQty(item._id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item._id)} className="cursor-pointer">
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </div>
            ))}
          </div>

     <div className="p-4   space-y-4">
  {/* Coupon Input */}
  <div className="flex gap-2">
    <input
      type="text"
      placeholder="Enter coupon"
      value={coupon}
      onChange={(e) => setCoupon(e.target.value.toUpperCase())}
      className="flex-1 border-b border-[#4b4b4b]   text-md  outline-none"
    />
    <button
      onClick={handleApplyCoupon}
      className="bg-[#B67032] text-white px-4 py-2 rounded-md text-md"
    >
      Apply
    </button>
  </div>

  {/* Discount Summary */}
  <div className="text-md space-y-1">
    <div className="flex justify-between">
      <span>Shipping</span>
      <span className="text-gray-500">Calculated at checkout</span>
    </div>
    {discountPercent > 0 && (
      <div className="flex justify-between text-green-600">
        <span>Discount ({appliedCoupon})</span>
        <span>- ₹{Math.floor((total * discountPercent) / 100)}</span>
      </div>
    )}
    <div className="flex justify-between font-semibold text-base">
      <span>Subtotal</span>
      <span>₹
        {discountPercent > 0
          ? Math.floor(total * (1 - discountPercent / 100))
          : total}
      </span>
    </div>
  </div>

  <button
  onClick={() => setShowCheckout(true)}
  className="w-full bg-[#B67032] text-white py-2 mt-4 rounded-md">
    Place Order
  </button>



  <button
    onClick={() => setIsCartOpen(false)}
    className="text-center text-md text-[#B67032] underline mt-3 w-full"
  >
    Or Continue Shopping
  </button>
</div>


        </div>
      )}


    </div>

    <CheckoutSidebar
  isOpen={showCheckout}
  setIsOpen={setShowCheckout}
  cart={cart}
  total={total}
  discountPercent={discountPercent}
/>
       </>
  );
}
