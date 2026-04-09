"use client";

import { useState } from "react";
import { WardrobeItem } from "../wardrobe/page";

/* =========================
   TYPES
========================= */

export type Category =
  | "top"
  | "shirt"
  | "skirt"
  | "trouser"
  | "dress"
  | "shoes";

// export interface WardrobeItem {
//   id: string;
//   name: string;
//   category: Category;
//   image: string;
// }

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
setWardrobeItems: React.Dispatch<React.SetStateAction<WardrobeItem[]>>;

}

/* =========================
   COMPONENT
========================= */

export default function WardrobeUploadModal({
  isOpen,
  onClose,
  setWardrobeItems,
}: UploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Category>("top");

  if (!isOpen) return null;

  /* =========================
     HANDLE FILE SELECT
  ========================= */

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    // Auto-fill name from filename
    setName(file.name.split(".")[0]);

    // Generate preview URL
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  /* =========================
     HANDLE UPLOAD
  ========================= */

  const handleUpload = () => {
    if (!selectedFile || !preview) return;

    const newItem: WardrobeItem = {
      id: Date.now().toString(),
      name,
      category,
      image: preview,
    };

    setWardrobeItems((prev) => [...prev, newItem]);

    // Reset form
    setSelectedFile(null);
    setPreview(null);
    setName("");
    setCategory("top");

    onClose();
  };

  /* =========================
     UI
  ========================= */

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* OVERLAY */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative bg-white w-full max-w-md mx-4 rounded-2xl shadow-xl p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[#046A38]">
            Upload Wardrobe Item
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-lg"
          >
            ✕
          </button>
        </div>

        {/* FILE UPLOAD */}
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-[#046A38] transition">
          <p className="text-gray-500 text-sm mb-2">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-400">
            PNG, JPG up to 5MB
          </p>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {/* IMAGE PREVIEW */}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-4 w-full h-40 object-cover rounded-lg"
          />
        )}

        {/* NAME INPUT */}
        <div className="mt-4">
          <label className="block text-sm text-gray-600 mb-1">
            Item Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter item name"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#046A38]"
          />
        </div>

        {/* CATEGORY SELECT */}
        <div className="mt-4">
          <label className="block text-sm text-gray-600 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as Category)
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#046A38]"
          >
            <option value="top">Top</option>
            <option value="shirt">Shirt</option>
            <option value="skirt">Skirt</option>
            <option value="trouser">Trouser</option>
            <option value="dress">Dress</option>
            <option value="shoes">Shoes</option>
          </select>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full text-sm border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleUpload}
            disabled={!selectedFile || !name}
            className="px-4 py-2 rounded-full text-sm bg-[#046A38] text-white hover:bg-[#03552c] transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}