"use client";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { toast } from "react-toastify";

function Account() {
  const { user, setIsAuthOpen, logoutUser, refetchUser } = useGlobalContext();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  useEffect(() => {
    refetchUser();
  }, [refetchUser]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        addressLine: user.address?.addressLine || "",
        city: user.address?.city || "",
        state: user.address?.state || "",
        country: user.address?.country || "",
        pincode: user.address?.pincode || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch("https://saajriwaaj.onrender.com/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Profile updated!");
        refetchUser();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Update failed!");
    }
  };

  return (
    <div className="bg-[#b87d4921] flex flex-col h-full pb-6">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-6 border-b">
        <h2 className="text-xl font-semibold">My Profile</h2>
        <button onClick={() => setIsAuthOpen(false)}>
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Profile Form */}
      <div className="p-5 space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="addressLine"
          placeholder="Address Line"
          value={formData.addressLine}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          className="w-full bg-[#B67032] text-white py-2 rounded"
          onClick={handleSave}
        >
          Save Changes
        </button>
      </div>

      {/* Logout */}
      <div className="w-full text-right px-5">
        <button
          className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
          onClick={async () => {
            await logoutUser();
            toast.success("Logged out!");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Account;
        