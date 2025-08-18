"use client";
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from "../../components/context/GlobalContext";
import { toast } from "react-toastify";
import PopupModal from "@/app/components/admin/ConfirmPopup";
function Account() {
    const {admin,logoutAdmin, refetchAdmin } = useGlobalContext()
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);
    useEffect(() => {
    refetchAdmin();
    }, [refetchAdmin]);

  return (
  <div className="flex flex-col  justify-between h-full pb-6">

<div>
          <div className="flex justify-between items-center px-4 py-6 border-b">
  <h2 className="text-xl font-semibold">
    Welcome, {admin?.name}!
  </h2>
   
   </div>
<div className="p-5 space-y-2">
  
  <h4 className="text-lg text-gray-700 font-serif capitalize">{admin?.name}</h4>

  <h4 className="text-md text-gray-700 ">{admin?.email}</h4>
      
</div>

</div>

<div className="w-full text-right ">
 <button
                  className=" mt-2 bg-red-500 text-white px-4 py-2 rounded"
                   onClick={() => setShowLogoutPopup(true)}
                >
                  Logout
                </button>
</div>
   {/* Logout confirmation popup */}
      {showLogoutPopup && (
        <PopupModal
          title="Are you sure you want to logout?"
          onCancel={() => setShowLogoutPopup(false)}
          onConfirm={async () => {
            setShowLogoutPopup(false);
            await logoutAdmin();
            toast.success("Logged out!");
          }}
          confirmText="Logout"
          cancelText="Cancel"
          type="delete"
          showCancel
        />
      )}
      </div>
  )
}

export default Account