"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock,
  CloudSun,
  Heart,
  MapPin,
  Plus,
  Shirt,
  ShoppingBag,
  Sparkles,
  WandSparkles,
  X,
  Footprints,
  Palette,
  RefreshCw,
  SlidersHorizontal,
  Star,
  Bookmark,
  Sun,
  BriefcaseBusiness,
  PartyPopper,
  Church,
  Coffee,
  Camera,
  UsersRound,
  Crown,
} from "lucide-react";

type Outfit = {
  id: number;
  name: string;
  occasion: string;
  description: string;
  colors: string[];
  items: {
    name: string;
    category: string;
    image: string;
    owned: boolean;
  }[];
  image: string;
  match: number;
  style: string;
};

const occasions = [
  { label: "Work", icon: BriefcaseBusiness, color: "bg-blue-100 text-blue-600" },
  { label: "Wedding", icon: Heart, color: "bg-pink-100 text-pink-600" },
  { label: "Church", icon: Church, color: "bg-purple-100 text-purple-600" },
  { label: "Date night", icon: Star, color: "bg-rose-100 text-rose-600" },
  { label: "Casual outing", icon: Coffee, color: "bg-orange-100 text-orange-600" },
  { label: "Party", icon: PartyPopper, color: "bg-amber-100 text-amber-600" },
  { label: "Interview", icon: BriefcaseBusiness, color: "bg-emerald-100 text-emerald-600" },
  { label: "Photoshoot", icon: Camera, color: "bg-violet-100 text-violet-600" },
];

const styles = [
  "Elegant",
  "Casual",
  "Corporate",
  "Minimalist",
  "Traditional",
  "Trendy",
  "Bold & Colorful",
  "Soft & Feminine",
];

const dressCodes = [
  "No preference",
  "Casual",
  "Smart casual",
  "Business formal",
  "Black tie",
  "Traditional",
  "All white",
  "Ankara / Aso Ebi",
];

const sampleOutfits: Outfit[] = [
  {
    id: 1,
    name: "The Effortless Classic",
    occasion: "Work",
    description:
      "A polished combination that feels professional without sacrificing comfort.",
    colors: ["#F5E6D3", "#293B32", "#B88A68"],
    match: 96,
    style: "Elegant",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop&q=85",
    items: [
      {
        name: "Cream blouse",
        category: "Top",
        image:
          "https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=300&auto=format&fit=crop&q=80",
        owned: true,
      },
      {
        name: "Tailored trousers",
        category: "Bottom",
        image:
          "https://images.unsplash.com/photo-1506629905607-d9b3e9a3e0b7?w=300&auto=format&fit=crop&q=80",
        owned: true,
      },
      {
        name: "Classic heels",
        category: "Shoes",
        image:
          "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&auto=format&fit=crop&q=80",
        owned: false,
      },
    ],
  },
  {
    id: 2,
    name: "Soft Romantic",
    occasion: "Wedding",
    description:
      "A graceful look with soft colors and elegant finishing touches.",
    colors: ["#EBC6D5", "#F8F0E8", "#C9A5BA"],
    match: 92,
    style: "Elegant",
    image:
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&auto=format&fit=crop&q=85",
    items: [
      {
        name: "Elegant dress",
        category: "Dress",
        image:
          "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=300&auto=format&fit=crop&q=80",
        owned: true,
      },
      {
        name: "Statement earrings",
        category: "Accessories",
        image:
          "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&auto=format&fit=crop&q=80",
        owned: true,
      },
      {
        name: "Evening heels",
        category: "Shoes",
        image:
          "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&auto=format&fit=crop&q=80",
        owned: false,
      },
    ],
  },
  {
    id: 3,
    name: "Relaxed Weekend",
    occasion: "Casual outing",
    description:
      "An easy, comfortable outfit for brunch, errands, or meeting friends.",
    colors: ["#FFFFFF", "#D8B99C", "#7A8C79"],
    match: 89,
    style: "Casual",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=85",
    items: [
      {
        name: "White shirt",
        category: "Top",
        image:
          "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=300&auto=format&fit=crop&q=80",
        owned: true,
      },
      {
        name: "Straight-leg jeans",
        category: "Bottom",
        image:
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&auto=format&fit=crop&q=80",
        owned: true,
      },
      {
        name: "Everyday sneakers",
        category: "Shoes",
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&auto=format&fit=crop&q=80",
        owned: true,
      },
    ],
  },
  {
    id: 4,
    name: "Bold & Beautiful",
    occasion: "Party",
    description:
      "A statement-making look for a celebration where you want to stand out.",
    colors: ["#702963", "#F3C969", "#F8E7EF"],
    match: 87,
    style: "Bold & Colorful",
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&auto=format&fit=crop&q=85",
    items: [
      {
        name: "Statement outfit",
        category: "Clothing",
        image:
          "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&auto=format&fit=crop&q=80",
        owned: true,
      },
      {
        name: "Gold accessories",
        category: "Accessories",
        image:
          "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=300&auto=format&fit=crop&q=80",
        owned: true,
      },
      {
        name: "Statement heels",
        category: "Shoes",
        image:
          "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&auto=format&fit=crop&q=80",
        owned: false,
      },
    ],
  },
];

export default function StylistPage() {
  const [occasion, setOccasion] = useState("Work");
  const [style, setStyle] = useState("Elegant");
  const [dressCode, setDressCode] = useState("No preference");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [weather, setWeather] = useState("Any weather");
  const [useWardrobe, setUseWardrobe] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[]>([]);
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);

  const filteredOutfits = sampleOutfits.filter((outfit) => {
    return outfit.occasion === occasion;
  });

  const visibleOutfits =
    filteredOutfits.length > 0
      ? filteredOutfits
      : sampleOutfits.filter((outfit) => {
          if (style === "Casual") {
            return outfit.style === "Casual";
          }

          if (style === "Bold & Colorful") {
            return outfit.style === "Bold & Colorful";
          }

          return outfit.style === style;
        });

  const displayedOutfits =
    visibleOutfits.length > 0 ? visibleOutfits : sampleOutfits;

  function generateOutfits() {
    setGenerated(true);
    setSelectedOutfit(null);

    window.setTimeout(() => {
      document.getElementById("outfit-results")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }

  function toggleFavorite(id: number) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function toggleSaved(id: number) {
    setSaved((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF9FF] text-slate-800">
      {/* TOP HEADER */}
      <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-purple-100 bg-white/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            aria-label="Back to dashboard"
            className="rounded-xl border border-slate-100 p-2.5 text-slate-500 transition hover:bg-purple-50 hover:text-purple-600"
          >
            <ArrowLeft size={19} />
          </Link>

          <div>
            <h1 className="text-base font-extrabold text-slate-900 sm:text-lg">
              Outfit Planner
            </h1>

            <p className="hidden text-xs text-slate-500 sm:block">
              Your personal AI styling studio
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/history"
            className="hidden items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-purple-50 sm:flex"
          >
            <Heart size={17} />
            My looks
          </Link>

          <Link
            href="/dashboard/wardrobe"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-3 py-2.5 text-xs font-bold text-white shadow-md shadow-purple-100 transition hover:-translate-y-0.5 sm:px-4 sm:text-sm"
          >
            <Shirt size={16} />
            <span className="hidden sm:inline">My Wardrobe</span>
            <span className="sm:hidden">Wardrobe</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] space-y-7 p-4 sm:p-6 lg:p-8">
        {/* HERO */}
        <section className="relative isolate overflow-hidden rounded-[28px] bg-gradient-to-br from-violet-700 via-purple-600 to-pink-500 p-6 text-white shadow-xl shadow-purple-100 sm:p-8 lg:p-10">
          <div className="absolute -right-16 -top-24 -z-10 h-80 w-80 rounded-full bg-pink-300/30 blur-3xl" />

          <div className="absolute -bottom-24 left-1/3 -z-10 h-64 w-64 rounded-full bg-orange-300/30 blur-3xl" />

          <div className="grid items-center gap-8 lg:grid-cols-[1fr_300px]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm">
                <Sparkles size={14} />
                YOUR PERSONAL STYLIST
              </div>

              <h2 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                What are we
                <br />
                wearing today? <span className="text-yellow-300">✨</span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-white/85 sm:text-base">
                Tell us where you're going. We'll help you discover
                beautiful combinations, shop smarter, and get dressed
                with confidence.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-xs font-medium">
                <span className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-2">
                  <Heart size={14} />
                  Your personal style
                </span>

                <span className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-2">
                  <Shirt size={14} />
                  Your own wardrobe
                </span>

                <span className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-2">
                  <Sparkles size={14} />
                  Endless possibilities
                </span>
              </div>
            </div>

            <div className="relative mx-auto hidden h-[270px] w-[260px] md:block">
              <div className="absolute inset-3 rotate-6 rounded-[35px] bg-white/15" />

              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&auto=format&fit=crop&q=85"
                alt="Fashion inspiration"
                className="absolute inset-5 h-[230px] w-[220px] rounded-[30px] border-4 border-white/50 object-cover shadow-2xl"
              />

              <div className="absolute -left-3 top-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-300 text-orange-700 shadow-lg">
                <WandSparkles size={24} />
              </div>

              <div className="absolute -right-3 bottom-5 flex items-center gap-2 rounded-xl bg-white px-3 py-3 text-xs font-bold text-purple-700 shadow-xl">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                Main character energy
              </div>
            </div>
          </div>
        </section>

        {/* PLANNER GRID */}
        <div className="grid items-start gap-6 xl:grid-cols-[370px_minmax(0,1fr)]">
          {/* LEFT: PREFERENCES */}
          <aside className="space-y-5">
            <section className="rounded-3xl border border-purple-100 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 text-purple-600">
                  <SlidersHorizontal size={21} />
                </div>

                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    Style preferences
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Let's create your perfect look.
                  </p>
                </div>
              </div>

              {/* OCCASION */}
              <div className="mt-7">
                <label className="text-sm font-bold text-slate-800">
                  1. What's the occasion?
                </label>

                <p className="mt-1 text-xs text-slate-500">
                  Pick where you're headed.
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  {occasions.map((item) => {
                    const Icon = item.icon;
                    const active = occasion === item.label;

                    return (
                      <button
                        type="button"
                        key={item.label}
                        onClick={() => {
                          setOccasion(item.label);
                          setGenerated(false);
                        }}
                        className={`flex items-center gap-2 rounded-xl border p-3 text-left text-xs font-semibold transition ${
                          active
                            ? "border-purple-300 bg-purple-50 text-purple-700 ring-2 ring-purple-100"
                            : "border-slate-100 bg-white text-slate-600 hover:border-purple-200 hover:bg-purple-50/50"
                        }`}
                      >
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.color}`}
                        >
                          <Icon size={16} />
                        </span>

                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STYLE */}
              <div className="mt-7">
                <label className="text-sm font-bold text-slate-800">
                  2. What's your style?
                </label>

                <p className="mt-1 text-xs text-slate-500">
                  Choose the vibe you want.
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {styles.map((item) => {
                    const active = style === item;

                    return (
                      <button
                        type="button"
                        key={item}
                        onClick={() => {
                          setStyle(item);
                          setGenerated(false);
                        }}
                        className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${
                          active
                            ? "border-purple-500 bg-purple-600 text-white shadow-md shadow-purple-100"
                            : "border-slate-200 bg-white text-slate-600 hover:border-purple-300 hover:text-purple-700"
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* DRESS CODE */}
              <div className="mt-7">
                <label
                  htmlFor="dressCode"
                  className="text-sm font-bold text-slate-800"
                >
                  3. Dress code
                </label>

                <div className="relative mt-3">
                  <select
                    id="dressCode"
                    value={dressCode}
                    onChange={(e) => {
                      setDressCode(e.target.value);
                      setGenerated(false);
                    }}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-700 outline-none transition focus:border-purple-400 focus:ring-4 focus:ring-purple-50"
                  >
                    {dressCodes.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>

                  <ChevronDown
                    size={17}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </div>

              {/* ADVANCED OPTIONS */}
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="mt-6 flex w-full items-center justify-between border-t border-slate-100 pt-5 text-sm font-bold text-slate-700 transition hover:text-purple-600"
              >
                More preferences
                <ChevronDown
                  size={17}
                  className={`transition-transform ${showAdvanced ? "rotate-180" : ""}`}
                />
              </button>

              {showAdvanced && (
                <div className="space-y-5 pt-4">
                  <div>
                    <label
                      htmlFor="eventDate"
                      className="flex items-center gap-2 text-xs font-bold text-slate-700"
                    >
                      <CalendarDays size={15} />
                      When is your event?
                    </label>

                    <input
                      id="eventDate"
                      type="datetime-local"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="location"
                      className="flex items-center gap-2 text-xs font-bold text-slate-700"
                    >
                      <MapPin size={15} />
                      Where are you going?
                    </label>

                    <input
                      id="location"
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Lagos, outdoor venue"
                      className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="weather"
                      className="flex items-center gap-2 text-xs font-bold text-slate-700"
                    >
                      <CloudSun size={15} />
                      Weather preference
                    </label>

                    <select
                      id="weather"
                      value={weather}
                      onChange={(e) => setWeather(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-purple-400"
                    >
                      <option>Any weather</option>
                      <option>Hot and sunny</option>
                      <option>Rainy</option>
                      <option>Cool weather</option>
                      <option>Indoor event</option>
                      <option>Outdoor event</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="notes"
                      className="text-xs font-bold text-slate-700"
                    >
                      Anything else we should know?
                    </label>

                    <textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. I want to wear my blue heels..."
                      rows={3}
                      className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-purple-400"
                    />
                  </div>
                </div>
              )}

              {/* WARDROBE TOGGLE */}
              <div className="mt-6 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-purple-600 shadow-sm">
                    <Shirt size={19} />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800">
                      Use my wardrobe
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Prioritize clothes you already own.
                    </p>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={useWardrobe}
                    aria-label="Use my wardrobe"
                    onClick={() => setUseWardrobe(!useWardrobe)}
                    className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                      useWardrobe ? "bg-purple-600" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                        useWardrobe ? "left-6" : "left-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* GENERATE BUTTON */}
              <button
                type="button"
                onClick={generateOutfits}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-violet-600 px-5 py-4 text-sm font-extrabold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                <WandSparkles size={19} />
                Generate my outfits
                <Sparkles size={16} />
              </button>

              <p className="mt-3 text-center text-[10px] leading-5 text-slate-400">
                Made for your style, your occasions, and your wardrobe.
              </p>
            </section>

            {/* QUICK TIP */}
            <section className="rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 to-pink-50 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-orange-500 shadow-sm">
                  <Sparkles size={20} />
                </div>

                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">
                    A little style secret
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-slate-600">
                    Start with one statement piece, then build your outfit
                    around its colors, shape, and personality.
                  </p>
                </div>
              </div>
            </section>
          </aside>

          {/* RIGHT: OUTFIT RESULTS */}
          <section id="outfit-results" className="min-w-0 scroll-mt-24">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles size={19} className="text-purple-600" />

                  <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                    {generated ? "Your outfit ideas" : "Your style inspiration"}
                  </h2>
                </div>

                <p className="mt-2 text-sm text-slate-500">
                  {generated
                    ? `Exploring ${style.toLowerCase()} looks for ${occasion.toLowerCase()}.`
                    : "A little inspiration to help you find your next favorite look."}
                </p>
              </div>

              <button
                type="button"
                onClick={generateOutfits}
                className="flex items-center gap-2 rounded-xl border border-purple-100 bg-white px-3 py-2.5 text-xs font-bold text-purple-700 transition hover:bg-purple-50"
              >
                <RefreshCw size={15} />
                Refresh looks
              </button>
            </div>

            {/* RESULTS INFO */}
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-purple-100 px-3 py-1.5 text-xs font-semibold text-purple-700">
                {occasion}
              </span>

              <span className="rounded-full bg-pink-100 px-3 py-1.5 text-xs font-semibold text-pink-700">
                {style}
              </span>

              <span className="rounded-full bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-700">
                {dressCode}
              </span>

              {useWardrobe && (
                <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                  <Check size={12} />
                  My wardrobe
                </span>
              )}
            </div>

            {/* OUTFIT CARDS */}
            <div className="grid gap-5 md:grid-cols-2">
              {displayedOutfits.map((outfit, index) => (
                <article
                  key={outfit.id}
                  className="group overflow-hidden rounded-3xl border border-purple-100/70 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-100/60"
                >
                  {/* IMAGE */}
                  <div className="relative aspect-[4/4.2] overflow-hidden bg-gradient-to-br from-pink-50 to-purple-50">
                    <img
                      src={outfit.image}
                      alt={outfit.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-2 text-[10px] font-extrabold text-purple-700 shadow-sm backdrop-blur-sm">
                      <Sparkles size={12} />
                      {index === 0 ? "TOP PICK" : "STYLE IDEA"}
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleFavorite(outfit.id)}
                      aria-label={
                        favorites.includes(outfit.id)
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                      className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full shadow-md backdrop-blur-md transition ${
                        favorites.includes(outfit.id)
                          ? "bg-pink-500 text-white"
                          : "bg-white/95 text-pink-500 hover:bg-pink-50"
                      }`}
                    >
                      <Heart
                        size={18}
                        fill={
                          favorites.includes(outfit.id)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>

                    <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl bg-white/95 px-3 py-2.5 shadow-sm backdrop-blur-md">
                      <div className="flex -space-x-1">
                        {outfit.colors.map((color) => (
                          <span
                            key={color}
                            className="h-5 w-5 rounded-full border-2 border-white"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>

                      <span className="text-[10px] font-bold text-slate-700">
                        Color palette
                      </span>
                    </div>
                  </div>

                  {/* DETAILS */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-purple-500">
                          {outfit.style} edit
                        </p>

                        <h3 className="mt-2 text-lg font-extrabold text-slate-900">
                          {outfit.name}
                        </h3>
                      </div>

                      <div className="flex shrink-0 items-center gap-1 rounded-xl bg-emerald-50 px-2.5 py-2 text-xs font-extrabold text-emerald-700">
                        <Star
                          size={13}
                          className="fill-emerald-500 text-emerald-500"
                        />
                        {outfit.match}%
                      </div>
                    </div>

                    <p className="mt-2 text-xs leading-6 text-slate-500">
                      {outfit.description}
                    </p>

                    {/* OUTFIT ITEMS */}
                    <div className="mt-5">
                      <div className="mb-3 flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-800">
                          The complete look
                        </h4>

                        <span className="text-[10px] text-slate-400">
                          {outfit.items.length} items
                        </span>
                      </div>

                      <div className="space-y-2">
                        {outfit.items.map((item) => (
                          <div
                            key={item.name}
                            className="flex items-center gap-3 rounded-xl bg-slate-50 p-2"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-12 w-12 rounded-lg bg-white object-cover"
                            />

                            <div className="min-w-0 flex-1">
                              <p className="truncate text-xs font-bold text-slate-800">
                                {item.name}
                              </p>

                              <p className="mt-1 text-[10px] text-slate-500">
                                {item.category}
                              </p>
                            </div>

                            <span
                              className={`shrink-0 rounded-full px-2 py-1 text-[9px] font-bold ${
                                item.owned
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-orange-100 text-orange-700"
                              }`}
                            >
                              {item.owned ? "OWNED" : "TO GET"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="mt-5 grid grid-cols-[1fr_auto] gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedOutfit(outfit)}
                        className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-3 py-3 text-xs font-bold text-white shadow-md shadow-purple-100 transition hover:-translate-y-0.5"
                      >
                        View complete look
                        <ArrowRight size={15} />
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleSaved(outfit.id)}
                        aria-label={
                          saved.includes(outfit.id)
                            ? "Remove saved outfit"
                            : "Save outfit"
                        }
                        className={`flex items-center justify-center rounded-xl border p-3 transition ${
                          saved.includes(outfit.id)
                            ? "border-purple-300 bg-purple-100 text-purple-700"
                            : "border-slate-200 text-slate-500 hover:border-purple-200 hover:bg-purple-50 hover:text-purple-600"
                        }`}
                      >
                        <Bookmark
                          size={17}
                          fill={
                            saved.includes(outfit.id)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* MORE INSPIRATION */}
            <div className="mt-6 rounded-3xl border border-dashed border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-6 text-center sm:p-8">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-purple-600 shadow-sm">
                <WandSparkles size={23} />
              </div>

              <h3 className="mt-4 text-lg font-extrabold text-slate-900">
                Your next favorite outfit is waiting.
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Change your preferences and explore a different combination
                for your next occasion.
              </p>

              <button
                type="button"
                onClick={generateOutfits}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-purple-700 shadow-sm transition hover:bg-purple-100"
              >
                <RefreshCw size={16} />
                Explore more looks
              </button>
            </div>
          </section>
        </div>

        {/* STYLE TIP FOOTER */}
        <footer className="flex flex-col items-center justify-between gap-3 border-t border-purple-100 py-5 text-xs text-slate-400 sm:flex-row">
          <p>OutfitLibrary · Your style, your story.</p>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/wardrobe"
              className="transition hover:text-purple-600"
            >
              My Wardrobe
            </Link>

            <Link
              href="/dashboard/calendar"
              className="transition hover:text-purple-600"
            >
              Plan an event
            </Link>

            <Link
              href="/dashboard/history"
              className="transition hover:text-purple-600"
            >
              Saved looks
            </Link>
          </div>
        </footer>
      </div>

      {/* OUTFIT DETAIL MODAL */}
      {selectedOutfit && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedOutfit(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="outfit-modal-title"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-purple-600">
                  Outfit details
                </p>

                <h2
                  id="outfit-modal-title"
                  className="mt-1 text-xl font-extrabold text-slate-900"
                >
                  {selectedOutfit.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOutfit(null)}
                aria-label="Close outfit details"
                className="rounded-xl bg-slate-100 p-2 text-slate-600 transition hover:bg-pink-100 hover:text-pink-600"
              >
                <X size={19} />
              </button>
            </div>

            <div className="grid gap-5 p-5 sm:grid-cols-2">
              <img
                src={selectedOutfit.image}
                alt={selectedOutfit.name}
                className="h-72 w-full rounded-2xl object-cover"
              />

              <div>
                <p className="text-sm leading-6 text-slate-600">
                  {selectedOutfit.description}
                </p>

                <div className="mt-5 flex items-center gap-2">
                  <Star
                    size={17}
                    className="fill-yellow-400 text-yellow-400"
                  />

                  <span className="text-sm font-bold text-slate-800">
                    {selectedOutfit.match}% style match
                  </span>
                </div>

                <h3 className="mt-6 text-sm font-extrabold text-slate-900">
                  Outfit checklist
                </h3>

                <div className="mt-3 space-y-3">
                  {selectedOutfit.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-3"
                    >
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                          item.owned
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        {item.owned ? (
                          <Check size={16} />
                        ) : (
                          <ShoppingBag size={16} />
                        )}
                      </div>

                      <div>
                        <p className="text-xs font-bold text-slate-800">
                          {item.name}
                        </p>

                        <p className="mt-1 text-[10px] text-slate-500">
                          {item.owned
                            ? "Already in your wardrobe"
                            : "Consider adding to your shopping list"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href="/shopping"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-3 text-sm font-bold text-white"
                >
                  <ShoppingBag size={16} />
                  View shopping list
                </Link>

                <button
                  type="button"
                  onClick={() => toggleSaved(selectedOutfit.id)}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-purple-200 px-4 py-3 text-sm font-bold text-purple-700 transition hover:bg-purple-50"
                >
                  <Bookmark
                    size={16}
                    fill={
                      saved.includes(selectedOutfit.id)
                        ? "currentColor"
                        : "none"
                    }
                  />
                  {saved.includes(selectedOutfit.id)
                    ? "Remove saved look"
                    : "Save this look"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}