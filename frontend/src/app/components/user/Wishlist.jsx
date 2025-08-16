"use client";
import { useGlobalContext } from "../context/GlobalContext";
import { X } from "lucide-react";
import Image from "next/image";
import { React } from "react";

export default function CartSidebar() {
  const { isWishlistOpen, setIsWishlistOpen, wishlist, removeFromCart, updateQty } = useGlobalContext();

  return (
    <>
    {isWishlistOpen && (
  <div
    className="fixed inset-0 bg-black/50 z-[998]"
    onClick={() => setIsWishlistOpen(false)} // close on overlay click
  />
)}

 
    <div
      className={`fixed top-0 right-0 min-h-screen 
         w-[70%] md:w-[40%] xl:w-[25%] bg-white shadow-lg z-[999] transition-transform duration-300 ${
        isWishlistOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >



      <div className="flex justify-between items-center px-4 py-6 border-b">
        <h2 className="text-xl font-semibold">Wishlist</h2>
        <button className="cursor-pointer" onClick={() => setIsWishlistOpen(false)}>
          <X className="w-5 h-5" />
        </button>
      </div>

      {wishlist.length === 0 ? (
       <div className="flex items-center justify-center h-full w-full text-center text-gray-500 px-6">
   <div className="flex flex-col items-center justify-center">
  <img
    src="/Images/cart.gif" 
    alt="Empty Cart"
    className="w-40 h-40 mb-4 "
  />
  <p className="text-md">Your Wishlist Is Empty</p>
  </div>
</div>

      ) : (
        <div className="flex flex-col justify-between h-full">
          <div className="p-4 space-y-4 overflow-y-auto flex-1">
            {wishlist.map((item) => (
              <div key={item._id} className="flex items-start gap-4 text-md">
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  width={400}
                  height={400}
                  className="w-32 h-32 rounded-md object-cover"
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
                  <X className="w-5 h-5 text-red-500" />
                </button>
              </div>
            ))}
          </div>

     <div className="p-4 border-t space-y-4">
  <button
    onClick={() => setIsWishlistOpen(false)}
    className="text-center text-md text-[#B67032] underline mt-3 w-full"
  >
    Continue Shopping
  </button>
</div>


        </div>
      )}
    </div>
       </>
  );
}
