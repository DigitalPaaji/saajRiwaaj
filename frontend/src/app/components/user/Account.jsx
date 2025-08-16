"use client";
import { X } from "lucide-react";
import React, { useEffect } from 'react'
import { useGlobalContext } from "../context/GlobalContext";
import { toast } from "react-toastify";
function Account() {
    const {user,  setIsAuthOpen,logoutUser, refetchUser } = useGlobalContext()
    useEffect(() => {
    refetchUser();
    }, [refetchUser]);

  return (
  <div className="flex flex-col  justify-between h-full pb-6">

<div>
          <div className="flex justify-between items-center px-4 py-6 border-b">
  <h2 className="text-xl font-semibold">
    Welcome, {user?.name}!
  </h2>
     <button onClick={() => setIsAuthOpen(false)}>
          <X className="w-5 h-5" />
        </button>
   </div>
<div className="p-5 space-y-2">
  
  <h4 className="text-lg text-gray-700 font-serif capitalize">{user?.name}</h4>

  <h4 className="text-md text-gray-700 ">{user?.email}</h4>
      
</div>
   
            
       
</div>

<div className="w-full text-right ">
 <button
                  className=" mt-2 bg-red-500 text-white px-4 py-2 rounded"
                  onClick={async () => {
                    await logoutUser();
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