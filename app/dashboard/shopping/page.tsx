"use client";

import { useMemo, useState } from "react";
import {
  Heart,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  ArrowUpRight,
  Shirt,
  Footprints,
  Watch,
  BriefcaseBusiness,
  Plus,
  Check,
  X,
  ChevronDown,
  Wallet,
  WandSparkles,
  ShoppingCart,
} from "lucide-react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  color: string;
  occasion: string;
  image: string;
  reason: string;
  badge?: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Classic Oversized Blazer",
    category: "Clothing",
    price: 28500,
    color: "Beige",
    occasion: "Work",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=700&q=85",
    reason: "Pairs beautifully with your existing trousers.",
    badge: "Wardrobe essential",
  },
  {
    id: 2,
    name: "Everyday White Sneakers",
    category: "Shoes",
    price: 22000,
    color: "White",
    occasion: "Casual",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
    reason: "A versatile option for casual outfits.",
    badge: "Versatile pick",
  },
  {
    id: 3,
    name: "Structured Everyday Bag",
    category: "Bags",
    price: 35000,
    color: "Brown",
    occasion: "Work",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=85",
    reason: "Adds a polished finish to your work looks.",
  },
  {
    id: 4,
    name: "Minimal Gold Earrings",
    category: "Accessories",
    price: 8500,
    color: "Gold",
    occasion: "Formal",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=85",
    reason: "An easy way to elevate simple outfits.",
    badge: "Small upgrade",
  },
  {
    id: 5,
    name: "Relaxed Straight-Leg Jeans",
    category: "Clothing",
    price: 19500,
    color: "Blue",
    occasion: "Casual",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=85",
    reason: "Works with your everyday tops and sneakers.",
  },
  {
    id: 6,
    name: "Elegant Block Heels",
    category: "Shoes",
    price: 27000,
    color: "Black",
    occasion: "Formal",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=700&q=85",
    reason: "A practical option for events and office wear.",
    badge: "Occasion ready",
  },
  {
    id: 7,
    name: "Classic Wristwatch",
    category: "Accessories",
    price: 18000,
    color: "Gold",
    occasion: "Work",
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=700&q=85",
    reason: "Complements formal and smart-casual outfits.",
  },
  {
    id: 8,
    name: "Everyday Crossbody Bag",
    category: "Bags",
    price: 24500,
    color: "Black",
    occasion: "Casual",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=85",
    reason: "A useful finishing touch for weekend outfits.",
  },
];

const categories = [
  { name: "All items", icon: Sparkles },
  { name: "Clothing", icon: Shirt },
  { name: "Shoes", icon: Footprints },
  { name: "Bags", icon: BriefcaseBusiness },
  { name: "Accessories", icon: Watch },
];

const formatPrice = (price: number) =>
  `₦${price.toLocaleString("en-NG")}`;

export default function ShoppingPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All items");
  const [occasion, setOccasion] = useState("All occasions");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [sort, setSort] = useState("recommended");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [shoppingList, setShoppingList] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showList, setShowList] = useState(false);
  const [notice, setNotice] = useState("");

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = `${product.name} ${product.color} ${product.category}`
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All items" || product.category === category;

      const matchesOccasion =
        occasion === "All occasions" || product.occasion === occasion;

      const matchesPrice = product.price <= maxPrice;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesOccasion &&
        matchesPrice
      );
    });

    if (sort === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [search, category, occasion, maxPrice, sort]);

  const savedProducts = products.filter((product) =>
    shoppingList.includes(product.id)
  );

  function toggleFavorite(id: number) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function toggleShoppingList(id: number) {
    const alreadySaved = shoppingList.includes(id);

    setShoppingList((current) =>
      alreadySaved
        ? current.filter((item) => item !== id)
        : [...current, id]
    );

    setNotice(alreadySaved ? "Removed from your shopping list." : "Added to your shopping list.");
    window.setTimeout(() => setNotice(""), 2500);
  }

  function resetFilters() {
    setCategory("All items");
    setOccasion("All occasions");
    setMaxPrice(100000);
    setSearch("");
    setSort("recommended");
  }

  return (
    <main className="min-h-screen bg-[#FCFAFF] text-[#272139]">
      <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-10">
        {/* Header */}
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-1 text-sm font-medium text-[#8B7BA8]">
              YOUR PERSONAL STYLE ASSISTANT
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Smart shopping<span className="text-[#A855F7]">.</span>
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#827A91] sm:text-base">
              Find pieces you will love, wear often, and style in more ways.
            </p>
          </div>

          <button
            onClick={() => setShowList(true)}
            className="relative flex items-center gap-2 rounded-2xl border border-[#EAE2F5] bg-white px-4 py-3 text-sm font-semibold shadow-sm transition hover:border-[#C084FC]"
          >
            <ShoppingBag size={19} className="text-[#9333EA]" />
            My shopping list
            <span className="rounded-full bg-[#F3E8FF] px-2 py-0.5 text-xs text-[#7E22CE]">
              {shoppingList.length}
            </span>
          </button>
        </header>

        {/* Hero */}
        <section className="relative mb-9 overflow-hidden rounded-[30px] bg-gradient-to-br from-[#7028D8] via-[#A13DD4] to-[#F06AA9] p-6 text-white sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute bottom-[-90px] right-[28%] h-56 w-56 rounded-full bg-[#FFD1E8]/20 blur-3xl" />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="max-w-2xl">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm">
                <Sparkles size={14} />
                SHOP WITH PURPOSE
              </span>

              <h2 className="max-w-xl text-3xl font-bold leading-tight sm:text-5xl">
                Buy less randomly.
                <br />
                <span className="text-[#FFE2F1]">Style more creatively.</span>
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-7 text-white/85 sm:text-base">
                Discover pieces that work with what you already own. Every
                purchase should open up more outfit possibilities.
              </p>

              <button
                onClick={() =>
                  document
                    .getElementById("product-discovery")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-[#7828C8] shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                Explore recommendations
                <ArrowUpRight size={18} />
              </button>
            </div>

            <div className="relative mx-auto hidden w-full max-w-sm lg:block">
              <div className="rotate-[-5deg] rounded-[28px] border border-white/30 bg-white/15 p-3 shadow-2xl backdrop-blur-md">
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=85"
                  alt="Fashion inspiration for your next outfit"
                  className="h-[270px] w-full rounded-[20px] object-cover"
                />
              </div>

              <div className="absolute -bottom-4 -left-8 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-[#272139] shadow-xl">
                <div className="rounded-xl bg-[#F3E8FF] p-2 text-[#9333EA]">
                  <WandSparkles size={21} />
                </div>
                <div>
                  <p className="text-sm font-bold">Style smarter</p>
                  <p className="text-xs text-[#827A91]">
                    Make every piece count
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Shopping insights */}
        <section className="mb-9 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#F0E7FA] bg-white p-5">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F3E8FF] text-[#9333EA]">
              <WandSparkles size={22} />
            </div>
            <h3 className="font-bold">Shop your style</h3>
            <p className="mt-1 text-sm leading-6 text-[#827A91]">
              Explore pieces that complement your personal aesthetic.
            </p>
          </div>

          <div className="rounded-2xl border border-[#F0E7FA] bg-white p-5">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FCE7F3] text-[#DB2777]">
              <Wallet size={22} />
            </div>
            <h3 className="font-bold">Stay on budget</h3>
            <p className="mt-1 text-sm leading-6 text-[#827A91]">
              Filter items by price and prioritize purchases that matter.
            </p>
          </div>

          <div className="rounded-2xl border border-[#F0E7FA] bg-white p-5">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E0F2FE] text-[#0284C7]">
              <Shirt size={22} />
            </div>
            <h3 className="font-bold">Fill wardrobe gaps</h3>
            <p className="mt-1 text-sm leading-6 text-[#827A91]">
              Focus on versatile additions instead of duplicate purchases.
            </p>
          </div>
        </section>

        {/* Product discovery */}
        <section id="product-discovery" className="scroll-mt-6">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#9333EA]">
                <Sparkles size={16} />
                CURATED FOR YOU
              </div>
              <h2 className="text-2xl font-bold sm:text-3xl">
                Find your next favourite
              </h2>
              <p className="mt-2 text-sm text-[#827A91]">
                Discover clothing and accessories for your everyday looks.
              </p>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                showFilters
                  ? "border-[#9333EA] bg-[#F3E8FF] text-[#7E22CE]"
                  : "border-[#EAE2F5] bg-white hover:border-[#C084FC]"
              }`}
            >
              <SlidersHorizontal size={17} />
              Filters
              <ChevronDown
                size={15}
                className={`transition ${showFilters ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {/* Search */}
          <div className="mb-5 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A69AB8]"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search clothes, shoes, bags..."
                className="w-full rounded-xl border border-[#EAE2F5] bg-white py-3.5 pl-12 pr-4 text-sm outline-none transition placeholder:text-[#A69AB8] focus:border-[#B76CF0] focus:ring-4 focus:ring-[#A855F7]/10"
              />
            </div>

            <div className="relative sm:w-56">
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="w-full appearance-none rounded-xl border border-[#EAE2F5] bg-white px-4 py-3.5 pr-10 text-sm outline-none focus:border-[#B76CF0]"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#827A91]"
              />
            </div>
          </div>

          {/* Expandable filters */}
          {showFilters && (
            <div className="mb-6 grid gap-5 rounded-2xl border border-[#EAE2F5] bg-white p-5 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Occasion
                </label>
                <select
                  value={occasion}
                  onChange={(event) => setOccasion(event.target.value)}
                  className="w-full rounded-xl border border-[#EAE2F5] bg-[#FCFAFF] px-3 py-3 text-sm outline-none focus:border-[#B76CF0]"
                >
                  <option>All occasions</option>
                  <option>Work</option>
                  <option>Casual</option>
                  <option>Formal</option>
                </select>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-semibold">Maximum price</label>
                  <span className="text-sm font-bold text-[#9333EA]">
                    {formatPrice(maxPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min={5000}
                  max={100000}
                  step={2500}
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(Number(event.target.value))}
                  className="mt-2 w-full accent-[#9333EA]"
                />
                <div className="mt-1 flex justify-between text-xs text-[#827A91]">
                  <span>₦5,000</span>
                  <span>₦100,000</span>
                </div>
              </div>

              <div className="flex items-end">
                <button
                  onClick={resetFilters}
                  className="rounded-xl px-3 py-3 text-sm font-semibold text-[#9333EA] hover:bg-[#F8F0FF]"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}

          {/* Category pills */}
          <div className="mb-7 flex gap-2 overflow-x-auto pb-2">
            {categories.map(({ name, icon: Icon }) => (
              <button
                key={name}
                onClick={() => setCategory(name)}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                  category === name
                    ? "bg-[#8129D8] text-white shadow-md shadow-purple-200"
                    : "border border-[#EAE2F5] bg-white text-[#827A91] hover:border-[#C084FC] hover:text-[#8129D8]"
                }`}
              >
                <Icon size={16} />
                {name}
              </button>
            ))}
          </div>

          {/* Result count */}
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-[#827A91]">
              Showing{" "}
              <span className="font-bold text-[#272139]">
                {filteredProducts.length}
              </span>{" "}
              items
            </p>

            {(search ||
              category !== "All items" ||
              occasion !== "All occasions" ||
              maxPrice !== 100000) && (
              <button
                onClick={resetFilters}
                className="text-sm font-semibold text-[#9333EA] hover:underline"
              >
                Reset
              </button>
            )}
          </div>

          {/* Product grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              {filteredProducts.map((product) => {
                const isFavorite = favorites.includes(product.id);
                const isSaved = shoppingList.includes(product.id);

                return (
                  <article
                    key={product.id}
                    className="group overflow-hidden rounded-2xl border border-[#F0E7FA] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#D8B4FE] hover:shadow-xl hover:shadow-purple-100/60"
                  >
                    <div className="relative overflow-hidden bg-[#F7F0FC]">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="h-48 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-64"
                      />

                      {product.badge && (
                        <span className="absolute left-2 top-2 max-w-[75%] rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold text-[#7E22CE] shadow-sm sm:left-3 sm:top-3 sm:text-xs">
                          {product.badge}
                        </span>
                      )}

                      <button
                        onClick={() => toggleFavorite(product.id)}
                        aria-label={
                          isFavorite
                            ? "Remove from favourites"
                            : "Add to favourites"
                        }
                        className={`absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full shadow-sm backdrop-blur transition sm:right-3 sm:top-3 ${
                          isFavorite
                            ? "bg-[#FCE7F3] text-[#DB2777]"
                            : "bg-white/95 text-[#827A91] hover:text-[#DB2777]"
                        }`}
                      >
                        <Heart
                          size={17}
                          fill={isFavorite ? "currentColor" : "none"}
                        />
                      </button>

                      <button
                        onClick={() =>
                          toggleShoppingList(product.id)
                        }
                        aria-label={
                          isSaved
                            ? "Remove from shopping list"
                            : "Add to shopping list"
                        }
                        className={`absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full shadow-md transition sm:bottom-3 sm:right-3 ${
                          isSaved
                            ? "bg-[#8129D8] text-white"
                            : "bg-white text-[#8129D8] hover:bg-[#F3E8FF]"
                        }`}
                      >
                        {isSaved ? <Check size={18} /> : <Plus size={18} />}
                      </button>
                    </div>

                    <div className="p-3 sm:p-4">
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[#A08AB9] sm:text-xs">
                        {product.category} · {product.color}
                      </p>

                      <h3 className="line-clamp-2 min-h-10 text-sm font-bold leading-5 sm:text-base">
                        {product.name}
                      </h3>

                      <p className="mt-2 text-base font-bold text-[#8129D8] sm:text-lg">
                        {formatPrice(product.price)}
                      </p>

                      <div className="mt-3 rounded-xl bg-[#FAF5FF] p-2.5">
                        <div className="mb-1 flex items-center gap-1 text-[10px] font-bold text-[#9333EA] sm:text-xs">
                          <Sparkles size={12} />
                          WHY YOU'LL LOVE IT
                        </div>
                        <p className="text-xs leading-5 text-[#827A91]">
                          {product.reason}
                        </p>
                      </div>

                      <button
                        onClick={() => toggleShoppingList(product.id)}
                        className={`mt-3 flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-bold transition sm:text-sm ${
                          isSaved
                            ? "bg-[#F3E8FF] text-[#8129D8]"
                            : "bg-[#8129D8] text-white hover:bg-[#6B21A8]"
                        }`}
                      >
                        {isSaved ? (
                          <>
                            <Check size={15} />
                            Added to list
                          </>
                        ) : (
                          <>
                            <ShoppingCart size={15} />
                            Add to shopping list
                          </>
                        )}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-[#D8C6ED] bg-white px-5 py-16 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3E8FF] text-[#9333EA]">
                <Search size={25} />
              </div>
              <h3 className="text-lg font-bold">No items found</h3>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#827A91]">
                Try a different search or adjust your filters to discover more
                pieces.
              </p>
              <button
                onClick={resetFilters}
                className="mt-5 rounded-xl bg-[#8129D8] px-5 py-3 text-sm font-semibold text-white hover:bg-[#6B21A8]"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        {/* Wardrobe-first reminder */}
        <section className="mt-12 overflow-hidden rounded-3xl border border-[#F2D9E9] bg-gradient-to-r from-[#FFF0F7] via-[#F8F0FF] to-[#EEF6FF] p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#DB2777] shadow-sm">
                <Sparkles size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold sm:text-xl">
                  Before you buy, check your wardrobe.
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-[#827A91]">
                  You might already own something similar. OutfitLibrary is
                  here to help you make thoughtful purchases and get more
                  combinations from the clothes you have.
                </p>
              </div>
            </div>

            <a
              href="/dashboard/wardrobe"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#8129D8] shadow-sm transition hover:shadow-md"
            >
              View my wardrobe
              <ArrowUpRight size={17} />
            </a>
          </div>
        </section>

        <footer className="pb-6 pt-10 text-center text-xs text-[#A69AB8]">
          OutfitLibrary · Shop thoughtfully. Style endlessly.
        </footer>
      </div>

      {/* Shopping list drawer */}
      {showList && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-[#20152E]/40 backdrop-blur-sm"
          onClick={() => setShowList(false)}
        >
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="My shopping list"
            onClick={(event) => event.stopPropagation()}
            className="flex h-full w-full max-w-md flex-col bg-[#FCFAFF] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#EAE2F5] bg-white p-5">
              <div>
                <h2 className="text-xl font-bold">My shopping list</h2>
                <p className="mt-1 text-sm text-[#827A91]">
                  {savedProducts.length} saved{" "}
                  {savedProducts.length === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                onClick={() => setShowList(false)}
                aria-label="Close shopping list"
                className="rounded-xl p-2 text-[#827A91] transition hover:bg-[#F3E8FF] hover:text-[#8129D8]"
              >
                <X size={21} />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-5">
              {savedProducts.length > 0 ? (
                savedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-4 rounded-2xl border border-[#EAE2F5] bg-white p-3"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-24 w-20 rounded-xl object-cover"
                    />
                    <div className="min-w-0 flex-1 py-1">
                      <p className="text-xs text-[#A08AB9]">
                        {product.category}
                      </p>
                      <h3 className="mt-1 text-sm font-bold">
                        {product.name}
                      </h3>
                      <p className="mt-2 font-bold text-[#8129D8]">
                        {formatPrice(product.price)}
                      </p>
                      <button
                        onClick={() => toggleShoppingList(product.id)}
                        className="mt-2 text-xs font-semibold text-[#DB2777] hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F3E8FF] text-[#9333EA]">
                    <ShoppingBag size={28} />
                  </div>
                  <h3 className="mt-5 font-bold">Your list is waiting</h3>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-[#827A91]">
                    Save pieces you love, compare your options, and decide what
                    is worth buying.
                  </p>
                  <button
                    onClick={() => setShowList(false)}
                    className="mt-5 rounded-xl bg-[#8129D8] px-5 py-3 text-sm font-bold text-white"
                  >
                    Discover items
                  </button>
                </div>
              )}
            </div>

            {savedProducts.length > 0 && (
              <div className="border-t border-[#EAE2F5] bg-white p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#827A91]">
                    Estimated total
                  </span>
                  <span className="text-xl font-bold text-[#8129D8]">
                    {formatPrice(
                      savedProducts.reduce(
                        (total, product) => total + product.price,
                        0
                      )
                    )}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-5 text-[#A69AB8]">
                  Estimated from demo prices. Actual prices and availability
                  may vary.
                </p>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* Toast notification */}
      {notice && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-2xl bg-[#272139] px-5 py-3 text-sm font-medium text-white shadow-xl"
        >
          <Check size={17} className="text-[#D8F08B]" />
          {notice}
        </div>
      )}
    </main>
  );
}
