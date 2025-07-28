'use client';
import React from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function ImagePreviewModal({ src, onClose }) {
  if (!src) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full max-h-[90vh] rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on image
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-white text-black rounded-full p-1 shadow hover:bg-red-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image */}
        <Image
          src={src}
          alt="Preview"
          width={1000}
          height={600}
          className="w-full h-auto object-contain rounded-xl"
          unoptimized
        />
      </div>
    </div>
  );
}
