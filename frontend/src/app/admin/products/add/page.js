'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { UploadCloud, X, Loader2, Tag } from 'lucide-react';
import Image from 'next/image';
import { FaPlus, FaRupeeSign } from 'react-icons/fa';
import { toast, ToastContainer } from "react-toastify";



// IMPORTANT: Replace with your Cloudinary details
const CLOUDINARY_CLOUD_NAME = "dj0z0q0ut";
const CLOUDINARY_UPLOAD_PRESET = "saajRiwaajProducts";

// --- Reusable Tailwind Class Strings ---
const inputClasses = "w-full px-3 py-2 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg  transition duration-200 shadow-sm appearance-none";
const labelClasses = "block mb-1 text-sm font-medium text-gray-700";
const buttonClasses = {
    primary: "px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none  transition-colors duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center",
    destructive: "h-6 w-6 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-opacity",
};
const cardClasses = "bg-white p-6 rounded-xl shadow-sm border border-gray-200";

// --- Image Uploader Logic (as a render function within the page) ---
const ImageUploader = ({ onUpload, onRemove, images, uploaderId, maxFiles = 5, isUploading }) => {
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
        else if (e.type === "dragleave") setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onUpload(e.dataTransfer.files);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            onUpload(e.target.files);
        }
    };

    return (
        <div className="space-y-4">
            <div 
                onDragEnter={handleDrag} 
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'}`}
            >
                <input ref={inputRef} type="file" id={uploaderId} multiple accept="image/*" onChange={handleChange} className="hidden" />
                <label htmlFor={uploaderId} className="cursor-pointer">
                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600"><span className="font-semibold text-blue-600">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                </label>
                 {isUploading && (
                    <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-500">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Uploading...</span>
                    </div>
                )}
            </div>
           
            {images.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                    {images.map((url, index) => (
                        <div key={index} className="relative aspect-square group">
                            <Image
  src={url}
  alt={`Preview ${index + 1}`}
  width={300}
  height={300}
  className="w-full h-full object-cover rounded-lg shadow-sm"
  unoptimized // Optional if using external URLs without loader config
/>
                            <button type="button" className={`cursor-pointer absolute top-1 right-1 opacity-0 group-hover:opacity-100 ${buttonClasses.destructive}`} onClick={() => onRemove(index)}>
                                <X className="h-4 w-4 " />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


export default function AddProductPage() {
      const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  

    const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5000/category/");
      const data = await res.json();
    //   console.log(data)
      setCategories(data.cats || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  }, []);


  const fetchTags = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5000/tag/");
      const data = await res.json();
    //   console.log(data)
      setTags(data.tags || []);
    } catch (err) {
      console.error("Error fetching tags:", err);
    }
  }, []);


  useEffect(() => {
    fetchTags();
    fetchCategories();
  }, [fetchTags, fetchCategories]);

    const [product, setProduct] = useState({
        name: '', category: '', subCategory: '', description: '', tags: [],
        isFeatured: false, isNewArrival: false, price: '', discount: '',
        images: [], colorVariants: []
    });
    
    const [finalPrice, setFinalPrice] = useState('0.00');
    const [tagInput, setTagInput] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Variant-specific state
    const [variant, setVariant] = useState({ colorName: '', quantity: 1, images: [] });
    
    // Upload-specific state
    const [isMainUploading, setIsMainUploading] = useState(false);
    const [isVariantUploading, setIsVariantUploading] = useState(false);

    // --- Effects ---
    useEffect(() => {
        const price = parseFloat(product.price) || 0;
        const discount = parseFloat(product.discount) || 0;
        const final = price - (price * discount / 100);
        setFinalPrice(final.toFixed(2));
    }, [product.price, product.discount]);

    // --- Handlers ---
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

//     const handleTagInput = (e) => {
//         if (e.key === 'Enter' && tagInput.trim()) {
//             e.preventDefault();
//             if (!product.tags.includes(tagInput.trim())) {
//                 setProduct(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
//             }
//             setTagInput('');
//         }
//     };
    
// const removeTag = (tagToRemoveId) => {
//   setProduct(prev => ({
//     ...prev,
//     tags: prev.tags.filter(tagId => tagId !== tagToRemoveId),
//   }));
// };

    const handleFileUpload = useCallback(async (files, type) => {
        const setIsLoading = type === 'main' ? setIsMainUploading : setIsVariantUploading;
        const onComplete = (urls) => {
            if (type === 'main') {
                setProduct(prev => ({ ...prev, images: [...prev.images, ...urls]}));
            } else {
                setVariant(prev => ({ ...prev, images: [...prev.images, ...urls]}));
            }
        };

        setIsLoading(true);
        const uploadPromises = Array.from(files).map(file => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
            return fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, { method: 'POST', body: formData }).then(res => res.json());
        });

        try {
            const results = await Promise.all(uploadPromises);
            onComplete(results.map(r => r.secure_url).filter(Boolean));
        } catch (error) {
            toast.error("Image upload failed. Please check credentials and try again.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleAddVariant = () => {
        if (!variant.colorName) return toast.warning('Please enter a color name.');
        setProduct(prev => ({ ...prev, colorVariants: [...prev.colorVariants, variant]}));
        setVariant({ colorName: '', quantity: 1, images: [] }); // Reset for next variant
    };

    const removeVariant = (indexToRemove) => {
        setProduct(prev => ({ ...prev, colorVariants: prev.colorVariants.filter((_, i) => i !== indexToRemove) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
          if (product.images.length === 0) {
    toast.error("Please upload at least one product image.");
    return;
  }
        setIsSubmitting(true);
        try {
            const response = await fetch('http://localhost:5000/product/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...product, finalPrice: parseFloat(finalPrice) }),
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            toast.success('Product added successfully!');
        
          

        } catch (error) {
            toast.error('Failed to add product. Check console for details.');
            console.error('Submission Error:', error);
        } finally {
            setIsSubmitting(false);
              setProduct({
        name: '', category: '', subCategory: '', description: '', tags: [],
        isFeatured: false, isNewArrival: false, price: '', discount: '',
        images: [], colorVariants: []
    })
        }
    };

    return (
        <div className="">
            <ToastContainer position="top-right" autoClose={2000} />
            <div className=" ">
                <form onSubmit={handleSubmit}>
                
                   
                    <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                        <h1 className="text-2xl font-bold text-[#4d4c4b] drop-shadow-sm">Add New Product</h1>
                        <button type="submit" disabled={isSubmitting} className='cursor-pointer bg-[#4d4c4b] hover:bg-[#272625] text-white px-4 py-2 rounded-xl shadow transition duration-300 flex items-center'>
                         <FaPlus className="mr-2" />     {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isSubmitting ? "Submitting..." : "Add Product"}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className={cardClasses}>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Information</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className={labelClasses}>Product Name</label>
                                        <input id="name" name="name" value={product.name} onChange={handleInputChange} placeholder="e.g., Elegant Diamond Necklace" required className={inputClasses} />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                     <div>
  <label htmlFor="category" className={labelClasses}>Category</label>
  <select
    name="category"
    value={product.category}
    onChange={handleInputChange}
    required
    className={inputClasses}
  >
    <option value="" disabled>Select a category</option>
    {categories.map((cat) => (
      <option key={cat._id} value={cat._id}>
        {cat.name}
      </option>
    ))}
  </select>
</div>

                                        <div>
                                            <label htmlFor="subCategory" className={labelClasses}>Sub-category (Optional)</label>
                                            <input id="subCategory" name="subCategory" value={product.subCategory} onChange={handleInputChange} placeholder="e.g., Pendants" className={inputClasses} />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="description" className={labelClasses}>Description</label>
                                        <textarea id="description" name="description" value={product.description} onChange={handleInputChange} placeholder="Detailed product description..." className={inputClasses} rows="4"></textarea>
                                    </div>
                                
                                </div>
                            </div>
                            
                                    <div className={cardClasses}>
                               <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Images</h3>
                               <ImageUploader onUpload={(files) => handleFileUpload(files, 'main')} onRemove={(idx) => setProduct(p => ({...p, images: p.images.filter((_, i) => i !== idx)}))} images={product.images} uploaderId="main-uploader" isUploading={isMainUploading} />
                                </div>


                           <div className={cardClasses}>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Color Variants</h3>
                                <div className="space-y-4 p-4 border rounded-lg">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div><label htmlFor="colorName" className={labelClasses}>Color Name</label><input id="colorName" placeholder="e.g., Rose Gold" value={variant.colorName} onChange={(e) => setVariant(v => ({...v, colorName: e.target.value}))} className={inputClasses} /></div>
                                        <div><label htmlFor="quantity" className={labelClasses}>Quantity</label><input id="quantity" type="number" placeholder="1" value={variant.quantity} onChange={(e) => setVariant(v => ({...v, quantity: parseInt(e.target.value, 10) || 1}))} min="1" className={inputClasses} /></div>
                                    </div>
                                    {/* <div><label className={labelClasses}>Variant Images (Optional)</label><ImageUploader onUpload={(files) => handleFileUpload(files, 'variant')} onRemove={(idx) => setVariant(v => ({...v, images: v.images.filter((_, i) => i !== idx)}))} images={variant.images} uploaderId="variant-uploader" maxFiles={3} isUploading={isVariantUploading} /></div> */}
                                    <button type="button" onClick={handleAddVariant} className={buttonClasses.primary + " w-full"}>Add Variant</button>
                                </div>
                                {product.colorVariants.length > 0 && <div className="space-y-2 pt-4"><label className={labelClasses}>Added Variants</label><div className="flex flex-wrap gap-2">{product.colorVariants.map((v, i) => (<div key={i} className="bg-gray-100 rounded-lg p-2 flex items-center justify-between text-sm w-full"><div className="flex items-center gap-2"><span className="font-semibold">{v.colorName}</span><span className="text-gray-500">(Qty: {v.quantity})</span></div><button type="button" onClick={() => removeVariant(i)} className="text-gray-400 hover:text-red-500"><X className="w-4 h-4" /></button></div>))}</div></div>}
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-8">
                            <div className={cardClasses + " space-y-4"}>
                                <h3 className="text-lg font-semibold text-gray-800">Pricing</h3>
                                <div><label htmlFor="price" className={'labelClasses + flex items-center'}>Price (<FaRupeeSign className='w-3 h-3 '/>)</label><input id="price" name="price" type="number" value={product.price} onChange={handleInputChange} placeholder="0.00" required className={inputClasses} /></div>
                                <div><label htmlFor="discount" className={'labelClasses + flex items-center'}>Discount (%)</label><input id="discount" name="discount" type="number" value={product.discount ?? 0} onChange={handleInputChange} placeholder="0" className={inputClasses} /></div>
                                <div><label className={'labelClasses + flex items-center'}>Final Price (<FaRupeeSign className='w-3 h-3 '/>)</label><div className="p-2 mt-1 rounded-md bg-gray-100 font-semibold text-gray-700 flex items-center"><FaRupeeSign className='w-3 h-3 '/> {finalPrice}</div></div>
                            </div>

                             <div className={cardClasses + " space-y-3"}>
                                <h3 className="text-lg font-semibold text-gray-800">Visibility</h3>
                                 <label className="flex items-center space-x-3 cursor-pointer"><input type="checkbox" name="isFeatured" checked={product.isFeatured} onChange={handleInputChange} className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /><span>Featured Product</span></label>
                                  <label className="flex items-center space-x-3 cursor-pointer"><input type="checkbox" name="isNewArrival" checked={product.isNewArrival} onChange={handleInputChange} className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /><span>New Arrival</span></label>
                            </div>
                         <div>
  <label htmlFor="tags" className={labelClasses}>Tags</label>
<div className={cardClasses + " space-y-3"}>
  {tags.map((tag) => {
    const tagId = String(tag._id); // convert to string to avoid mismatch
    return (
      <label key={tagId} className="flex items-center space-x-3 cursor-pointer">
        <input
          type="checkbox"
          value={tagId}
          checked={product.tags.includes(tagId)}
          onChange={(e) => {
            const checked = e.target.checked;
            setProduct((prev) => ({
              ...prev,
              tags: checked
                ? [...prev.tags, tagId]
                : prev.tags.filter((id) => id !== tagId),
            }));
          }}
          className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span>{tag.name}</span>
      </label>
    );
  })}
</div>

</div>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}