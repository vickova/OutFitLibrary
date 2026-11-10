"use client";

import WardrobeUploadModal from "@/app/components/WardrobeUploadModal";
import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
} from "react";
import {
  Search,
  Plus,
  Shirt,
  Heart,
  Sparkles,
  Footprints,
  Layers3,
  SlidersHorizontal,
  ArrowUpRight,
  Trash2,
  Pencil,
  X,
  Check,
  ChevronDown,
  PackageOpen,
  WandSparkles,
  LayoutGrid,
} from "lucide-react";

export interface WardrobeItem {
  id: string;
  name: string;
  category: string;
  image: string;
}

const initialWardrobeItems: WardrobeItem[] = [
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
    category: "top",
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
    name: "Sneakers",
    category: "shoes",
    image: "/images/snickers.jpg",
  },
  {
    id: "15",
    name: "Casual Sneakers",
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

const categories = [
  { name: "All items", value: "all", icon: LayoutGrid },
  { name: "Tops", value: "top", icon: Shirt },
  { name: "Shirts", value: "shirt", icon: Shirt },
  { name: "Trousers", value: "trouser", icon: Layers3 },
  { name: "Skirts", value: "skirt", icon: Layers3 },
  { name: "Dresses", value: "dress", icon: Sparkles },
  { name: "Shoes", value: "shoes", icon: Footprints },
];

const formatCategory = (category: string) => {
  const labels: Record<string, string> = {
    top: "Top",
    shirt: "Shirt",
    trouser: "Trouser",
    skirt: "Skirt",
    dress: "Dress",
    shoes: "Shoes",
    accessories: "Accessories",
    bag: "Bag",
    outerwear: "Outerwear",
  };

  return (
    labels[category.toLowerCase()] ??
    category.charAt(0).toUpperCase() + category.slice(1)
  );
};

export default function WardrobePage() {
  const [wardrobeItems, setWardrobeItems] =
    useState<WardrobeItem[]>(initialWardrobeItems);

  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [modalOpen, setModalOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [editingItem, setEditingItem] = useState<WardrobeItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<WardrobeItem | null>(null);
  const [notice, setNotice] = useState("");

  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState("top");

  // Keep temporary upload previews from being accidentally lost when
  // the user navigates around the page. This does not persist after refresh.
  useEffect(() => {
    return () => {
      wardrobeItems.forEach((item) => {
        if (item.image.startsWith("blob:")) {
          URL.revokeObjectURL(item.image);
        }
      });
    };
    // The cleanup should run on unmount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categoryCounts = useMemo(() => {
    return wardrobeItems.reduce<Record<string, number>>((counts, item) => {
      counts[item.category.toLowerCase()] =
        (counts[item.category.toLowerCase()] ?? 0) + 1;

      return counts;
    }, {});
  }, [wardrobeItems]);

  const filteredItems = useMemo(() => {
    let result = wardrobeItems.filter((item) => {
      const matchesCategory =
        activeFilter === "all" ||
        item.category.toLowerCase() === activeFilter;

      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    if (sortBy === "name") {
      result = [...result].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    if (sortBy === "category") {
      result = [...result].sort((a, b) =>
        a.category.localeCompare(b.category)
      );
    }

    if (sortBy === "recent") {
      result = [...result].reverse();
    }

    return result;
  }, [wardrobeItems, activeFilter, search, sortBy]);

  const favoriteCount = favorites.filter((id) =>
    wardrobeItems.some((item) => item.id === id)
  ).length;

  const mostCommonCategory = useMemo(() => {
    const entries = Object.entries(categoryCounts);

    if (!entries.length) return "Not available";

    const [category] = entries.sort((a, b) => b[1] - a[1])[0];

    return formatCategory(category);
  }, [categoryCounts]);

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2500);
  };

  const toggleFavorite = (id: string) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id]
    );
  };

  const openEditModal = (item: WardrobeItem) => {
    setEditingItem(item);
    setEditName(item.name);
    setEditCategory(item.category);
  };

  const saveEditedItem = () => {
    if (!editingItem || !editName.trim()) return;

    setWardrobeItems((current) =>
      current.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              name: editName.trim(),
              category: editCategory,
            }
          : item
      )
    );

    setEditingItem(null);
    showNotice("Wardrobe item updated.");
  };

  const confirmDelete = () => {
    if (!itemToDelete) return;

    setWardrobeItems((current) =>
      current.filter((item) => item.id !== itemToDelete.id)
    );

    setFavorites((current) =>
      current.filter((id) => id !== itemToDelete.id)
    );

    setItemToDelete(null);
    showNotice("Item removed from your wardrobe.");
  };

  // Retained for compatibility if you decide to use a direct upload input.
  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showNotice("Please select an image file.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    const newItem: WardrobeItem = {
      id: crypto.randomUUID(),
      name: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
      category: "top",
      image: imageUrl,
    };

    setWardrobeItems((current) => [...current, newItem]);
    showNotice("New item added to your wardrobe.");

    event.target.value = "";
  };

  return (
    <main className="min-h-screen bg-[#FCFAFF] text-[#272139]">
      <div className="mx-auto max-w-[1440px] px-4 pb-12 pt-6 sm:px-6 lg:px-10">
        {/* Page heading */}
        <header className="mb-8 mt-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#9333EA]">
              <Sparkles size={16} />
              YOUR PERSONAL CLOSET
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              My wardrobe<span className="text-[#A855F7]">.</span>
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#827A91] sm:text-base">
              Everything you own, all in one place. Discover new ways to wear
              your favourite pieces.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8129D8] to-[#C044D8] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            <Plus size={19} />
            Add clothing item
          </button>
        </header>

        {/* Hero banner */}
        <section className="relative mb-8 overflow-hidden rounded-[28px] bg-gradient-to-br from-[#7028D8] via-[#A13DD4] to-[#F06AA9] p-6 text-white sm:p-9">
          <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 right-1/3 h-48 w-48 rounded-full bg-pink-200/20 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-7 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm">
                <WandSparkles size={14} />
                YOUR STYLE STARTS HERE
              </span>

              <h2 className="text-2xl font-bold leading-tight sm:text-4xl">
                Your clothes.
                <br />
                Endless possibilities.
              </h2>

              <p className="mt-3 max-w-lg text-sm leading-6 text-white/85 sm:text-base">
                Build your digital closet, keep track of your pieces, and make
                getting dressed a little more exciting every day.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:min-w-[320px]">
              <div className="rounded-2xl border border-white/20 bg-white/15 p-4 backdrop-blur-md">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                  <Shirt size={21} />
                </div>
                <p className="text-3xl font-bold">{wardrobeItems.length}</p>
                <p className="mt-1 text-xs text-white/80">Wardrobe items</p>
              </div>

              <div className="rounded-2xl border border-white/20 bg-white/15 p-4 backdrop-blur-md">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                  <Heart size={21} />
                </div>
                <p className="text-3xl font-bold">{favoriteCount}</p>
                <p className="mt-1 text-xs text-white/80">Favourite pieces</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick stats */}
        <section className="mb-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-4 rounded-2xl border border-[#F0E7FA] bg-white p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F3E8FF] text-[#9333EA]">
              <Layers3 size={23} />
            </div>
            <div>
              <p className="text-sm text-[#827A91]">Categories</p>
              <p className="mt-1 text-xl font-bold">
                {Object.keys(categoryCounts).length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-[#F0E7FA] bg-white p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FCE7F3] text-[#DB2777]">
              <Sparkles size={23} />
            </div>
            <div>
              <p className="text-sm text-[#827A91]">Largest category</p>
              <p className="mt-1 text-xl font-bold">{mostCommonCategory}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-[#F0E7FA] bg-white p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E0F2FE] text-[#0284C7]">
              <PackageOpen size={23} />
            </div>
            <div>
              <p className="text-sm text-[#827A91]">Showing</p>
              <p className="mt-1 text-xl font-bold">
                {filteredItems.length}{" "}
                <span className="text-sm font-medium text-[#827A91]">
                  items
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Wardrobe tools */}
        <section className="mb-6">
          <div className="mb-5">
            <h2 className="text-xl font-bold sm:text-2xl">
              Explore your wardrobe
            </h2>
            <p className="mt-1 text-sm text-[#827A91]">
              Search, filter, and organize your clothing collection.
            </p>
          </div>

          <div className="mb-5 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A69AB8]"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search your clothes..."
                className="w-full rounded-xl border border-[#EAE2F5] bg-white py-3.5 pl-12 pr-4 text-sm outline-none transition placeholder:text-[#A69AB8] focus:border-[#B76CF0] focus:ring-4 focus:ring-[#A855F7]/10"
              />
            </div>

            <div className="relative sm:w-56">
              <SlidersHorizontal
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#827A91]"
              />

              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="w-full appearance-none rounded-xl border border-[#EAE2F5] bg-white py-3.5 pl-10 pr-10 text-sm outline-none focus:border-[#B76CF0]"
              >
                <option value="recent">Recently added</option>
                <option value="name">Name: A to Z</option>
                <option value="category">Group by category</option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#827A91]"
              />
            </div>
          </div>

          {/* Category filters */}
          <div className="flex gap-2 overflow-x-auto pb-3">
            {categories.map(({ name, value, icon: Icon }) => {
              const count =
                value === "all"
                  ? wardrobeItems.length
                  : categoryCounts[value] ?? 0;

              return (
                <button
                  key={value}
                  onClick={() => setActiveFilter(value)}
                  className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    activeFilter === value
                      ? "bg-[#8129D8] text-white shadow-md shadow-purple-200"
                      : "border border-[#EAE2F5] bg-white text-[#827A91] hover:border-[#C084FC] hover:text-[#8129D8]"
                  }`}
                >
                  <Icon size={16} />
                  {name}
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      activeFilter === value
                        ? "bg-white/20 text-white"
                        : "bg-[#F3E8FF] text-[#8129D8]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Items heading */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold">
              {activeFilter === "all"
                ? "All your pieces"
                : `${formatCategory(activeFilter)} collection`}
            </h2>
            <p className="mt-1 text-sm text-[#827A91]">
              {filteredItems.length}{" "}
              {filteredItems.length === 1 ? "item" : "items"} found
            </p>
          </div>

          {(search || activeFilter !== "all") && (
            <button
              onClick={() => {
                setSearch("");
                setActiveFilter("all");
              }}
              className="shrink-0 rounded-xl px-3 py-2 text-sm font-semibold text-[#9333EA] hover:bg-[#F3E8FF]"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Wardrobe grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
            {filteredItems.map((item) => {
              const isFavorite = favorites.includes(item.id);

              return (
                <article
                  key={item.id}
                  className="group overflow-hidden rounded-2xl border border-[#F0E7FA] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#D8B4FE] hover:shadow-xl hover:shadow-purple-100/60"
                >
                  {/* Item image */}
                  <div className="relative overflow-hidden bg-[#F7F0FC]">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="h-44 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-56"
                    />

                    <div className="absolute left-2 top-2 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold capitalize text-[#8129D8] shadow-sm sm:left-3 sm:top-3 sm:text-xs">
                      {formatCategory(item.category)}
                    </div>

                    <button
                      onClick={() => toggleFavorite(item.id)}
                      aria-label={
                        isFavorite
                          ? "Remove from favourites"
                          : "Add to favourites"
                      }
                      className={`absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full shadow-sm transition sm:right-3 sm:top-3 ${
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

                    {/* Hover actions */}
                    <div className="absolute inset-x-0 bottom-0 flex translate-y-full gap-2 bg-gradient-to-t from-black/50 to-transparent p-3 pt-8 transition-transform duration-300 group-hover:translate-y-0">
                      <button
                        onClick={() => openEditModal(item)}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-white px-2 py-2 text-xs font-bold text-[#272139] hover:bg-[#F3E8FF]"
                      >
                        <Pencil size={14} />
                        Edit
                      </button>

                      <button
                        onClick={() => setItemToDelete(item)}
                        aria-label={`Delete ${item.name}`}
                        className="flex h-8 w-9 items-center justify-center rounded-lg bg-white text-[#DB2777] hover:bg-[#FCE7F3]"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Item details */}
                  <div className="p-3.5 sm:p-4">
                    <h3 className="truncate text-sm font-bold text-[#272139] sm:text-base">
                      {item.name}
                    </h3>

                    <div className="mt-2 flex items-center justify-between gap-2">
                      <span className="text-xs capitalize text-[#827A91]">
                        {formatCategory(item.category)}
                      </span>

                      <span className="flex items-center gap-1 text-[10px] font-medium text-[#A08AB9] sm:text-xs">
                        <Check size={12} />
                        In wardrobe
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-[#D8C6ED] bg-white px-5 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F3E8FF] text-[#9333EA]">
              {search ? <Search size={28} /> : <PackageOpen size={28} />}
            </div>

            <h3 className="mt-5 text-lg font-bold">
              {search ? "No matching clothes found" : "Your closet is waiting"}
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#827A91]">
              {search
                ? "Try a different search term or clear your filters."
                : "Add your clothing items to start building your digital wardrobe and planning outfits."}
            </p>

            {search ? (
              <button
                onClick={() => {
                  setSearch("");
                  setActiveFilter("all");
                }}
                className="mt-5 rounded-xl bg-[#8129D8] px-5 py-3 text-sm font-bold text-white hover:bg-[#6B21A8]"
              >
                Clear filters
              </button>
            ) : (
              <button
                onClick={() => setModalOpen(true)}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#8129D8] px-5 py-3 text-sm font-bold text-white hover:bg-[#6B21A8]"
              >
                <Plus size={17} />
                Add your first item
              </button>
            )}
          </div>
        )}

        {/* Outfit planner CTA */}
        <section className="mt-12 overflow-hidden rounded-3xl border border-[#F2D9E9] bg-gradient-to-r from-[#FFF0F7] via-[#F8F0FF] to-[#EEF6FF] p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#9333EA] shadow-sm">
                <WandSparkles size={24} />
              </div>

              <div>
                <h3 className="text-lg font-bold sm:text-xl">
                  Your next great outfit is already here.
                </h3>

                <p className="mt-2 max-w-xl text-sm leading-6 text-[#827A91]">
                  Mix and match the clothes you already own. Plan looks for
                  work, outings, special occasions, and everyday life.
                </p>
              </div>
            </div>

            <a
              href="/dashboard/stylist"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#8129D8] shadow-sm transition hover:shadow-md"
            >
              Plan an outfit
              <ArrowUpRight size={17} />
            </a>
          </div>
        </section>

        <footer className="pb-4 pt-10 text-center text-xs text-[#A69AB8]">
          OutfitLibrary · Love your clothes. Rediscover your style.
        </footer>
      </div>

      {/* Existing upload modal */}
      <WardrobeUploadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        setWardrobeItems={setWardrobeItems}
      />

      {/* Edit item modal */}
      {editingItem && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#20152E]/40 p-4 backdrop-blur-sm"
          onClick={() => setEditingItem(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-item-title"
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 id="edit-item-title" className="text-xl font-bold">
                  Edit clothing item
                </h2>
                <p className="mt-1 text-sm text-[#827A91]">
                  Update the item's name or category.
                </p>
              </div>

              <button
                onClick={() => setEditingItem(null)}
                aria-label="Close edit dialog"
                className="rounded-xl p-2 text-[#827A91] hover:bg-[#F3E8FF]"
              >
                <X size={20} />
              </button>
            </div>

            <label
              htmlFor="item-name"
              className="mb-2 block text-sm font-semibold"
            >
              Item name
            </label>

            <input
              id="item-name"
              value={editName}
              onChange={(event) => setEditName(event.target.value)}
              className="mb-5 w-full rounded-xl border border-[#EAE2F5] px-4 py-3 text-sm outline-none focus:border-[#B76CF0] focus:ring-4 focus:ring-[#A855F7]/10"
              placeholder="e.g. Blue denim jacket"
            />

            <label
              htmlFor="item-category"
              className="mb-2 block text-sm font-semibold"
            >
              Category
            </label>

            <select
              id="item-category"
              value={editCategory}
              onChange={(event) => setEditCategory(event.target.value)}
              className="w-full rounded-xl border border-[#EAE2F5] bg-white px-4 py-3 text-sm outline-none focus:border-[#B76CF0]"
            >
              <option value="top">Top</option>
              <option value="shirt">Shirt</option>
              <option value="trouser">Trouser</option>
              <option value="skirt">Skirt</option>
              <option value="dress">Dress</option>
              <option value="shoes">Shoes</option>
              <option value="accessories">Accessories</option>
              <option value="bag">Bag</option>
              <option value="outerwear">Outerwear</option>
            </select>

            <div className="mt-7 flex gap-3">
              <button
                onClick={() => setEditingItem(null)}
                className="flex-1 rounded-xl border border-[#EAE2F5] px-4 py-3 text-sm font-semibold hover:bg-[#FCFAFF]"
              >
                Cancel
              </button>

              <button
                onClick={saveEditedItem}
                disabled={!editName.trim()}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#8129D8] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#6B21A8] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Check size={17} />
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {itemToDelete && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#20152E]/40 p-4 backdrop-blur-sm"
          onClick={() => setItemToDelete(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-item-title"
            className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FCE7F3] text-[#DB2777]">
              <Trash2 size={24} />
            </div>

            <h2 id="delete-item-title" className="mt-4 text-xl font-bold">
              Remove this item?
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#827A91]">
              Are you sure you want to remove{" "}
              <span className="font-semibold text-[#272139]">
                {itemToDelete.name}
              </span>{" "}
              from your wardrobe?
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setItemToDelete(null)}
                className="flex-1 rounded-xl border border-[#EAE2F5] px-4 py-3 text-sm font-semibold hover:bg-[#FCFAFF]"
              >
                Keep item
              </button>

              <button
                onClick={confirmDelete}
                className="flex-1 rounded-xl bg-[#DB2777] px-4 py-3 text-sm font-bold text-white hover:bg-[#BE185D]"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {notice && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2 rounded-2xl bg-[#272139] px-5 py-3 text-sm font-medium text-white shadow-xl"
        >
          <Check size={17} className="text-[#D8F08B]" />
          {notice}
        </div>
      )}
    </main>
  );
}