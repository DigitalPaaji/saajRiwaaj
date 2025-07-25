'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaPlus } from 'react-icons/fa';
import { X, Loader2, UploadCloud, Maximize2 } from 'lucide-react';
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PopupModal from '@/app/components/admin/ConfirmPopup';

// Cloudinary setup
const CLOUDINARY_CLOUD_NAME = "dj0z0q0ut";
const CLOUDINARY_UPLOAD_PRESET = "saajRiwaajProducts";

// UI classes
const inputClasses = "w-full px-3 py-2 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg transition";
const cardClasses = "bg-white p-6 rounded-xl shadow-sm border border-gray-200";

export default function BannerManager() {
  const [banners, setBanners] = useState([]);
  const [image, setImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteBannerId,setDeleteBannerId] = useState(null)

  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  // Fetch banners
  const fetchBanners = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:5000/banner');
      const data = await res.json();
      setBanners(data);
    } catch (err) {
      console.error("Error fetching banners:", err);
    }
  }, []);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  // Drag handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleImageUpload = async (file) => {
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.secure_url) {
        setImage(data.secure_url);
        // toast.success("Image uploaded!");
      } else {
        toast.error("Upload failed.");
      }
    } catch (err) {
      toast.error("Upload error.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddBanner = async () => {
    if (!image) return toast.warning("Upload an image first.");
    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/banner/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image }),
      });

      if (res.ok) {
        toast.success("Banner added!");
        setImage('');
        fetchBanners();
      } else {
        toast.error("Failed to add banner image.");
      }
    } catch (err) {
      toast.error("Error adding banner image.");
    } finally {
      setIsSubmitting(false);
    }
  };

const handleDelete=(id)=>{
  setDeleteBannerId(id)
  setShowDeletePopup(true)
}

  const confirmDeleteTag = async () => {
     if (!deleteBannerId) return toast.error("No banner ID to delete.");
    try {
      const res = await fetch(`http://localhost:5000/banner/${deleteBannerId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success("Banner Image deleted!");
        fetchBanners();
      } else {
        toast.error("Failed to delete banner image.");
      }
    } catch (err) {
      toast.error("Error deleting banner image.");
    }finally {
      setShowDeletePopup(false);
      setDeleteBannerId(null);
      fetchBanners()
    }
  };

  return (
    <div className="px-4 py-6">
      <ToastContainer position="top-right" autoClose={2000} />
      <h1 className="text-2xl font-bold mb-6 text-[#4d4c4b]">Homepage Banner Images</h1>

      {/* Upload Area */}
      <div className={`${cardClasses} space-y-4 mb-8`}>
        <h2 className="text-lg font-semibold">Upload New Banner Images</h2>

        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`w-full p-6 border-2 border-dashed rounded-xl text-center transition ${
            dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
          }`}
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={inputRef}
            onChange={(e) => handleImageUpload(e.target.files[0])}
          />
          <label onClick={() => inputRef.current.click()} className="cursor-pointer">
            <UploadCloud className="mx-auto h-10 w-10 text-gray-400" />
            <p className="mt-2 text-sm">
              <span className="text-blue-600 font-medium">Click to upload</span> or drag image here
            </p>
          </label>
          {isUploading && <p className="text-sm text-blue-500 mt-2">Uploading...</p>}
        </div>

        {image && (
          <div className="mt-4 relative w-48 h-32 border rounded-lg overflow-hidden">
            <Image src={image} alt="Preview" fill className="object-cover" unoptimized />
          </div>
        )}

        <button
          type="button"
          disabled={isSubmitting}
          onClick={handleAddBanner}
          className="bg-[#4d4c4b] hover:bg-[#272625] text-white px-4 py-2 rounded-xl shadow flex items-center"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
          <FaPlus className="mr-2" /> {isSubmitting ? "Adding..." : "Add Banner Image"}
        </button>
      </div>

      {/* Banner Grid */}
      <div className={cardClasses}>
        <h2 className="text-lg font-semibold mb-4">Current Banner Images</h2>

        {banners.length === 0 ? (
          <p className="text-gray-500">No banners uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {banners.map((b) => (
              <div key={b._id} className="relative group border rounded-xl overflow-hidden shadow-sm">
                <Image
                  src={b.image}
                  alt="Banner"
                  width={600}
                  height={300}
                  className="object-cover lg:object-contain w-full h-40 lg:h-auto cursor-pointer"
                  onClick={() => setPreviewImage(b.image)}
                  unoptimized
                />

                <div className="absolute top-2 right-2 flex gap-2  transition">
                  <button onClick={() => setPreviewImage(b.image)} className="text-white bg-black/60 p-1 rounded-full">
                    <Maximize2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(b._id)} className="text-white bg-red-600 hover:bg-red-700 p-1 rounded-full cursor-pointer">
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Full Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setPreviewImage(null)}
        >
          <Image src={previewImage} alt="Preview" width={1000} height={600} className="max-w-full max-h-[90vh] object-contain" unoptimized />
        </div>
      )}


       {showDeletePopup && (
        <PopupModal
          title={`Delete Image?`}
          message=""
          onCancel={() => setShowDeletePopup(false)}
          onConfirm={confirmDeleteTag}
          confirmText="Delete"
          cancelText="Cancel"
          type="delete"
          showCancel
        />
      )}
    </div>
  );
}
