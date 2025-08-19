"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaPlus } from "react-icons/fa";
import { X, Loader2, UploadCloud, Maximize2 } from "lucide-react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PopupModal from "@/app/components/admin/ConfirmPopup";
import ImagePreviewModal from "@/app/components/user/ImagePreview";
// Cloudinary setup
const CLOUDINARY_CLOUD_NAME = "dj0z0q0ut";
const CLOUDINARY_UPLOAD_PRESET = "saajRiwaajProducts";

// UI classes
const inputClasses =
  "w-full px-3 py-2 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg transition";
const cardClasses = "bg-white p-6 rounded-xl shadow-sm border border-gray-200";

export default function BannerManager() {
  const [banners, setBanners] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteBannerId, setDeleteBannerId] = useState(null);
  const [desktopImage, setDesktopImage] = useState("");
  const [mobileImage, setMobileImage] = useState("");
  const [dragActiveDesktop, setDragActiveDesktop] = useState(false);
  const [dragActiveMobile, setDragActiveMobile] = useState(false);

  // Fetch banners
  const fetchBanners = useCallback(async () => {
    try {
      const res = await fetch("https://saajriwaaj.onrender.com/banner");
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
  const handleDrag = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      type === "desktop"
        ? setDragActiveDesktop(true)
        : setDragActiveMobile(true);
    } else {
      type === "desktop"
        ? setDragActiveDesktop(false)
        : setDragActiveMobile(false);
    }
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    type === "desktop"
      ? setDragActiveDesktop(false)
      : setDragActiveMobile(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0], type);
    }
  };

  const handleImageUpload = async (file, target = "desktop") => {
    if (!file) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (data.secure_url) {
        target === "desktop"
          ? setDesktopImage(data.secure_url)
          : setMobileImage(data.secure_url);
      } else {
        toast.error("Upload failed.");
      }
    } catch {
      toast.error("Upload error.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddBanner = async () => {
    if (!desktopImage || !mobileImage) {
      return toast.warning("Upload both desktop and mobile images.");
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("https://saajriwaaj.onrender.com/banner/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ desktopImage, mobileImage }),
      });

      if (res.ok) {
        toast.success("Banner added!");
        setDesktopImage("");
        setMobileImage("");
        fetchBanners();
      } else {
        toast.error("Failed to add banner.");
      }
    } catch {
      toast.error("Error adding banner.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (id) => {
    setDeleteBannerId(id);
    setShowDeletePopup(true);
  };

  const confirmDeleteTag = async () => {
    if (!deleteBannerId) return toast.error("No banner ID to delete.");
    try {
      const res = await fetch(
        `https://saajriwaaj.onrender.com/banner/${deleteBannerId}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        toast.success("Banner Image deleted!");
        fetchBanners();
      } else {
        toast.error("Failed to delete banner image.");
      }
    } catch (err) {
      toast.error("Error deleting banner image.");
    } finally {
      setShowDeletePopup(false);
      setDeleteBannerId(null);
      fetchBanners();
    }
  };

  return (
    <div className="px-4 py-6 ">
      <ToastContainer position="top-right" autoClose={2000} />
      <h1 className="text-2xl font-bold mb-6 text-[#4d4c4b]">
        Homepage Banner Images
      </h1>

      {/* Upload Area */}
      <div className={`${cardClasses} `}>
        <div className="flex items-center justify-center gap-6 lg:gap-12 flex-wrap lg:flex-nowrap">
          {/* Desktop Image Upload */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-lg font-semibold">Upload Desktop Banner</h2>
            <div
              onDragEnter={(e) => handleDrag(e, "desktop")}
              onDragOver={(e) => handleDrag(e, "desktop")}
              onDragLeave={(e) => handleDrag(e, "desktop")}
              onDrop={(e) => handleDrop(e, "desktop")}
              className={`my-6 w-full p-6 border-2 border-dashed rounded-xl text-center transition ${
                dragActiveDesktop
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 bg-gray-50"
              }`}
            >
              <input
                type="file"
                accept="image/*"
                id="desktop-upload"
                onChange={(e) =>
                  handleImageUpload(e.target.files[0], "desktop")
                }
                className="hidden"
              />
              <label htmlFor="desktop-upload" className="cursor-pointer">
                <UploadCloud className="mx-auto h-10 w-10 text-gray-400" />
                <p className="mt-2 text-sm">
                  <span className="text-blue-600 font-medium">
                    Click to upload
                  </span>{" "}
                  or drag Desktop image here
                </p>
              </label>
            </div>

            {desktopImage && (
              <div className="mt-4 relative w-48 h-32 border rounded-lg overflow-hidden">
                <Image
                  src={desktopImage}
                  alt="Desktop "
                  width={400}
                  height={400}
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
          </div>

          {/* Mobile Image Upload */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-lg font-semibold">Upload Mobile Banner</h2>
            <div
              onDragEnter={(e) => handleDrag(e, "mobile")}
              onDragOver={(e) => handleDrag(e, "mobile")}
              onDragLeave={(e) => handleDrag(e, "mobile")}
              onDrop={(e) => handleDrop(e, "mobile")}
              className={`my-6 w-full p-6 border-2 border-dashed rounded-xl text-center transition ${
                dragActiveMobile
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 bg-gray-50"
              }`}
            >
              <input
                type="file"
                accept="image/*"
                id="mobile-upload"
                onChange={(e) => handleImageUpload(e.target.files[0], "mobile")}
                className="hidden"
              />
              <label htmlFor="mobile-upload" className="cursor-pointer">
                <UploadCloud className="mx-auto h-10 w-10 text-gray-400" />
                <p className="mt-2 text-sm">
                  <span className="text-blue-600 font-medium">
                    Click to upload
                  </span>{" "}
                  or drag Mobile image here
                </p>
              </label>
            </div>

            {mobileImage && (
              <div className="mt-4 relative w-48 h-32 border rounded-lg overflow-hidden">
                <Image
                  src={mobileImage}
                  alt="Mobile "
                    width={400}
                  height={400}
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          disabled={isSubmitting}
          onClick={handleAddBanner}
          className="bg-[#4d4c4b] cursor-pointer hover:bg-[#272625] text-white px-4 py-2 mt-4 rounded-xl shadow flex items-center"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
          <FaPlus className="mr-2" />{" "}
          {isSubmitting ? "Adding..." : "Add Banner Image"}
        </button>
      </div>

      {/* Banner Grid */}
      <div className={`${cardClasses} mt-8 `}>
        <h2 className="text-lg font-semibold mb-4">Current Banner Images</h2>

        {banners.length === 0 ? (
          <p className="text-gray-500">No banners uploaded yet.</p>
        ) : (
          <div className="">
            {banners.map((b) => (
              <div
                key={b._id}
                className="relative flex items-center justify-center gap-8 rounded-xl shadow-sm overflow-hidden bg-gray-50 w-fit"
              >
                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(b._id)}
                  className="absolute top-2 right-2 z-10 text-red-600 hover:text-red-800 bg-white rounded-full p-1 shadow"
                >
                  <X size={18} />
                </button>

                <div className="flex items-center   justify-center gap-6 flex-wrap lg:flex-nowrap p-4">
                  {/* Desktop Image */}
                  {b.desktopImage && (
                    <div
                      onClick={() => setPreviewImage(b.desktopImage)}
                      className="cursor-pointer overflow-hidden"
                    >
                      <Image
                        src={b.desktopImage}
                        alt="Desktop"
                        width={600}
                        height={250}
                        className="object-cover w-full h-40"
                        unoptimized
                      />
                      <p className="text-sm text-center mt-1 text-gray-600">
                        Desktop View
                      </p>
                    </div>
                  )}

                  {/* Mobile Image */}
                  {b.mobileImage && (
                    <div
                      onClick={() => setPreviewImage(b.mobileImage)}
                      className="cursor-pointer  overflow-hidden"
                    >
                      <Image
                        src={b.mobileImage}
                        alt="Mobile"
                        width={600}
                        height={250}
                        className="object-cover w-full h-40"
                        unoptimized
                      />
                      <p className="text-sm text-center mt-1 text-gray-600">
                        Mobile View
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Full Image Preview Modal */}
      <ImagePreviewModal
        src={previewImage}
        onClose={() => setPreviewImage(null)}
      />

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
