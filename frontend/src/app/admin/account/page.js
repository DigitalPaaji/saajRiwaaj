"use client";
import { X } from "lucide-react";
import React, { useEffect } from 'react'
import { useGlobalContext } from "../../components/context/GlobalContext";
import { toast } from "react-toastify";
function Account() {
    const {admin,logout, refetchUser } = useGlobalContext()
    useEffect(() => {
    refetchUser();
    }, [refetchUser]);

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
                  onClick={async () => {
                    await logout();
                    toast.success("Logged out!");
                  } }
                >
                  Logout
                </button>
</div>

      </div>
  )
}

export default Account