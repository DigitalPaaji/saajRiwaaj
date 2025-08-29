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
      const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/user/update`, {
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
          onClick={logoutUser}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Account;
        









// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   X,
//   Pencil,
//   User,
//   Mail,
//   Phone,
//   MapPin,
//   Loader2,
//   LogOut,
// } from "lucide-react";
// import { toast } from "react-toastify";
// import { useGlobalContext } from "../context/GlobalContext";
// const Apiurl = process.env.NEXT_PUBLIC_LOCAL_PORT;

// function Account() {
//   const { user, setIsAuthOpen, logoutUser, refetchUser } = useGlobalContext();
//   const [isEditing, setIsEditing] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);

//   const [formData, setFormData] = useState({
//     phone: "",
//     addressLine: "",
//     city: "",
//     state: "",
//     country: "",
//     pincode: "",
//   });

//   // Load user
//   useEffect(() => {
//     refetchUser();
//   }, [refetchUser]);

//   // Sync form data
//   useEffect(() => {
//     if (user) {
//       setFormData({
//         phone: user.phone || "",
//         addressLine: user.address?.addressLine || "",
//         city: user.address?.city || "",
//         state: user.address?.state || "",
//         country: user.address?.country || "",
//         pincode: user.address?.pincode || "",
//       });
//     }
//   }, [user]);

//   const handleChange = (e) =>
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));


// const handleSave = async () => {
//   try {
//     setIsSaving(true);

//     const payload = {
//       phone: formData.phone,
//       address: {
//         addressLine: formData.addressLine,
//         city: formData.city,
//         state: formData.state,
//         country: formData.country,
//         pincode: formData.pincode,
//       },
//     };

//     const res = await fetch(`${Apiurl}/user/update`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify(payload),
//     });

//     // Try to parse JSON only when present
//     const ct = res.headers.get("content-type") || "";
//     const data = ct.includes("application/json") ? await res.json() : { message: await res.text() };

//     if (!res.ok) {
//       throw new Error(data?.message || `HTTP ${res.status}`);
//     }

//     toast.success("Profile updated!");
//     setIsEditing(false);
//     refetchUser();
//   } catch (err) {
//     toast.error(err?.message || "Update failed!");
//   } finally {
//     setIsSaving(false);
//   }
// };



//   // const handleSave = async () => {
//   //   try {
//   //     setIsSaving(true);
//   //     const payload = {
//   //       phone: formData.phone,
//   //       address: {
//   //         addressLine: formData.addressLine,
//   //         city: formData.city,
//   //         state: formData.state,
//   //         country: formData.country,
//   //         pincode: formData.pincode,
//   //       },
//   //     };

//   //     const res = await fetch("https://saajriwaaj.onrender.com/user/update", {
//   //       method: "PUT",
//   //       headers: { "Content-Type": "application/json" },
//   //       credentials: "include",
//   //       body: JSON.stringify(payload),
//   //     });
//   //     const data = await res.json();
//   //     if (res.ok) {
//   //       toast.success("Profile updated!");
//   //       setIsEditing(false);
//   //       refetchUser();
//   //     } else {
//   //       toast.error(data.message || "Update failed!");
//   //     }
//   //   } catch {
//   //     toast.error("Something went wrong!");
//   //   } finally {
//   //     setIsSaving(false);
//   //   }
//   // };

//   return (
//     <div className="bg-white h-full w-full max-w-sm flex flex-col">
//       {/* Header */}
//       <div className="flex justify-between items-center px-4 py-3 border-b">
//         <h2 className="text-lg font-semibold">My Profile</h2>
//         <button onClick={() => setIsAuthOpen(false)}>
//           <X className="w-5 h-5" />
//         </button>
//       </div>

//       {/* Scrollable content */}
//       <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
//         <div className="space-y-3">
//           {/* Always read-only */}
//           <InfoRow icon={<User />} label="Full Name" value={user?.name} />
//           <InfoRow icon={<Mail />} label="Email" value={user?.email} />

//           {/* Editable rows */}
//           {!isEditing ? (
//             <>
//               <InfoRow icon={<Phone />} label="Phone" value={user?.phone} />
//               <InfoRow
//                 icon={<MapPin />}
//                 label="Address"
//                 value={
//                   user?.address
//                     ? `${user.address.addressLine || ""} ${user.address.city || ""} ${user.address.state || ""} ${user.address.country || ""} - ${user.address.pincode || ""}`
//                     : "-"
//                 }
//               />
//               <button
//                 className="flex items-center gap-1 px-3 py-1 bg-[#B67032] text-white text-sm rounded mt-2"
//                 onClick={() => setIsEditing(true)}
//               >
//                 <Pencil className="w-4 h-4" /> Edit
//               </button>
//             </>
//           ) : (
//             <>
//               <EditableRow
//                 icon={<Phone />}
//                 label="Phone"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//               />
//               <EditableRow
//                 icon={<MapPin />}
//                 label="Address Line"
//                 name="addressLine"
//                 value={formData.addressLine}
//                 onChange={handleChange}
//               />
//               <EditableRow
//                 icon={<MapPin />}
//                 label="City"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//               />
//               <EditableRow
//                 icon={<MapPin />}
//                 label="State"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleChange}
//               />
//               <EditableRow
//                 icon={<MapPin />}
//                 label="Country"
//                 name="country"
//                 value={formData.country}
//                 onChange={handleChange}
//               />
//               <EditableRow
//                 icon={<MapPin />}
//                 label="Pincode"
//                 name="pincode"
//                 value={formData.pincode}
//                 onChange={handleChange}
//               />

//               <div className="flex gap-2 pt-2">
//                 <button
//                   className="flex-1 bg-gray-300 text-sm py-2 rounded"
//                   onClick={() => setIsEditing(false)}
//                   disabled={isSaving}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="flex-1 bg-[#B67032] text-white text-sm py-2 rounded flex items-center justify-center gap-1"
//                   onClick={handleSave}
//                   disabled={isSaving}
//                 >
//                   {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
//                   Save
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Footer with logout */}
//       <div className="border-t px-4 py-3">
//         <button
//           className="flex items-center gap-2 w-full justify-center bg-red-500 text-white py-2 rounded text-sm"
//           onClick={async () => {
//             await logoutUser();
//             toast.success("Logged out!");
//           }}
//         >
//           <LogOut className="w-4 h-4" /> Logout
//         </button>
//       </div>
//     </div>
//   );
// }

// /* 🔹 Sub-components */
// const InfoRow = ({ icon, label, value }) => (
//   <div className="flex items-start gap-2 text-md">
//     <div className="text-gray-500 mt-1">{icon}</div>
//     <div>
//       <p className="text-sm text-gray-500">{label}</p>
//       <p className="font-medium">{value || "-"}</p>
//     </div>
//   </div>
// );

// const EditableRow = ({ icon, label, name, value, onChange }) => (
//   <div className="flex items-start gap-2 text-md">
//     <div className="text-gray-500 mt-2">{icon}</div>
//     <div className="flex-1">
//       <label className="text-sm text-gray-500">{label}</label>
//       <input
//         type="text"
//         name={name}
//         value={value}
//         onChange={onChange}
//         className="border-b border-gray-500 focus:outline-none  px-2 py-1 w-full text-md"
//       />
//     </div>
//   </div>
// );

// export default Account;
