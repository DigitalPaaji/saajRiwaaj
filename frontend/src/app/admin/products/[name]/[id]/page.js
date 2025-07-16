"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";

const ProductDetails = () => {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("view"); // 'view' | 'edit' | 'add'

  const isAddMode = id === "add";

  const fetchProduct = async () => {
    try {
      const res = await fetch(`http://localhost:5000/product/id/${id}`);
      const data = await res.json();
      if (res.ok) setProduct(data);
      else toast.error(data.message || "Failed to fetch product");
    } catch (err) {
      toast.error("Error fetching product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAddMode) {
      setMode("view");
      fetchProduct();
    } else {
      setMode("add");
      setLoading(false);
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const renderField = (label, name, type = "text") => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {mode === "view" ? (
        <p className="text-gray-800 font-medium bg-gray-100 px-3 py-2 rounded">
          {product?.[name] || "—"}
        </p>
      ) : (
        <input
          type={type}
          name={name}
          value={product?.[name] || ""}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#4d4c4b]"
        />
      )}
    </div>
  );

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading...</div>;
  }

  if (!product && !isAddMode) {
    return <div className="p-6 text-center text-red-500">Product not found</div>;
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-[#4d4c4b] drop-shadow-sm">
          {mode === "add" ? "Add Product" : mode === "edit" ? "Edit Product" : "Product Details"}
        </h2>
        {mode === "view" && (
          <button
            onClick={() => setMode("edit")}
            className="bg-[#ddb461c9] text-black px-4 py-2 rounded hover:bg-[#e8b858] transition"
          >
            Edit
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-md">
        {renderField("Name", "name")}
        {renderField("Category", "category")}
        {renderField("Sub Category", "subCategory")}
        {renderField("Description", "description")}
        {renderField("Tags", "tags")}
        {/* Add more fields as needed */}

        {/* Color Variants Display or Add */}
        {mode === "view" && product?.colorVariants?.length > 0 && (
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color Variants
            </label>
            <div className="space-y-3">
              {product.colorVariants.map((variant, i) => (
                <div
                  key={i}
                  className="border p-3 rounded-md bg-gray-50 flex flex-col gap-1"
                >
                  <p><strong>Color:</strong> {variant.colorName}</p>
                  <p><strong>Price:</strong> ₹{variant.price}</p>
                  <p><strong>Discount:</strong> {variant.discount}%</p>
                  <p><strong>Final Price:</strong> ₹{variant.finalPrice}</p>
                  <p><strong>Quantity:</strong> {variant.quantity}</p>
                  <div className="flex gap-2 mt-1">
                    {variant.images.map((img, idx) => (
                      <Image
                        key={idx}
                        src={img}
                        alt={`Variant ${i} Image ${idx}`}
                        width={60}
                        height={60}
                        className="rounded border"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {mode !== "view" && (
          <div className="col-span-full">
            <button
              className="bg-[#4d4c4b] text-white px-6 py-2 rounded hover:bg-[#333] transition"
              onClick={() => toast.success(`${mode === "add" ? "Added" : "Updated"} successfully!`)}
            >
              {mode === "add" ? "Add Product" : "Update Product"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
