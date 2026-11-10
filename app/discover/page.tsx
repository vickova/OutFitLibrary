"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Heart,
  Sparkles,
  ArrowUpRight,
  BookOpen,
  X,
  SlidersHorizontal,
  Palette,
} from "lucide-react";
import Navbar from "../components/Navbar";

interface DiscoverItem {
  id: string;
  title: string;
  description: string;
  history: string;
  image: string;
  category: string;
  region: string;
  colors: string[];
  tags: string[];
}

const discoverItems: DiscoverItem[] = [
  {
    id: "1",
    title: "Kente Cloth",
    description:
      "A vibrant woven textile made from narrow strips of silk, cotton, or other fibers, assembled into intricate patterns.",
    history:
      "Kente is closely associated with the Asante and Ewe peoples of Ghana. Historically connected with royalty and ceremonial occasions, its colors and patterns can carry symbolic meanings.",
    image:
      "https://images.unsplash.com/photo-1617957743096-5c9d3b9b61c2",
    category: "Textiles",
    region: "Ghana",
    colors: ["#EAB308", "#15803D", "#B91C1C"],
    tags: ["Heritage", "Woven", "Statement"],
  },
  {
    id: "2",
    title: "Ankara Prints",
    description:
      "Bold, colorful fabric prints used to create everything from everyday dresses to striking occasion wear.",
    history:
      "African wax-print fabrics have a complex history involving Indonesian batik influences, European manufacturing, and African trade. African communities have made the textiles their own, developing distinctive styles, meanings, and naming traditions.",
    image:
      "https://images.unsplash.com/photo-1600180758890-6c1c36c4f9fa",
    category: "Textiles",
    region: "West Africa",
    colors: ["#DB2777", "#7C3AED", "#F59E0B"],
    tags: ["Prints", "Colorful", "Everyday"],
  },
  {
    id: "3",
    title: "Dashiki",
    description:
      "A loose-fitting garment known for its decorative neckline, colorful patterns, and relaxed silhouette.",
    history:
      "Dashiki styles are worn in West Africa and throughout the African diaspora. The word is often linked to the Yoruba term dansiki, which has connections to the Hausa word dan ciki. Contemporary dashiki styles reflect a range of regional and diasporic influences.",
    image:
      "https://images.unsplash.com/photo-1615873968403-89e068629265",
    category: "Clothing",
    region: "West Africa",
    colors: ["#2563EB", "#F97316", "#16A34A"],
    tags: ["Traditional", "Relaxed", "Unisex"],
  },
  {
    id: "4",
    title: "Adire Textile",
    description:
      "Indigo-dyed fabric created using resist-dyeing techniques to produce beautiful patterns and textures.",
    history:
      "Adire is especially associated with Yoruba textile traditions in southwestern Nigeria. Artisans use techniques such as tying, stitching, or applying resist materials before dyeing to create distinctive designs.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
    category: "Textiles",
    region: "Nigeria",
    colors: ["#1E3A8A", "#60A5FA", "#F8FAFC"],
    tags: ["Indigo", "Handcrafted", "Heritage"],
  },
  {
    id: "5",
    title: "Aso-Oke",
    description:
      "A prestigious handwoven Yoruba textile often used for ceremonial outfits, head ties, and special occasions.",
    history:
      "Aso-oke, meaning cloth from the hinterland, is a traditional Yoruba woven fabric. It is commonly worn for weddings, festivals, naming ceremonies, and other important celebrations.",
    image:
      "https://images.unsplash.com/photo-1590736969955-71cc94901144",
    category: "Textiles",
    region: "Nigeria",
    colors: ["#7C2D12", "#D6A756", "#F5E6CC"],
    tags: ["Ceremonial", "Woven", "Elegant"],
  },
  {
    id: "6",
    title: "Modern Ankara Styling",
    description:
      "Explore how contemporary designers transform Ankara prints into tailored suits, coordinated sets, and modern silhouettes.",
    history:
      "Today's African designers continue to reinterpret printed fabrics through contemporary tailoring, streetwear, and global fashion. These designs show how tradition can inspire new forms of personal expression.",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b",
    category: "Style Inspiration",
    region: "Contemporary Africa",
    colors: ["#DB2777", "#F97316", "#FDE68A"],
    tags: ["Modern", "Tailored", "Inspiration"],
  },
];

const categories = [
  "All",
  "Textiles",
  "Clothing",
  "Style Inspiration",
];

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<DiscoverItem | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return discoverItems.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;

      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.history.toLowerCase().includes(query) ||
        item.region.toLowerCase().includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query));

      const matchesFavorites =
        !showFavoritesOnly || favorites.includes(item.id);

      return matchesCategory && matchesSearch && matchesFavorites;
    });
  }, [searchQuery, activeCategory, favorites, showFavoritesOnly]);

  function toggleFavorite(id: string) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id]
    );
  }

  return (
    <main className="min-h-screen bg-[#FFFDF9] text-gray-900">
      <Navbar/>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F5E8FF] via-[#FFF1F5] to-[#FFF8E7]">
        <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-pink-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/4 h-64 w-64 rounded-full bg-purple-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/70 px-4 py-2 text-sm font-medium text-purple-700 shadow-sm">
                <Sparkles size={16} />
                Culture, creativity & personal style
              </div>

              <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Discover the stories{" "}
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                  behind the style.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
                Explore African textiles, iconic garments, cultural heritage,
                and fresh styling inspiration. Find the stories that make
                fashion more meaningful.
              </p>

              <a
                href="#discover-collection"
                className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-gray-900 px-6 py-3.5 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-purple-700"
              >
                Explore the collection
                <ArrowUpRight size={18} />
              </a>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-purple-500" />
                  Cultural stories
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-pink-500" />
                  Style inspiration
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-orange-500" />
                  Textile traditions
                </span>
              </div>
            </div>

            {/* HERO IMAGE COLLAGE */}
            <div className="relative mx-auto grid w-full max-w-lg grid-cols-2 gap-4">
              <div className="mt-10 overflow-hidden rounded-[2rem] shadow-xl">
                <img
                  src={discoverItems[0].image}
                  alt="Textile inspiration"
                  className="h-56 w-full object-cover sm:h-72"
                />
              </div>

              <div className="overflow-hidden rounded-[2rem] shadow-xl">
                <img
                  src={discoverItems[2].image}
                  alt="African fashion inspiration"
                  className="h-56 w-full object-cover sm:h-72"
                />
              </div>

              <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-white/80 bg-white/90 px-5 py-3 shadow-xl backdrop-blur">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                  <Palette size={21} />
                </div>
                <div>
                  <p className="text-sm font-bold">A world of expression</p>
                  <p className="text-xs text-gray-500">
                    Discover style with meaning
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section
        id="discover-collection"
        className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20"
      >
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-purple-600">
              The inspiration library
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Explore the collection
            </h2>
            <p className="mt-3 max-w-xl text-gray-500">
              From time-honored textiles to contemporary looks, discover the
              ideas, people, and traditions behind the clothes.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowFavoritesOnly((current) => !current)}
            className={`inline-flex w-fit items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
              showFavoritesOnly
                ? "border-pink-200 bg-pink-50 text-pink-700"
                : "border-gray-200 bg-white text-gray-600 hover:border-pink-200 hover:text-pink-600"
            }`}
          >
            <Heart
              size={17}
              fill={showFavoritesOnly ? "currentColor" : "none"}
            />
            {showFavoritesOnly ? "Showing saved items" : "Saved inspiration"}
            {favorites.length > 0 && (
              <span className="rounded-full bg-white px-2 py-0.5 text-xs">
                {favorites.length}
              </span>
            )}
          </button>
        </div>

        {/* SEARCH */}
        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search textiles, garments, regions..."
              aria-label="Search fashion inspiration"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-purple-300 focus:bg-white focus:ring-4 focus:ring-purple-50"
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <SlidersHorizontal size={17} />
            <span>
              {filteredItems.length}{" "}
              {filteredItems.length === 1 ? "discovery" : "discoveries"}
            </span>
          </div>
        </div>

        {/* CATEGORY FILTERS */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-purple-600 text-white shadow-md shadow-purple-200"
                    : "border border-gray-200 bg-white text-gray-600 hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* DISCOVER GRID */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item, index) => {
              const isFavorite = favorites.includes(item.id);

              return (
                <article
                  key={item.id}
                  className="group overflow-hidden rounded-[1.75rem] border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-100/60"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading={index > 2 ? "lazy" : "eager"}
                      className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute left-4 top-4">
                      <span className="rounded-full border border-white/60 bg-white/90 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm backdrop-blur">
                        {item.category}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleFavorite(item.id)}
                      aria-label={
                        isFavorite
                          ? `Remove ${item.title} from saved inspiration`
                          : `Save ${item.title} to inspiration`
                      }
                      aria-pressed={isFavorite}
                      className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full shadow-md backdrop-blur transition ${
                        isFavorite
                          ? "bg-pink-600 text-white"
                          : "bg-white/90 text-gray-600 hover:bg-pink-50 hover:text-pink-600"
                      }`}
                    >
                      <Heart
                        size={18}
                        fill={isFavorite ? "currentColor" : "none"}
                      />
                    </button>

                    <div className="absolute bottom-4 left-4">
                      <span className="rounded-full bg-black/55 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                        {item.region}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <h3 className="text-xl font-bold tracking-tight text-gray-900">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      {item.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="my-5 h-px bg-gray-100" />

                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <BookOpen size={16} className="text-purple-500" />
                        Cultural story
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedItem(item)}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-700 transition hover:text-pink-600"
                      >
                        Read story
                        <ArrowUpRight size={16} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
              <Search size={27} />
            </div>

            <h3 className="mt-5 text-xl font-bold">Nothing found just yet</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Try another search or category. Your next fashion inspiration
              might be just one search away.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
                setShowFavoritesOnly(false);
              }}
              className="mt-5 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* BOTTOM CTA */}
        <div className="mt-14 overflow-hidden rounded-[2rem] bg-gradient-to-r from-purple-700 via-fuchsia-600 to-pink-500 px-6 py-10 text-white sm:px-10 sm:py-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-white/80">
                <Sparkles size={17} />
                Make inspiration personal
              </div>

              <h3 className="text-2xl font-bold sm:text-3xl">
                Turn your inspiration into outfits.
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/80 sm:text-base">
                Use what you discover to spark new combinations with pieces
                already in your wardrobe.
              </p>
            </div>

            <a
              href="/dashboard/wardrobe"
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3.5 font-semibold text-purple-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-purple-50"
            >
              Visit my wardrobe
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* CULTURAL STORY MODAL */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setSelectedItem(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="story-title"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="h-64 w-full object-cover sm:h-80"
              />

              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                aria-label="Close story"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow transition hover:bg-white"
              >
                <X size={20} />
              </button>

              <span className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                {selectedItem.region}
              </span>
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-600">
                Fashion & heritage
              </p>

              <h2
                id="story-title"
                className="mt-2 text-3xl font-bold tracking-tight"
              >
                {selectedItem.title}
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                {selectedItem.description}
              </p>

              <div className="mt-7 rounded-2xl bg-purple-50 p-5 sm:p-6">
                <div className="flex items-center gap-2 text-purple-700">
                  <BookOpen size={19} />
                  <h3 className="font-bold">History & significance</h3>
                </div>

                <p className="mt-3 text-sm leading-7 text-gray-700">
                  {selectedItem.history}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {selectedItem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-purple-100 bg-white px-3 py-1.5 text-xs font-medium text-purple-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => toggleFavorite(selectedItem.id)}
                className={`mt-7 inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold transition ${
                  favorites.includes(selectedItem.id)
                    ? "bg-pink-50 text-pink-700 hover:bg-pink-100"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
              >
                <Heart
                  size={18}
                  fill={
                    favorites.includes(selectedItem.id)
                      ? "currentColor"
                      : "none"
                  }
                />
                {favorites.includes(selectedItem.id)
                  ? "Remove from saved inspiration"
                  : "Save this inspiration"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}