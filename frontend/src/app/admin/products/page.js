"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PopupModal from "../../components/admin/ConfirmPopup";
import Image from "next/image";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeletePopup , setShowDeletePopup] = useState(false)
  const [productToDelete, setProductToDelete] = useState("")
  const [IdToDelete, setIdToDelete] = useState("")
  const router = useRouter();


    const fetchProducts = useCallback(async () => {
      try {
        // const res = await fetch(`${Apiurl}/products`);
        const res = await fetch('http://localhost:5000/product/');
        const data = await res.json();
        setProducts(data);
        console.log(data)
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    },[])

    const handleDelete = (product)=>{
      setShowDeletePopup(true)
      setIdToDelete(product._id)
      setProductToDelete(product.name)


    }
    const deleteProduct = useCallback( async ()=>{
    try{
      const res = await fetch(`http://localhost:5000/product/id/${IdToDelete}`,{
        method:'DELETE',
      })
      if(res.ok){
        toast.success('Product Deleted Successfully!');
      
      }else{
        const data = await res.json();
        console.log(data)
        toast.error(data.message || 'Failed to delete Product.')
      }
    }catch(err){
      console.error('Error Deleting Product!',err)
        toast.error('Something went wrong.')

    }
    setShowDeletePopup(false)
    fetchProducts()
  }
,[fetchProducts,IdToDelete])

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);


  return (
   <div className=" w-full">
    <ToastContainer className={'z-[9999]'}/>
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-[#4d4c4b] drop-shadow-sm">
          All Products
        </h2>
        <Link
          href="/admin/products/add"
          className="bg-[#4d4c4b] hover:bg-[#272625] text-white px-4 py-2 rounded-xl shadow transition duration-300 flex items-center"
        >
          <FaPlus className="mr-2" /> Add Product
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg ">
        {loading ? (
          <Skeleton count={5} height={40} className="mb-2 rounded" />
        ) : (
          <table className="min-w-full text-left  ">
            <thead className="bg-[#4d4c4b] text-white text-xl font-medium">
              <tr className="text-sm ">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">NAME</th>
                <th className="px-4 py-3">CATEGORY</th>
                <th className="px-4 py-3">SUB-CATEGORY</th>
                {/* <th className="px-4 py-3">Tags</th> */}
                {/* <th className="px-4 py-3">Featured</th> */}
                {/* <th className="px-4 py-3">New Arrival</th> */}
                {/* <th className="px-4 py-3">Color Variants</th> */}
                <th className="px-4 py-3">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium ">
              {products.map((product, idx) => (
                <tr key={product._id} className=" rounded-xl hover:bg-[#d6d6d6]  transition">
                  <td className="px-4 py-3">{idx + 1}</td>
                  <td className="px-4 py-3"><Image alt='' width={40} height={40}  src={product.colorVariants?.[0]?.images?.[0] || "/placeholder.png"} className="w-full h-auto object-cover"/></td>
                  <td className="px-4 py-3">{product.name}</td>
                  <td className="px-4 py-3 capitalize">{product.category}</td>
                  <td className="px-4 py-3 capitalize">
                    {product.subCategory || '—'}
                  </td>
                  {/* <td className="px-4 py-3">
                    {product.tags?.length > 0
                      ? product.tags.join(', ')
                      : '—'}
                  </td>
                  <td className="px-4 py-3">
                    {product.isFeatured ? 'Yes' : 'No'}
                  </td>
                  <td className="px-4 py-3">
                    {product.isNewArrival ? 'Yes' : 'No'}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {product.colorVariants?.length || 0}
                  </td> */}
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                       <Link href={`/admin/products/view/${product._id}`}
                          className="bg-[#5f5e5e] text-white px-3 py-1 rounded hover:bg-[#333232] transition"
                      >
                        View
                      </Link>
                      <Link  href={`/admin/products/edit/${product._id}`}
                        className="bg-[#ddb461c9] text-black px-3 py-1 rounded hover:bg-[#e8b858] transition"
                      >
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(product)}
                        className="bg-[#dd4747e7] text-white cursor-pointer px-3 py-1 rounded hover:bg-[#ec4242e7] transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {
        showDeletePopup && (
          <PopupModal  title = {`Are you sure you want to delete product -'${productToDelete}'`}
  message = {""}
  onCancel={()=>{setShowDeletePopup(false)}}
  onConfirm={()=>{deleteProduct()}}
  confirmText = {"Delete"}
  cancelText = {"Cancel"}
  type = {"delete"} // options: default | delete | warning | info
  showCancel = {true}
  />
        )
      }
    </div>
  );
};

export default ProductsList;
