import "../globals.css";
import { GlobalProvider } from "../components/context/GlobalContext";
import Sidebar from "../components/admin/Sidebar";
import { toast, ToastContainer } from "react-toastify";
export default function AdminLayout({ children }) {
  


  return (
    <html lang="en">
        <body>
            <ToastContainer className={"z-[999999]"} />
    <div className="relative flex h-screen  bg-[#e0e0e0] transition-all duration-300 text-[#333] font-sans ">
      {/* Sidebar */}
<Sidebar/>


      {/* Main Content */}
      <main className="flex-1  p-8  overflow-y-auto shadow-2xl ">
        <GlobalProvider>
       
        {children}
         </GlobalProvider>
      </main>
      </div>
   </body>
     </html>
  )
}
