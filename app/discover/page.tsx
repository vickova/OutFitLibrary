"use client";
import Navbar from "../components/Navbar";

interface DiscoverItem {
  id: string;
  title: string;
  description: string;
  history: string;
  image: string;
}

export default function DiscoverPage() {
  const discoverItems: DiscoverItem[] = [
    {
      id: "1",
      title: "Kente Cloth",
      description:
        "A traditional Ghanaian textile made of hand-woven cloth strips of silk and cotton.",
      history:
        "Originally worn by royalty, Kente is now a symbol of African heritage and cultural pride.",
      image:
        "https://images.unsplash.com/photo-1617957743096-5c9d3b9b61c2",
    },
    {
      id: "2",
      title: "Ankara Patterns",
      description:
        "Commonly known as African wax prints, these vibrant patterns are synonymous with African fashion.",
      history:
        "Introduced to Africa by Dutch traders, Ankara has been adopted and reimagined by African cultures.",
      image:
        "https://images.unsplash.com/photo-1600180758890-6c1c36c4f9fa",
    },
    {
      id: "3",
      title: "Dashiki",
      description:
        "A colorful garment widely worn in West Africa and across the African diaspora.",
      history:
        "The name comes from the Yoruba word 'Danshiki', a loanword from the Hausa phrase 'dan ciki'.",
      image:
        "https://images.unsplash.com/photo-1615873968403-89e068629265",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
        <Navbar />
      {/* HERO TEXT */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-[#046A38] mb-3">
          Discover African Fashion
        </h1>

        <p className="text-gray-600 max-w-xl">
          Explore the rich heritage of African fashion and textiles.
        </p>
      </div>

      {/* DISCOVER GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {discoverItems.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition"
          >
            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-52 object-cover"
            />

            {/* CONTENT */}
            <div className="p-5">

              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h2>

              <p className="text-sm text-gray-600 mb-4">
                {item.description}
              </p>

              <div>
                <h3 className="text-sm font-medium text-[#046A38] mb-1">
                  History & Significance
                </h3>

                <p className="text-sm text-gray-500">
                  {item.history}
                </p>
              </div>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}