"use client";

import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  CloudSun,
  Heart,
  Plus,
  ShoppingBag,
  Shirt,
  Sparkles,
  Sun,
  TrendingUp,
  UsersRound,
  WandSparkles,
  Footprints,
  Palette,
  Menu,
} from "lucide-react";

// Sample dashboard data
const wardrobeStats = [
  { label: "Tops", count: 32, color: "bg-pink-100 text-pink-600" },
  { label: "Bottoms", count: 18, color: "bg-violet-100 text-violet-600" },
  { label: "Dresses", count: 24, color: "bg-orange-100 text-orange-600" },
  { label: "Shoes", count: 16, color: "bg-blue-100 text-blue-600" },
  { label: "Bags", count: 12, color: "bg-emerald-100 text-emerald-600" },
  { label: "Accessories", count: 28, color: "bg-amber-100 text-amber-600" },
];

const upcomingEvents = [
  {
    title: "Friend's Wedding",
    date: "Nov 02",
    daysLeft: "4 days left",
    type: "Wedding",
    color: "bg-pink-100 text-pink-600",
    icon: Heart,
    planned: false,
  },
  {
    title: "Family Dinner",
    date: "Nov 05",
    daysLeft: "7 days left",
    type: "Family",
    color: "bg-orange-100 text-orange-600",
    icon: UsersRound,
    planned: true,
  },
  {
    title: "Church Service",
    date: "Nov 08",
    daysLeft: "10 days left",
    type: "Church",
    color: "bg-violet-100 text-violet-600",
    icon: Sun,
    planned: true,
  },
];

const recentOutfits = [
  {
    id: 1,
    name: "Weekend Brunch",
    description: "Casual · Chic",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&auto=format&fit=crop&q=80",
    color: "bg-pink-100",
  },
  {
    id: 2,
    name: "Office Ready",
    description: "Smart · Professional",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&auto=format&fit=crop&q=80",
    color: "bg-purple-100",
  },
  {
    id: 3,
    name: "Dinner Date",
    description: "Elegant · Evening",
    image:
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500&auto=format&fit=crop&q=80",
    color: "bg-orange-100",
  },
  {
    id: 4,
    name: "Sunday Best",
    description: "Elegant · Classic",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&auto=format&fit=crop&q=80",
    color: "bg-blue-100",
  },
];

export default function DashboardPage() {
  const firstName = "Victoria";

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FAF9FF] text-slate-800">
      {/* TOP NAVIGATION */}
      <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-purple-100/70 bg-white/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
        {/* Mobile menu placeholder */}
        <button
          type="button"
          aria-label="Menu"
          className="rounded-xl p-2 text-slate-600 hover:bg-purple-50 lg:hidden"
        >
          <Menu size={22} />
        </button>

        {/* Search */}
        <div className="hidden w-full max-w-md items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 md:flex">
          <span className="text-slate-400">
            <Sparkles size={17} />
          </span>

          <input
            type="search"
            placeholder="Search outfits, items, or events..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/stylist"
            className="hidden items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-purple-200 transition hover:-translate-y-0.5 hover:shadow-lg sm:flex"
          >
            <Sparkles size={16} />
            AI Stylist
          </Link>

          <button
            type="button"
            aria-label="Notifications"
            className="relative rounded-xl border border-slate-100 bg-white p-2.5 text-slate-500 transition hover:bg-pink-50 hover:text-pink-600"
          >
            <Bell size={19} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-pink-500" />
          </button>

          <Link
            href="/dashboard/settings"
            aria-label="Your profile"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-300 via-pink-400 to-purple-500 text-sm font-bold text-white ring-2 ring-pink-100"
          >
            V
          </Link>
        </div>
      </header>

      {/* DASHBOARD CONTENT */}
      <div className="mx-auto max-w-[1600px] space-y-7 p-4 sm:p-6 lg:p-8">
        {/* WELCOME BANNER */}
        <section className="relative isolate overflow-hidden rounded-[28px] bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-400 p-6 text-white shadow-xl shadow-purple-100 sm:p-8 lg:p-10">
          {/* Decorative shapes */}
          <div className="absolute -right-12 -top-24 -z-10 h-72 w-72 rounded-full bg-orange-300/40 blur-3xl" />
          <div className="absolute -bottom-28 left-1/3 -z-10 h-64 w-64 rounded-full bg-pink-300/40 blur-3xl" />

          <div className="grid items-center gap-8 md:grid-cols-[1fr_220px] lg:grid-cols-[1fr_280px]">
            <div>

              <h1 className="text-3xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                Good morning,
                {firstName}!
              </h1>

              <p className="mt-4 max-w-lg text-sm leading-7 text-white/90 sm:text-base">
                Confidence looks good on you. Let's find an outfit that makes
                you feel amazing today.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/dashboard/stylist"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2 text-sm font-bold text-purple-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-pink-50"
                >
                  <WandSparkles size={17} />
                  Find my outfit
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="/dashboard/wardrobe"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  My wardrobe
                </Link>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs text-white/80">
                <CloudSun size={16} />
                <span>Lagos</span>
                <span>·</span>
                <span>Warm and sunny</span>
              </div>
            </div>

            {/* Hero illustration */}
            <div className="relative mx-auto hidden h-64 w-full max-w-[260px] items-center justify-center md:flex">
              <div className="absolute inset-3 rotate-6 rounded-[40px] bg-white/15" />

              <div className="absolute inset-5 -rotate-6 rounded-[40px] border border-white/30 bg-white/10 backdrop-blur-sm" />

              <img
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=700&auto=format&fit=crop&q=85"
                alt="Fashion inspiration for today's look"
                className="relative h-56 w-44 rounded-[30px] border-4 border-white/70 object-cover shadow-2xl"
              />

              <div className="absolute right-0 top-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-300 text-orange-700 shadow-lg">
                <Sparkles size={23} />
              </div>

              <div className="absolute bottom-5 left-0 flex items-center gap-2 rounded-2xl bg-white px-3 py-2.5 text-xs font-bold text-purple-700 shadow-lg">
                <Heart size={16} className="fill-pink-500 text-pink-500" />
                Your style, your rules
              </div>
            </div>
          </div>
        </section>

        {/* QUICK ACTIONS */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-900">
              Your style, one click away
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              What would you like to do today?
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <QuickAction
              href="/dashboard/stylist"
              title="Generate outfit"
              description="Find your perfect look"
              icon={<Sparkles size={21} />}
              iconClass="bg-purple-100 text-purple-600"
            />

            <QuickAction
              href="/dashboard/wardrobe"
              title="Add to wardrobe"
              description="Upload a new item"
              icon={<Plus size={21} />}
              iconClass="bg-pink-100 text-pink-600"
            />

            <QuickAction
              href="/dashboard/calendar"
              title="Plan an event"
              description="Get ready in advance"
              icon={<CalendarDays size={21} />}
              iconClass="bg-blue-100 text-blue-600"
            />

            <QuickAction
              href="/dashboard/shopping"
              title="Shopping list"
              description="Complete your looks"
              icon={<ShoppingBag size={21} />}
              iconClass="bg-orange-100 text-orange-600"
            />
          </div>
        </section>

        {/* MAIN DASHBOARD GRID */}
        <div className="grid items-start gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          {/* TODAY'S OUTFIT */}
      <section className="min-w-0 overflow-hidden rounded-3xl border border-purple-100/70 bg-white p-3 shadow-sm sm:p-5 lg:p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-yellow-100 text-orange-500">
                    <Sun size={18} />
                  </span>

                  <h2 className="text-lg font-bold text-slate-900">
                    Today's suggestion
                  </h2>
                </div>

                <p className="mt-2 text-sm text-slate-500">
                  A look picked just for you.
                </p>
              </div>

              <Link
                href="/dashboard/stylist"
                className="flex items-center gap-1 text-xs font-semibold text-purple-600 transition hover:text-pink-600"
              >
                Explore
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-[0.9fr_1.1fr]">
              {/* Featured image */}
              <div className="relative min-h-[250px] overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-100 to-lime-50">
                <img
                  src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=700&auto=format&fit=crop&q=85"
                  alt="Suggested outfit inspiration"
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-purple-700 shadow-sm">
                  <Sparkles size={12} className="mr-1 inline" />
                  AI PICK
                </div>

                <button
                  type="button"
                  aria-label="Save outfit to favorites"
                  className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-pink-500 shadow-sm transition hover:scale-110"
                >
                  <Heart size={17} />
                </button>

                <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-white/90 p-3 backdrop-blur-md">
                  <p className="text-sm font-bold text-slate-900">
                    Effortless chic
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Smart casual · Comfortable
                  </p>
                </div>
              </div>

              {/* Outfit details */}
              <div className="flex flex-col justify-center">
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-purple-500">
                    Recommended for you
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-slate-900">
                    The everyday classic
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    A balanced combination for a confident, comfortable day.
                  </p>
                </div>

                <div className="space-y-3">
                  <OutfitItem
                    icon={<Shirt size={17} />}
                    name="Statement top"
                    detail="From your wardrobe"
                    color="bg-pink-100 text-pink-600"
                  />

                  <OutfitItem
                    icon={<Palette size={17} />}
                    name="Tailored trousers"
                    detail="Pairs beautifully"
                    color="bg-purple-100 text-purple-600"
                  />

                  <OutfitItem
                    icon={<Footprints size={17} />}
                    name="Classic footwear"
                    detail="Complete the look"
                    color="bg-orange-100 text-orange-600"
                  />
                </div>

                <Link
                  href="/dashboard/stylist"
                  className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-purple-100 transition hover:-translate-y-0.5"
                >
                  View complete look
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </section>

          {/* UPCOMING EVENTS */}
          <section className="rounded-3xl border border-purple-100/70 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-pink-100 text-pink-600">
                    <CalendarDays size={18} />
                  </span>

                  <h2 className="text-lg font-bold text-slate-900">
                    Upcoming events
                  </h2>
                </div>

                <p className="mt-2 text-sm text-slate-500">
                  Look good for every occasion.
                </p>
              </div>

              <Link
                href="/dashboard/calendar"
                aria-label="View all events"
                className="rounded-xl p-2 text-slate-400 transition hover:bg-purple-50 hover:text-purple-600"
              >
                <ArrowRight size={19} />
              </Link>
            </div>

            <div className="space-y-3">
              {upcomingEvents.map((event) => {
                const Icon = event.icon;

                return (
                  <div
                    key={event.title}
                    className="flex items-center gap-3 rounded-2xl border border-slate-100 p-3 transition hover:border-purple-100 hover:bg-purple-50/40"
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${event.color}`}
                    >
                      <Icon size={20} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-bold text-slate-800">
                        {event.title}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        {event.date} · {event.daysLeft}
                      </p>

                      <div className="mt-2 flex items-center gap-1.5">
                        {event.planned ? (
                          <>
                            <Check
                              size={12}
                              className="text-emerald-500"
                            />
                            <span className="text-[10px] font-semibold text-emerald-600">
                              Outfit planned
                            </span>
                          </>
                        ) : (
                          <>
                            <Clock size={12} className="text-orange-500" />
                            <span className="text-[10px] font-semibold text-orange-600">
                              Outfit needed
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <Link
                      href="/dashboard/calendar"
                      aria-label={`Plan outfit for ${event.title}`}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-white hover:text-purple-600"
                    >
                      <ChevronRight size={17} />
                    </Link>
                  </div>
                );
              })}
            </div>

            <Link
              href="/dashboard/calendar"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-purple-200 py-3 text-sm font-semibold text-purple-600 transition hover:border-purple-400 hover:bg-purple-50"
            >
              <Plus size={16} />
              Add an event
            </Link>
          </section>
        </div>

        {/* WARDROBE OVERVIEW + WARDROBE GAPS */}
        <div className="grid items-start gap-6 lg:grid-cols-2">
          {/* WARDROBE OVERVIEW */}
          <section className="rounded-3xl border border-purple-100/70 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Wardrobe overview
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Everything you own, beautifully organized.
                </p>
              </div>

              <Link
                href="/dashboard/wardrobe"
                aria-label="View wardrobe"
                className="rounded-xl p-2 text-slate-400 transition hover:bg-purple-50 hover:text-purple-600"
              >
                <ArrowRight size={19} />
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {wardrobeStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-100 p-3 transition hover:-translate-y-0.5 hover:border-purple-100 hover:shadow-sm"
                >
                  <div
                    className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${item.color}`}
                  >
                    <Shirt size={18} />
                  </div>

                  <p className="text-xl font-extrabold text-slate-900">
                    {item.count}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    Your wardrobe is growing!
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Sample wardrobe statistics
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-purple-600 shadow-sm">
                  <TrendingUp size={21} />
                </div>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white">
                <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-pink-500 to-purple-600" />
              </div>

              <div className="mt-2 flex justify-between text-xs">
                <span className="text-slate-500">
                  Wardrobe organization
                </span>
                <span className="font-bold text-purple-700">72%</span>
              </div>
            </div>
          </section>

          {/* WARDROBE GAPS */}
          <section className="relative overflow-hidden rounded-3xl border border-pink-100 bg-gradient-to-br from-pink-50 via-white to-orange-50 p-5 shadow-sm sm:p-6">
            <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-pink-200/40 blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-pink-600 shadow-sm">
                      <Sparkles size={19} />
                    </span>

                    <h2 className="text-lg font-bold text-slate-900">
                      Wardrobe gaps
                    </h2>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    A few thoughtful additions could unlock even more looks.
                  </p>
                </div>

                <span className="rounded-full bg-pink-100 px-3 py-1.5 text-[10px] font-bold text-pink-700">
                  STYLE TIPS
                </span>
              </div>

              <div className="mt-5 space-y-3">
                <GapItem
                  title="Nude heels"
                  description="Could complement several outfits."
                  icon={<Footprints size={20} />}
                  color="bg-orange-100 text-orange-600"
                />

                <GapItem
                  title="Classic black blazer"
                  description="A versatile addition to your workwear."
                  icon={<Shirt size={20} />}
                  color="bg-purple-100 text-purple-600"
                />

                <GapItem
                  title="Silver accessories"
                  description="A finishing touch for evening looks."
                  icon={<Sparkles size={20} />}
                  color="bg-blue-100 text-blue-600"
                />
              </div>

              <Link
                href="/shopping"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-pink-100 transition hover:-translate-y-0.5"
              >
                Explore shopping suggestions
                <ArrowRight size={16} />
              </Link>
            </div>
          </section>
        </div>

        {/* RECENT OUTFITS */}
        <section className="rounded-3xl border border-purple-100/70 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Recently saved outfits
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your favorite looks, all in one place.
              </p>
            </div>

            <Link
              href="/dashboard/history"
              className="flex shrink-0 items-center gap-1 text-xs font-semibold text-purple-600 transition hover:text-pink-600 sm:text-sm"
            >
              View all
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {recentOutfits.map((outfit) => (
              <Link
                href="/dashboard/history"
                key={outfit.id}
                className="group overflow-hidden rounded-2xl border border-slate-100 transition duration-300 hover:-translate-y-1 hover:border-purple-100 hover:shadow-lg hover:shadow-purple-50"
              >
                <div
                  className={`relative aspect-[4/5] overflow-hidden ${outfit.color}`}
                >
                  <img
                    src={outfit.image}
                    alt={outfit.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <button
                    type="button"
                    aria-label={`Favorite ${outfit.name}`}
                    onClick={(event) => event.preventDefault()}
                    className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-pink-500 shadow-sm transition hover:bg-white"
                  >
                    <Heart size={15} />
                  </button>
                </div>

                <div className="p-3">
                  <h3 className="truncate text-sm font-bold text-slate-800">
                    {outfit.name}
                  </h3>

                  <p className="mt-1 truncate text-xs text-slate-500">
                    {outfit.description}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[10px] font-medium text-purple-600">
                      View outfit
                    </span>

                    <ArrowUpRight
                      size={15}
                      className="text-slate-400 transition group-hover:text-purple-600"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FAMILY PLAN BANNER */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 p-6 text-white sm:p-8">
          <div className="absolute -right-10 -top-16 h-56 w-56 rounded-full bg-white/10" />

          <div className="relative flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                <UsersRound size={25} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
                  More style, more memories
                </p>

                <h2 className="mt-2 text-xl font-extrabold sm:text-2xl">
                  Style is better together!
                </h2>

                <p className="mt-2 max-w-lg text-sm leading-6 text-white/85">
                  Create family wardrobes, coordinate wedding outfits, and
                  plan everyone's looks from one place.
                </p>
              </div>
            </div>

            <Link
              href="/family"
              className="flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-purple-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-pink-50"
            >
              Explore Family Plan
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="flex flex-col items-center justify-between gap-3 pb-2 text-xs text-slate-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()} OutfitLibrary. Dress like yourself.
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/settings"
              className="transition hover:text-purple-600"
            >
              Settings
            </Link>

            <Link
              href="/help"
              className="transition hover:text-purple-600"
            >
              Help
            </Link>

            <span className="flex items-center gap-1 text-pink-500">
              Made with <Heart size={12} fill="currentColor" />
            </span>
          </div>
        </footer>
      </div>
    </main>
  );
}

// REUSABLE COMPONENTS

function QuickAction({
  href,
  title,
  description,
  icon,
  iconClass,
}: {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconClass: string;
}) {
  return (
    <Link
      href={href}
      className="group flex min-w-0 items-center gap-3 rounded-2xl border border-purple-100/70 bg-white p-3 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-purple-200 hover:shadow-md sm:p-4"
    >
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition group-hover:scale-105 ${iconClass}`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-xs font-bold text-slate-800 sm:text-sm">
          {title}
        </h3>

        <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-slate-500 sm:text-xs">
          {description}
        </p>
      </div>

      <ChevronRight
        size={15}
        className="hidden shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-purple-600 sm:block"
      />
    </Link>
  );
}

function OutfitItem({
  icon,
  name,
  detail,
  color,
}: {
  icon: React.ReactNode;
  name: string;
  detail: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${color}`}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="truncate text-xs font-bold text-slate-800">{name}</p>

        <p className="mt-1 truncate text-[10px] text-slate-500">{detail}</p>
      </div>

      <Check
        size={15}
        className="ml-auto shrink-0 text-emerald-500"
      />
    </div>
  );
}

function GapItem({
  title,
  description,
  icon,
  color,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white bg-white/80 p-3 transition hover:border-pink-100 hover:shadow-sm">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${color}`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-bold text-slate-800">{title}</h3>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>

      <ArrowDownRight size={17} className="shrink-0 text-pink-400" />
    </div>
  );
}