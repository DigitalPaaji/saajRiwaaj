"use client";
// import { useGlobalContext } from "../../components/context/GlobalContext";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";


export default function AuthSidebar() {
  // const { setUser } = useGlobalContext();
  const [form, setForm] = useState({
 
    email: "",
    password: "",

  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState('');

  const loginUser = async ({email,password})=>{
    const res = await fetch("http://localhost:5000/user/login",{
      method:'POST',
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify({ email, password }),
      credentials:'include',
    })
    const data = await res.json()
       if (!res.ok) {
    const errorMessage =
      data.message ||
      (data.errors && Object.values(data.errors)[0]?.message) ||
      "Login failed.";
    throw new Error(errorMessage);
  }
      if (data.user.role !== "admin") {
    throw new Error("You are not authorized as admin");
  }
    localStorage.setItem('saajUser',JSON.stringify(data.user))
    localStorage.setItem('saajToken',data.token)
    // setUser(data.user)
  

  return data;
  }


  const handleLogin = async () => {
    const {email, password} = form;
    let errors ={}
     if (!email) {
      errors.email = "Email is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) errors.email = "Invalid email format.";
    }

    if(!password) errors.password = "Password is required.";
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setError("");
    setFieldErrors({});
    try {
    const data = await loginUser({ email, password });
    toast.success("Login Successful!");
    console.log("Logged In User:", data.user);

    // You can save user in localStorage or context here
    setForm({  email: "", password: "" });
  if (data.user.role === "admin") {
      window.location.href = "/admin";
    }
  } catch (err) {
    // console.error("Login Error:", err);
    setError(err.message || "Something went wrong.");
  }
  }



  return (
    <>
   

    <div className="flex items-center flex-col justify-center mx-auto py-24">
      <ToastContainer />

    



        <div className="flex justify-between items-center px-4 py-6 border-b">
            <h2 className="text-xl font-semibold">
            ADMIN PANEL
            </h2>


          
        </div>
        <div className="p-5 space-y-4">
              <>
                <input
                  type="email"
                  placeholder="Email"
                  value={ form.email}
             
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-400 p-2 rounded" />
                {fieldErrors.email && <p className="text-red-500 text-sm">{fieldErrors.email}</p>}
              </>
              <>
                <input
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full border border-gray-400 p-2 rounded" />
                {fieldErrors.password && <p className="text-red-500 text-sm">{fieldErrors.password}</p>}
              </>
             
             
                <p className="text-right text-sm text-blue-600 cursor-pointer">
                  Forgot password?
                </p>
<p className="text-red-500 mx-auto w-fit">{error}</p>
              <button
                className="w-full bg-[#B67032] text-white py-2 rounded"
                onClick={handleLogin}

              >
           Login
                
              </button>


         
         
           

              <div className="text-center text-sm text-stone-500">or</div>

              <button className="w-full border py-2 rounded">
                Continue with Google
              </button>
        </div>


    </div>
     </>
  );
}
