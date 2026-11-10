"use client";

import { useMemo, useState } from "react";
import {
  Search,
  CalendarDays,
  Clock3,
  Heart,
  Star,
  SlidersHorizontal,
  ChevronDown,
  Shirt,
  Sparkles,
  ArrowUpRight,
  X,
  History,
  CalendarCheck,
} from "lucide-react";

interface OutfitHistoryItem {
  id: number;
  name: string;
  date: string;
  occasion: string;
  description: string;
  image: string;
  rating: number;
  items: string[];
  favorite: boolean;
}

const initialHistory: OutfitHistoryItem[] = [
  {
    id: 1,
    name: "Sunday Brunch",
    date: "2026-11-01",
    occasion: "Casual",
    description: "A relaxed but polished look for Sunday brunch.",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900",
    rating: 5,
    items: ["White blouse", "Wide-leg trousers", "Mini handbag"],
    favorite: true,
  },
  {
    id: 2,
    name: "Corporate Chic",
    date: "2026-10-29",
    occasion: "Work",
    description: "A clean, confident look for a busy workday.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900",
    rating: 4,
    items: ["Blazer", "Black trousers", "Heels"],
    favorite: false,
  },
  {
    id: 3,
    name: "Dinner Date",
    date: "2026-10-25",
    occasion: "Date Night",
    description: "An elegant outfit for a special evening.",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900",
    rating: 5,
    items: ["Midi dress", "Strappy heels", "Clutch"],
    favorite: true,
  },
  {
    id: 4,
    name: "Weekend Ease",
    date: "2026-10-20",
    occasion: "Casual",
    description: "Comfortable pieces for running weekend errands.",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900",
    rating: 4,
    items: ["Graphic tee", "Denim jeans", "Sneakers"],
    favorite: false,
  },
  {
    id: 5,
    name: "Traditional Elegance",
    date: "2026-10-18",
    occasion: "Event",
    description: "A beautiful traditional-inspired outfit.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900",
    rating: 5,
    items: ["Ankara outfit", "Statement earrings", "Heels"],
    favorite: true,
  },
  {
    id: 6,
    name: "Coffee Run",
    date: "2026-10-12",
    occasion: "Casual",
    description: "An effortless everyday combination.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900",
    rating: 4,
    items: ["Oversized shirt", "Straight jeans", "Flats"],
    favorite: false,
  },
];

const occasions = ["All occasions", "Casual", "Work", "Date Night", "Event"];

export default function OutfitHistoryPage() {
  const [history, setHistory] = useState(initialHistory);
  const [search, setSearch] = useState("");
  const [occasion, setOccasion] = useState("All occasions");
  const [period, setPeriod] = useState("All time");
  const [selectedOutfit, setSelectedOutfit] =
    useState<OutfitHistoryItem | null>(null);

  const filteredHistory = useMemo(() => {
    return history.filter((outfit) => {
      const matchesSearch =
        outfit.name.toLowerCase().includes(search.toLowerCase()) ||
        outfit.items.some((item) =>
          item.toLowerCase().includes(search.toLowerCase())
        );

      const matchesOccasion =
        occasion === "All occasions" || outfit.occasion === occasion;

      const outfitDate = new Date(outfit.date + "T00:00:00");
      const today = new Date();
      const daysAgo =
        (today.getTime() - outfitDate.getTime()) / (1000 * 60 * 60 * 24);

      const matchesPeriod =
        period === "All time" ||
        (period === "This week" && daysAgo <= 7) ||
        (period === "This month" && daysAgo <= 30);

      return matchesSearch && matchesOccasion && matchesPeriod;
    });
  }, [history, search, occasion, period]);

  const favoriteCount = history.filter((item) => item.favorite).length;

  const averageRating =
    history.length > 0
      ? (
          history.reduce((total, item) => total + item.rating, 0) /
          history.length
        ).toFixed(1)
      : "0";

  const toggleFavorite = (id: number) => {
    setHistory((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, favorite: !item.favorite } : item
      )
    );

    setSelectedOutfit((previous) =>
      previous?.id === id
        ? { ...previous, favorite: !previous.favorite }
        : previous
    );
  };

  const formatDate = (date: string) =>
    new Date(date + "T00:00:00").toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <main className="min-h-screen bg-[#faf9ff] text-[#27213b]">
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-10 md:px-8">
        {/* Header */}
        <div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-purple-600">
              <History size={17} />
              YOUR STYLE JOURNAL
            </div>

            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Outfit History
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 md:text-base">
              Every outfit tells a story. Look back at what you have worn,
              revisit your favourite looks, and keep track of your personal
              style journey.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-purple-100 bg-white px-4 py-3 text-sm text-purple-700 shadow-sm">
            <Sparkles size={17} />
            <span className="font-medium">Your style, one day at a time</span>
          </div>
        </div>

        {/* Statistics */}
        <section className="mb-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            icon={<Shirt size={20} />}
            label="Outfits recorded"
            value={history.length.toString()}
            description="Looks in your style journal"
            color="purple"
          />
          <StatCard
            icon={<Heart size={20} />}
            label="Favourite looks"
            value={favoriteCount.toString()}
            description="Outfits you love the most"
            color="pink"
          />
          <StatCard
            icon={<Star size={20} />}
            label="Average rating"
            value={`${averageRating}/5`}
            description="Your personal outfit ratings"
            color="amber"
          />
        </section>

        {/* History section */}
        <section>
          <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-bold">Your past looks</h2>
              <p className="mt-1 text-sm text-gray-500">
                {filteredHistory.length}{" "}
                {filteredHistory.length === 1 ? "outfit" : "outfits"} found
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {/* Search */}
              <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 sm:min-w-[230px]">
                <Search size={17} className="text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search outfits..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                />
              </div>

              {/* Period filter */}
              <div className="relative">
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-3 pr-9 text-sm outline-none focus:border-purple-400 sm:w-auto"
                >
                  <option>All time</option>
                  <option>This week</option>
                  <option>This month</option>
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Occasion filters */}
          <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
            {occasions.map((item) => (
              <button
                key={item}
                onClick={() => setOccasion(item)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                  occasion === item
                    ? "bg-purple-600 text-white shadow-md shadow-purple-200"
                    : "border border-gray-200 bg-white text-gray-600 hover:border-purple-300 hover:text-purple-600"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Outfit grid */}
          {filteredHistory.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredHistory.map((outfit) => (
                <article
                  key={outfit.id}
                  className="group overflow-hidden rounded-3xl border border-purple-50 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-100/60"
                >
                  <div className="relative h-[310px] overflow-hidden bg-purple-50">
                    <img
                      src={outfit.image}
                      alt={outfit.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-purple-700 backdrop-blur">
                      {outfit.occasion}
                    </span>

                    <button
                      onClick={() => toggleFavorite(outfit.id)}
                      aria-label={
                        outfit.favorite
                          ? "Remove from favourites"
                          : "Add to favourites"
                      }
                      className="absolute right-4 top-4 rounded-full bg-white/90 p-2.5 shadow-sm backdrop-blur transition hover:scale-110"
                    >
                      <Heart
                        size={18}
                        className={
                          outfit.favorite
                            ? "fill-pink-500 text-pink-500"
                            : "text-gray-500"
                        }
                      />
                    </button>

                    <div className="absolute bottom-4 left-4 flex items-center gap-1 rounded-full bg-black/45 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                      <CalendarDays size={13} />
                      {formatDate(outfit.date)}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <h3 className="font-bold">{outfit.name}</h3>
                      <div className="flex shrink-0 items-center gap-1 text-xs font-semibold text-amber-500">
                        <Star size={14} className="fill-amber-400" />
                        {outfit.rating}.0
                      </div>
                    </div>

                    <p className="mb-4 text-sm leading-5 text-gray-500">
                      {outfit.description}
                    </p>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {outfit.items.slice(0, 3).map((item) => (
                        <span
                          key={item}
                          className="rounded-lg bg-purple-50 px-2.5 py-1.5 text-xs text-purple-700"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setSelectedOutfit(outfit)}
                      className="flex w-full items-center justify-between border-t border-gray-100 pt-4 text-sm font-semibold text-purple-600 transition hover:text-purple-800"
                    >
                      View outfit details
                      <ArrowUpRight size={17} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-purple-200 bg-white px-6 py-16 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                <History size={28} />
              </div>
              <h3 className="text-lg font-bold">No outfits found</h3>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                We could not find any outfits matching your search. Try
                changing your filters or search for something else.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setOccasion("All occasions");
                  setPeriod("All time");
                }}
                className="mt-5 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        {/* Inspiration banner */}
        <section className="relative mt-12 overflow-hidden rounded-3xl bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 p-7 text-white md:p-10">
          <div className="relative z-10 max-w-xl">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-purple-100">
              <Sparkles size={17} />
              KEEP EXPLORING
            </div>
            <h2 className="text-2xl font-bold md:text-3xl">
              Your next favourite look is waiting.
            </h2>
            <p className="mt-3 text-sm leading-6 text-purple-100">
              Get creative with the clothes you already own. Put together
              something new and add another memory to your style journal.
            </p>
            <a
              href="/outfit-planner"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-purple-700 transition hover:bg-purple-50"
            >
              Plan an outfit
              <ArrowUpRight size={17} />
            </a>
          </div>

          <div className="absolute -right-10 -top-16 h-64 w-64 rounded-full border-[35px] border-white/10" />
          <div className="absolute -bottom-24 right-36 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        </section>
      </div>

      {/* Outfit details modal */}
      {selectedOutfit && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedOutfit(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-72">
              <img
                src={selectedOutfit.image}
                alt={selectedOutfit.name}
                className="h-full w-full object-cover"
              />
              <button
                onClick={() => setSelectedOutfit(null)}
                className="absolute right-4 top-4 rounded-full bg-white p-2 text-gray-600 shadow"
                aria-label="Close details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
                    {selectedOutfit.occasion}
                  </span>
                  <h2 className="mt-3 text-2xl font-bold">
                    {selectedOutfit.name}
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">
                    {selectedOutfit.description}
                  </p>
                </div>

                <button
                  onClick={() => toggleFavorite(selectedOutfit.id)}
                  className="flex items-center gap-2 rounded-xl border border-pink-100 px-3 py-2 text-sm font-medium text-pink-600 hover:bg-pink-50"
                >
                  <Heart
                    size={17}
                    className={
                      selectedOutfit.favorite ? "fill-pink-500" : ""
                    }
                  />
                  {selectedOutfit.favorite ? "Favourited" : "Add favourite"}
                </button>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-purple-50 p-4">
                  <CalendarDays size={19} className="text-purple-600" />
                  <p className="mt-2 text-xs text-gray-500">Date worn</p>
                  <p className="mt-1 text-sm font-semibold">
                    {formatDate(selectedOutfit.date)}
                  </p>
                </div>

                <div className="rounded-2xl bg-amber-50 p-4">
                  <Star size={19} className="fill-amber-400 text-amber-500" />
                  <p className="mt-2 text-xs text-gray-500">Your rating</p>
                  <p className="mt-1 text-sm font-semibold">
                    {selectedOutfit.rating} out of 5
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-bold">Pieces in this outfit</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedOutfit.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-xl border border-purple-100 bg-purple-50 px-3 py-2 text-sm text-purple-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
  description,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
  color: "purple" | "pink" | "amber";
}) {
  const styles = {
    purple: "bg-purple-50 text-purple-600",
    pink: "bg-pink-50 text-pink-600",
    amber: "bg-amber-50 text-amber-600",
  };

  return (
    <div className="rounded-2xl border border-purple-50 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${styles[color]}`}
        >
          {icon}
        </div>
        <ArrowUpRight size={17} className="text-gray-300" />
      </div>
      <p className="mt-5 text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-gray-400">{description}</p>
    </div>
  );
}
