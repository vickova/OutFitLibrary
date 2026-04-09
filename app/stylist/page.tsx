"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

interface WardrobeItem {
  id: string;
  name: string;
  category: string;
  image: string;
}

interface StylingItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export default function StylistPage({
  wardrobeItems,
}: {
  wardrobeItems: WardrobeItem[];
}) {
  const [occasion, setOccasion] = useState("");
  const router = useRouter();

  const wardrobeEmpty = wardrobeItems?.length === 0;

  const recentStylings: StylingItem[] = [
    {
      id: "1",
      title: "Casual Sunday Outfit",
      description: "Using 3 items in your wardrobe",
      image:
        "https://images.unsplash.com/photo-1520975922323-1c7a01a6d23f",
    },
    {
      id: "2",
      title: "Business Meeting Look",
      description: "Using 4 items in your wardrobe",
      image:
        "https://images.unsplash.com/photo-1495121605193-b116b5b09a6e",
    },
  ];

  const handleGenerateStyling = () => {
    if (wardrobeEmpty) return;

    console.log("Generate styling for:", occasion);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <Navbar />
      {/* HERO */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-[#046A38] mb-3">
          Your AI Stylist
        </h1>
        <p className="text-gray-600">
          Get personalized outfit advice inspired by African heritage.
        </p>
      </div>

      {/* STYLING INPUT */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-12 shadow-sm">

        <h2 className="text-lg font-medium mb-4">
          What are you dressing for?
        </h2>

        <div className="flex flex-col md:flex-row gap-4">

          <input
            type="text"
            placeholder="e.g Wedding, Business Meeting, Casual..."
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#046A38]"
          />

          <button
            onClick={handleGenerateStyling}
            disabled={wardrobeEmpty}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition
              ${
                wardrobeEmpty
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#046A38] text-white hover:bg-[#03552c]"
              }`}
          >
            Generate Outfit
          </button>

        </div>

        {/* MESSAGE */}
        {wardrobeEmpty && (
          <p className="text-sm text-gray-500 mt-3">
            Add items to your wardrobe first before generating outfit suggestions.
          </p>
        )}

      </div>

      {/* RECENT STYLINGS */}
      <div>

        <h2 className="text-xl font-semibold mb-6">
          Recent Styling
        </h2>

        {recentStylings.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No styling history yet.
          </p>
        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

            {recentStylings.map((style) => (
              <div
                key={style.id}
                onClick={() => router.push(`/stylist/${style.id}`)}
                className="cursor-pointer border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition"
              >

                <img
                  src={style.image}
                  alt={style.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">

                  <h3 className="font-medium text-gray-900 mb-1">
                    {style.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {style.description}
                  </p>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}