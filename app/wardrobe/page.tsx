"use client";

import { useState } from "react";
import WardrobeUploadModal from "../components/WardrobeUploadModal";
import Navbar from "../components/Navbar";

const initialWardrobeItems = [
  {
    id: "1",
    name: "Brown Shirt",
    category: "shirt",
    image: "/images/brown-shirt.jpg",
  },
  {
    id: "2",
    name: "White Shirt",
    category: "shirt",
    image: "/images/white-shirt.jpg",
  },
  {
    id: "3",
    name: "Ankara Top",
    category: "dress",
    image: "/images/ankara-top.jpg",
  },
  {
    id: "4",
    name: "Flair Skirt",
    category: "skirt",
    image: "/images/flair-skirt.jpg",
  },
  {
    id: "5",
    name: "Heels",
    category: "shoes",
    image: "/images/heels.jpg",
  },
  {
    id: "6",
    name: "Jean Short Skirt",
    category: "skirt",
    image: "/images/jean-short.jpg",
  },
  {
    id: "7",
    name: "Jean Trouser",
    category: "trouser",
    image: "/images/jean.jpg",
  },
  {
    id: "8",
    name: "Jean Gown",
    category: "dress",
    image: "/images/jean-gown.jpg",
  },
  {
    id: "9",
    name: "Jean Trouser",
    category: "trouser",
    image: "/images/jean-trouser.jpg",
  },
  {
    id: "10",
    name: "Loafers",
    category: "shoes",
    image: "/images/Loafers.jpg",
  },
  {
    id: "11",
    name: "Mini Jean",
    category: "skirt",
    image: "/images/mini-jean.jpg",
  },
  {
    id: "12",
    name: "Pant Trouser",
    category: "trouser",
    image: "/images/pant-trouser.jpg",
  },
  {
    id: "13",
    name: "Pant Trouser",
    category: "trouser",
    image: "/images/pant-trouser1.jpg",
  },
  {
    id: "14",
    name: "Shoes",
    category: "shoes",
    image: "/images/snickers.jpg",
  },
  {
    id: "15",
    name: "Snickers",
    category: "shoes",
    image: "/images/snickers1.jpg",
  },
  {
    id: "16",
    name: "Wedge Heels",
    category: "shoes",
    image: "/images/Toe-narrow.jpg",
  },
  {
    id: "17",
    name: "Wedge Heels",
    category: "shoes",
    image: "/images/wedge-heel.jpg",
  },
  {
    id: "18",
    name: "Wrap Skirt",
    category: "skirt",
    image: "/images/wrap-skirt.jpg",
  },
];

const filters = ["all", "skirt", "shirt", "trouser", "dress", "top", "shoes"];
export interface WardrobeItem {
  id: string;
  name: string;
  category: string;
  image: string;
  // add any extra fields if needed
}
export default function WardrobePage() {
  const [activeFilter, setActiveFilter] = useState("all");
const [wardrobeItems, setWardrobeItems] = useState<WardrobeItem[]>(initialWardrobeItems);

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("top");


  const filteredItems =
    activeFilter === "all"
      ? wardrobeItems
      : wardrobeItems.filter(
          (item) => item.category === activeFilter
        );

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    const newItem = {
      id: Date.now().toString(),
      name: file.name.split(".")[0],
      category: "top", // default category (can upgrade later)
      image: imageUrl,
    };

    setWardrobeItems((prev) => [...prev, newItem]);
  };

  return (
    <div className="min-h-screen px-6 lg:px-20 py-16 bg-[#FFF8F0]">
      <Navbar />
      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold text-[#046A38] mb-8">
        My Wardrobe
      </h1>

      {/* FILTERS + UPLOAD */}
      <div className="flex gap-3 mb-10 flex-wrap">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm border transition
              ${
                activeFilter === filter
                  ? "bg-[#046A38] text-white border-[#046A38]"
                  : "bg-white text-gray-700 border-gray-300"
              }
            `}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}

        {/* <label className="
          inline-flex items-center
          px-4 py-2
          rounded-full
          text-sm
          border border-gray-300
          bg-white
          text-gray-700
          transition
          cursor-pointer
          hover:bg-[#B81F33] hover:text-white
        ">
          Upload Wardrobe
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
        </label> */}
        <button onClick={()=>setModalOpen(!modalOpen)} className="px-4 py-2 rounded-full text-sm border border-gray-300 bg-white text-gray-700 transition hover:bg-[#B81F33] hover:text-white">Upload Wardrobe</button>
      </div>

      {/* EMPTY STATE */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-lg text-gray-600 mb-4">
            Your wardrobe is empty
          </p>
          <p className="text-sm text-gray-500">
            Add clothes to start getting outfit recommendations.
          </p>
        </div>
      ) : (
        /* GRID */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="font-medium text-gray-800">
                  {item.name}
                </p>
                <p className="text-sm text-gray-500 capitalize">
                  {item.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <WardrobeUploadModal
  isOpen={modalOpen}
  onClose={() => setModalOpen(false)}
  setWardrobeItems={setWardrobeItems}
/>
    </div>
  );
}