"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  Users,
  Shirt,
  CalendarDays,
  Heart,
  Sparkles,
  ChevronRight,
  ChevronDown,
  MoreHorizontal,
  Pencil,
  Trash2,
  X,
  Check,
  Search,
  ShoppingBag,
  WandSparkles,
  UserRound,
  Crown,
  Baby,
  BriefcaseBusiness,
  Palette,
  CalendarCheck,
  ShirtIcon,
} from "lucide-react";

type FamilyMember = {
  id: number;
  name: string;
  relationship: string;
  age: string;
  wardrobeCount: number;
  plannedOutfits: number;
  color: string;
  initials: string;
  avatar?: string;
};

type FamilyEvent = {
  id: number;
  title: string;
  date: string;
  occasion: string;
  location: string;
  members: number[];
  color: string;
};

const initialMembers: FamilyMember[] = [
  {
    id: 1,
    name: "Victoria",
    relationship: "You",
    age: "26 years",
    wardrobeCount: 42,
    plannedOutfits: 8,
    color: "from-purple-400 to-pink-400",
    initials: "V",
  },
  {
    id: 2,
    name: "Daniel",
    relationship: "Spouse",
    age: "29 years",
    wardrobeCount: 35,
    plannedOutfits: 5,
    color: "from-blue-400 to-indigo-500",
    initials: "D",
  },
  {
    id: 3,
    name: "Amara",
    relationship: "Daughter",
    age: "5 years",
    wardrobeCount: 24,
    plannedOutfits: 4,
    color: "from-orange-300 to-pink-400",
    initials: "A",
  },
  {
    id: 4,
    name: "David",
    relationship: "Son",
    age: "2 years",
    wardrobeCount: 18,
    plannedOutfits: 3,
    color: "from-emerald-300 to-teal-500",
    initials: "D",
  },
];

const initialEvents: FamilyEvent[] = [
  {
    id: 1,
    title: "Ada's Wedding",
    date: "2026-11-07",
    occasion: "Wedding",
    location: "Lagos",
    members: [1, 2, 3, 4],
    color: "pink",
  },
  {
    id: 2,
    title: "Sunday Service",
    date: "2026-11-01",
    occasion: "Church",
    location: "Church",
    members: [1, 2, 3, 4],
    color: "purple",
  },
  {
    id: 3,
    title: "Grandma's Birthday",
    date: "2026-11-21",
    occasion: "Birthday",
    location: "Family home",
    members: [1, 2, 3, 4],
    color: "orange",
  },
];

const relationshipOptions = [
  "Spouse",
  "Partner",
  "Son",
  "Daughter",
  "Mother",
  "Father",
  "Brother",
  "Sister",
  "Other family member",
];

const gradientOptions = [
  "from-purple-400 to-pink-400",
  "from-blue-400 to-indigo-500",
  "from-orange-300 to-pink-400",
  "from-emerald-300 to-teal-500",
  "from-rose-400 to-red-400",
  "from-amber-300 to-orange-500",
];

const eventColorClasses: Record<string, string> = {
  pink: "bg-pink-100 text-pink-700",
  purple: "bg-purple-100 text-purple-700",
  orange: "bg-orange-100 text-orange-700",
  blue: "bg-blue-100 text-blue-700",
};

function formatDate(dateString: string) {
  return new Date(`${dateString}T12:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function FamilyPage() {
  const [members, setMembers] =
    useState<FamilyMember[]>(initialMembers);

  const [events, setEvents] =
    useState<FamilyEvent[]>(initialEvents);

  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedMember, setSelectedMember] =
    useState<FamilyMember | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Members");
  const [showAllMembers, setShowAllMembers] = useState(false);

  const [memberForm, setMemberForm] = useState({
    name: "",
    relationship: "Spouse",
    age: "",
  });

  const [eventForm, setEventForm] = useState({
    title: "",
    date: "",
    occasion: "Wedding",
    location: "",
    members: [] as number[],
  });

  const [feedback, setFeedback] = useState("");

  const totalWardrobeItems = members.reduce(
    (total, member) => total + member.wardrobeCount,
    0
  );

  const totalPlannedOutfits = members.reduce(
    (total, member) => total + member.plannedOutfits,
    0
  );

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visibleMembers = showAllMembers
    ? filteredMembers
    : filteredMembers.slice(0, 4);

  const upcomingEvents = [...events]
    .filter((event) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return new Date(`${event.date}T12:00:00`) >= today;
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  function addMember() {
    if (!memberForm.name.trim()) return;

    const newMember: FamilyMember = {
      id: Date.now(),
      name: memberForm.name.trim(),
      relationship: memberForm.relationship,
      age: memberForm.age.trim() || "Not specified",
      wardrobeCount: 0,
      plannedOutfits: 0,
      color: gradientOptions[members.length % gradientOptions.length],
      initials: memberForm.name.trim().charAt(0).toUpperCase(),
    };

    setMembers((previous) => [...previous, newMember]);
    setMemberForm({
      name: "",
      relationship: "Spouse",
      age: "",
    });

    setShowMemberModal(false);
    setFeedback(`${newMember.name} has been added to your family.`);
  }

  function removeMember(id: number) {
    const member = members.find((item) => item.id === id);

    setMembers((previous) =>
      previous.filter((item) => item.id !== id)
    );

    setEvents((previous) =>
      previous.map((event) => ({
        ...event,
        members: event.members.filter((memberId) => memberId !== id),
      }))
    );

    setSelectedMember(null);

    if (member) {
      setFeedback(`${member.name} has been removed from this demo.`);
    }
  }

  function addEvent() {
    if (!eventForm.title.trim() || !eventForm.date) return;

    const newEvent: FamilyEvent = {
      id: Date.now(),
      title: eventForm.title.trim(),
      date: eventForm.date,
      occasion: eventForm.occasion,
      location: eventForm.location.trim(),
      members: eventForm.members,
      color:
        eventForm.occasion === "Wedding"
          ? "pink"
          : eventForm.occasion === "Birthday"
            ? "orange"
            : eventForm.occasion === "Church"
              ? "purple"
              : "blue",
    };

    setEvents((previous) => [...previous, newEvent]);

    setEventForm({
      title: "",
      date: "",
      occasion: "Wedding",
      location: "",
      members: [],
    });

    setShowEventModal(false);
    setFeedback("Your family event has been added.");
  }

  function toggleEventMember(memberId: number) {
    setEventForm((previous) => ({
      ...previous,
      members: previous.members.includes(memberId)
        ? previous.members.filter((id) => id !== memberId)
        : [...previous.members, memberId],
    }));
  }

  return (
    <main className="min-h-screen bg-[#FAF9FF] text-slate-800">
      {/* HEADER */}
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
              My Family
            </h1>

            <p className="hidden text-xs text-slate-500 sm:block">
              Everyone's style, together.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/calendar"
            className="hidden items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-purple-50 sm:flex"
          >
            <CalendarDays size={17} />
            Calendar
          </Link>

          <button
            type="button"
            onClick={() => setShowMemberModal(true)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-3 py-2.5 text-xs font-bold text-white shadow-md shadow-purple-100 transition hover:-translate-y-0.5 sm:px-4 sm:text-sm"
          >
            <Plus size={17} />
            <span className="hidden sm:inline">Add family member</span>
            <span className="sm:hidden">Add member</span>
          </button>
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
                <Heart size={14} />
                FAMILY STYLE, ALL IN ONE PLACE
              </div>

              <h2 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Your family's style,
                <br />
                <span className="text-yellow-300">beautifully together.</span>{" "}
                ✨
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-white/85 sm:text-base">
                Create individual wardrobes for your loved ones, coordinate
                outfits for special occasions, and make getting everyone
                dressed a little easier.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setShowMemberModal(true)}
                  className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-xs font-bold text-purple-700 transition hover:bg-purple-50"
                >
                  <Plus size={16} />
                  Add a family member
                </button>

                <button
                  type="button"
                  onClick={() => setShowEventModal(true)}
                  className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-xs font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  <CalendarDays size={16} />
                  Plan a family event
                </button>
              </div>
            </div>

            {/* FAMILY ILLUSTRATION */}
            <div className="relative mx-auto hidden h-[250px] w-[260px] md:block">
              <div className="absolute inset-3 rotate-6 rounded-[35px] bg-white/15" />

              <div className="absolute inset-5 rounded-[30px] border-4 border-white/40 bg-white p-4 text-slate-800 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-purple-500">
                      YOUR FAMILY
                    </p>

                    <p className="mt-1 text-sm font-extrabold">
                      Style collection
                    </p>
                  </div>

                  <Heart size={21} className="text-pink-500" />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  {members.slice(0, 4).map((member) => (
                    <div
                      key={member.id}
                      className="rounded-2xl bg-purple-50 p-3 text-center"
                    >
                      <div
                        className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${member.color} text-lg font-extrabold text-white shadow-sm`}
                      >
                        {member.initials}
                      </div>

                      <p className="mt-2 truncate text-[10px] font-extrabold">
                        {member.name}
                      </p>

                      <p className="mt-1 text-[8px] text-slate-500">
                        {member.relationship}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-pink-50 p-2">
                  <Sparkles size={14} className="text-pink-500" />

                  <p className="text-[9px] font-bold text-pink-700">
                    Together in style
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SUCCESS MESSAGE */}
        {feedback && (
          <div
            role="status"
            className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
          >
            <span className="flex items-center gap-2">
              <Check size={17} />
              {feedback}
            </span>

            <button
              type="button"
              onClick={() => setFeedback("")}
              aria-label="Dismiss notification"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* STATS */}
        <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard
            label="Family members"
            value={members.length}
            description="Your family profiles"
            icon={<Users size={19} />}
            iconClass="bg-purple-100 text-purple-600"
            borderClass="border-purple-100"
          />

          <StatCard
            label="Wardrobe items"
            value={totalWardrobeItems}
            description="Across all profiles"
            icon={<Shirt size={19} />}
            iconClass="bg-pink-100 text-pink-600"
            borderClass="border-pink-100"
          />

          <StatCard
            label="Planned outfits"
            value={totalPlannedOutfits}
            description="For your family"
            icon={<Sparkles size={19} />}
            iconClass="bg-orange-100 text-orange-600"
            borderClass="border-orange-100"
          />

          <StatCard
            label="Upcoming events"
            value={upcomingEvents.length}
            description="Family occasions"
            icon={<CalendarCheck size={19} />}
            iconClass="bg-emerald-100 text-emerald-600"
            borderClass="border-emerald-100"
          />
        </section>

        {/* FAMILY MEMBERS */}
        <section className="rounded-3xl border border-purple-100 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <Users size={20} className="text-purple-600" />

                <h2 className="text-xl font-extrabold text-slate-900">
                  Your family members
                </h2>
              </div>

              <p className="mt-2 text-sm text-slate-500">
                Each member gets their own wardrobe and style profile.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowMemberModal(true)}
              className="flex items-center justify-center gap-2 rounded-xl bg-purple-50 px-4 py-3 text-xs font-bold text-purple-700 transition hover:bg-purple-100"
            >
              <Plus size={16} />
              Add member
            </button>
          </div>

          {/* SEARCH */}
          <div className="relative mt-6 max-w-md">
            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search family members..."
              className="w-full rounded-xl border border-slate-200 bg-[#FCFBFF] py-3 pl-11 pr-4 text-sm outline-none transition focus:border-purple-400 focus:ring-4 focus:ring-purple-50"
            />
          </div>

          {/* MEMBER CARDS */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {visibleMembers.map((member) => (
              <article
                key={member.id}
                className="group overflow-hidden rounded-2xl border border-slate-100 transition hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-50"
              >
                <div
                  className={`relative h-24 bg-gradient-to-br ${member.color}`}
                >
                  <div className="absolute -right-4 -top-8 h-28 w-28 rounded-full bg-white/15" />

                  <div className="absolute -bottom-5 left-5 flex h-[76px] w-[76px] items-center justify-center rounded-2xl border-4 border-white bg-white shadow-md">
                    <div
                      className={`flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br ${member.color} text-3xl font-extrabold text-white`}
                    >
                      {member.initials}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedMember(member)}
                    aria-label={`More options for ${member.name}`}
                    className="absolute right-3 top-3 rounded-xl bg-white/20 p-2 text-white transition hover:bg-white/40"
                  >
                    <MoreHorizontal size={18} />
                  </button>

                  {member.relationship === "You" && (
                    <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-bold text-purple-700">
                      Primary profile
                    </span>
                  )}
                </div>

                <div className="p-5 pt-8">
                  <h3 className="text-base font-extrabold text-slate-900">
                    {member.name}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {member.relationship} · {member.age}
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <div className="rounded-xl bg-purple-50 p-3">
                      <Shirt size={16} className="text-purple-600" />

                      <p className="mt-2 text-lg font-extrabold text-slate-900">
                        {member.wardrobeCount}
                      </p>

                      <p className="mt-1 text-[9px] font-semibold text-slate-500">
                        Wardrobe items
                      </p>
                    </div>

                    <div className="rounded-xl bg-pink-50 p-3">
                      <Sparkles size={16} className="text-pink-600" />

                      <p className="mt-2 text-lg font-extrabold text-slate-900">
                        {member.plannedOutfits}
                      </p>

                      <p className="mt-1 text-[9px] font-semibold text-slate-500">
                        Planned looks
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedMember(member)}
                      className="flex items-center justify-center gap-1 rounded-xl border border-purple-100 px-2 py-2.5 text-[10px] font-bold text-purple-700 transition hover:bg-purple-50"
                    >
                      View profile
                      <ChevronRight size={13} />
                    </button>

                    <Link
                      href="/dashboard/stylist"
                      className="flex items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-2 py-2.5 text-[10px] font-bold text-white transition hover:opacity-90"
                    >
                      <WandSparkles size={13} />
                      Style them
                    </Link>
                  </div>
                </div>
              </article>
            ))}

            {/* ADD MEMBER CARD */}
            <button
              type="button"
              onClick={() => setShowMemberModal(true)}
              className="flex min-h-[310px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-purple-200 bg-gradient-to-br from-purple-50/70 to-pink-50/70 p-6 text-center transition hover:border-purple-400 hover:bg-purple-50"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-purple-600 shadow-md shadow-purple-100 transition group-hover:scale-105">
                <Plus size={28} />
              </div>

              <h3 className="mt-5 text-base font-extrabold text-slate-800">
                Add someone special
              </h3>

              <p className="mt-2 max-w-[190px] text-xs leading-5 text-slate-500">
                Create a wardrobe and style profile for another family member.
              </p>

              <span className="mt-5 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-bold text-white">
                <Plus size={15} />
                Add profile
              </span>
            </button>
          </div>

          {filteredMembers.length > 4 && (
            <button
              type="button"
              onClick={() => setShowAllMembers((previous) => !previous)}
              className="mx-auto mt-6 flex items-center gap-2 rounded-xl px-4 py-3 text-xs font-bold text-purple-700 transition hover:bg-purple-50"
            >
              {showAllMembers ? "Show fewer members" : "View all members"}
              <ChevronDown
                size={15}
                className={showAllMembers ? "rotate-180" : ""}
              />
            </button>
          )}

          {filteredMembers.length === 0 && (
            <p className="py-8 text-center text-sm text-slate-500">
              No family members match your search.
            </p>
          )}
        </section>

        {/* FAMILY OUTFIT COORDINATION */}
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 p-6 text-white shadow-lg shadow-pink-100 sm:p-8">
            <div className="absolute -right-10 -top-10 -z-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" />

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <Palette size={24} />
            </div>

            <h2 className="mt-5 max-w-lg text-2xl font-extrabold leading-tight sm:text-3xl">
              One occasion.
              <br />
              A whole family of styles.
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-white/85">
              Coordinate colours, styles, and accessories for everyone
              attending the same event without making every outfit identical.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {members.slice(0, 4).map((member) => (
                <div
                  key={member.id}
                  title={member.name}
                  className={`flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/70 bg-gradient-to-br ${member.color} text-sm font-extrabold text-white shadow-md`}
                >
                  {member.initials}
                </div>
              ))}

              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-white/70 bg-white/10">
                <Plus size={20} />
              </div>
            </div>

            <Link
              href="/dashboard/stylist"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-extrabold text-purple-700 transition hover:-translate-y-0.5 hover:bg-purple-50"
            >
              <WandSparkles size={16} />
              Explore outfit planner
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* FAMILY STYLE IDEAS */}
          <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-2">
              <Sparkles size={20} className="text-purple-600" />

              <h2 className="text-xl font-extrabold text-slate-900">
                Family style ideas
              </h2>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Explore ways to coordinate your family's looks.
            </p>

            <div className="mt-6 space-y-4">
              <StyleIdea
                icon={<Heart size={19} />}
                title="Wedding coordination"
                description="Coordinate aso ebi colours, accessories, and individual styles."
                bg="bg-pink-100 text-pink-600"
              />

              <StyleIdea
                icon={<Church size={19} />}
                title="Sunday best"
                description="Plan complementary outfits for the whole family."
                bg="bg-purple-100 text-purple-600"
              />

              <StyleIdea
                icon={<Sun size={19} />}
                title="Family outings"
                description="Build comfortable looks for outings, holidays, and weekends."
                bg="bg-orange-100 text-orange-600"
              />

              <StyleIdea
                icon={<CalendarDays size={19} />}
                title="Special celebrations"
                description="Prepare coordinated looks for birthdays and anniversaries."
                bg="bg-blue-100 text-blue-600"
              />
            </div>
          </div>
        </section>

        {/* FAMILY EVENTS */}
        <section className="rounded-3xl border border-purple-100 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <CalendarDays size={20} className="text-purple-600" />

                <h2 className="text-xl font-extrabold text-slate-900">
                  Family events
                </h2>
              </div>

              <p className="mt-2 text-sm text-slate-500">
                Keep track of occasions and prepare outfits together.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowEventModal(true)}
              className="flex items-center justify-center gap-2 rounded-xl bg-purple-50 px-4 py-3 text-xs font-bold text-purple-700 transition hover:bg-purple-100"
            >
              <Plus size={16} />
              Add family event
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => {
                const eventMembers = members.filter((member) =>
                  event.members.includes(member.id)
                );

                return (
                  <article
                    key={event.id}
                    className="rounded-2xl border border-slate-100 p-5 transition hover:border-purple-200 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className={`rounded-full px-3 py-1.5 text-[10px] font-bold ${eventColorClasses[event.color] || eventColorClasses.purple}`}
                      >
                        {event.occasion}
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          setEvents((previous) =>
                            previous.filter((item) => item.id !== event.id)
                          );
                          setFeedback("Family event removed.");
                        }}
                        aria-label={`Delete ${event.title}`}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <h3 className="mt-4 text-base font-extrabold text-slate-900">
                      {event.title}
                    </h3>

                    <p className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                      <CalendarDays size={14} />
                      {formatDate(event.date)}
                    </p>

                    <p className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                      <Users size={14} />
                      {eventMembers.length} family{" "}
                      {eventMembers.length === 1 ? "member" : "members"}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                      <div className="flex -space-x-2">
                        {eventMembers.slice(0, 4).map((member) => (
                          <div
                            key={member.id}
                            title={member.name}
                            className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br ${member.color} text-[10px] font-bold text-white`}
                          >
                            {member.initials}
                          </div>
                        ))}

                        {eventMembers.length === 0 && (
                          <span className="text-[10px] text-slate-400">
                            No members selected
                          </span>
                        )}
                      </div>

                      <Link
                        href="/dashboard/calendar"
                        className="flex items-center gap-1 text-[10px] font-bold text-purple-700 transition hover:text-pink-600"
                      >
                        Open calendar
                        <ChevronRight size={14} />
                      </Link>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="col-span-full rounded-2xl border border-dashed border-purple-200 p-8 text-center">
                <CalendarDays
                  size={28}
                  className="mx-auto text-purple-500"
                />

                <p className="mt-3 font-bold text-slate-800">
                  No upcoming family events
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  Add an event to start coordinating outfits.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* SHOPPING REMINDER */}
        <section className="flex flex-col gap-5 rounded-3xl border border-orange-100 bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-orange-500 shadow-sm">
              <ShoppingBag size={22} />
            </div>

            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                Get everyone ready before the big day.
              </h2>

              <p className="mt-2 max-w-xl text-xs leading-6 text-slate-600">
                Check what each family member already owns, identify missing
                items, and prepare a shopping list before your next occasion.
              </p>
            </div>
          </div>

          <Link
            href="/shopping-list"
            className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-400 to-pink-500 px-5 py-3 text-xs font-bold text-white shadow-md shadow-pink-100 transition hover:-translate-y-0.5"
          >
            <ShoppingBag size={16} />
            View shopping list
            <ArrowRight size={15} />
          </Link>
        </section>

        {/* FOOTER */}
        <footer className="flex flex-col items-center justify-between gap-3 border-t border-purple-100 py-5 text-xs text-slate-400 sm:flex-row">
          <p>OutfitLibrary · Your style, your story.</p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/dashboard/wardrobe"
              className="transition hover:text-purple-600"
            >
              My Wardrobe
            </Link>

            <Link
              href="/dashboard/stylist"
              className="transition hover:text-purple-600"
            >
              Outfit Planner
            </Link>

            <Link
              href="/dashboard/calendar"
              className="transition hover:text-purple-600"
            >
              Calendar
            </Link>
          </div>
        </footer>
      </div>

      {/* ADD FAMILY MEMBER MODAL */}
      {showMemberModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onClick={() => setShowMemberModal(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="member-modal-title"
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-violet-700 via-purple-600 to-pink-500 p-6 text-white">
              <button
                type="button"
                onClick={() => setShowMemberModal(false)}
                aria-label="Close add member form"
                className="absolute right-5 top-5 rounded-xl bg-white/15 p-2 transition hover:bg-white/25"
              >
                <X size={19} />
              </button>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
                <Users size={23} />
              </div>

              <h2
                id="member-modal-title"
                className="mt-4 text-2xl font-extrabold"
              >
                Add your loved one
              </h2>

              <p className="mt-2 max-w-sm text-sm leading-6 text-white/80">
                Give them their own profile so you can organise their wardrobe
                and plan outfits for them.
              </p>
            </div>

            <div className="space-y-5 p-6">
              <div>
                <label
                  htmlFor="memberName"
                  className="text-xs font-bold text-slate-700"
                >
                  Full name *
                </label>

                <input
                  id="memberName"
                  value={memberForm.name}
                  onChange={(e) =>
                    setMemberForm({
                      ...memberForm,
                      name: e.target.value,
                    })
                  }
                  placeholder="Enter their name"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-purple-400 focus:ring-4 focus:ring-purple-50"
                />
              </div>

              <div>
                <label
                  htmlFor="relationship"
                  className="text-xs font-bold text-slate-700"
                >
                  Relationship to you
                </label>

                <select
                  id="relationship"
                  value={memberForm.relationship}
                  onChange={(e) =>
                    setMemberForm({
                      ...memberForm,
                      relationship: e.target.value,
                    })
                  }
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-purple-400"
                >
                  {relationshipOptions.map((relationship) => (
                    <option key={relationship}>{relationship}</option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="memberAge"
                  className="text-xs font-bold text-slate-700"
                >
                  Age (optional)
                </label>

                <input
                  id="memberAge"
                  value={memberForm.age}
                  onChange={(e) =>
                    setMemberForm({
                      ...memberForm,
                      age: e.target.value,
                    })
                  }
                  placeholder="e.g. 5 years"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-purple-400"
                />
              </div>

              <div className="rounded-2xl bg-purple-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-purple-600">
                    <Shirt size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      Their own wardrobe
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      After creating the profile, you can start adding clothing
                      items and tracking outfits for this person.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={() => setShowMemberModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={addMember}
                  disabled={!memberForm.name.trim()}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-purple-100 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Plus size={17} />
                  Create profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD FAMILY EVENT MODAL */}
      {showEventModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onClick={() => setShowEventModal(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="family-event-title"
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-100 p-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-purple-600">
                  Family calendar
                </p>

                <h2
                  id="family-event-title"
                  className="mt-2 text-xl font-extrabold text-slate-900"
                >
                  Plan a family event
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Choose an occasion and the people attending.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowEventModal(false)}
                aria-label="Close event form"
                className="rounded-xl bg-slate-100 p-2 text-slate-500 transition hover:bg-purple-50"
              >
                <X size={19} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div>
                <label
                  htmlFor="familyEventName"
                  className="text-xs font-bold text-slate-700"
                >
                  Event name *
                </label>

                <input
                  id="familyEventName"
                  value={eventForm.title}
                  onChange={(e) =>
                    setEventForm({
                      ...eventForm,
                      title: e.target.value,
                    })
                  }
                  placeholder="e.g. Family wedding"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-purple-400"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="familyEventDate"
                    className="text-xs font-bold text-slate-700"
                  >
                    Date *
                  </label>

                  <input
                    id="familyEventDate"
                    type="date"
                    value={eventForm.date}
                    onChange={(e) =>
                      setEventForm({
                        ...eventForm,
                        date: e.target.value,
                      })
                    }
                    className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="familyEventType"
                    className="text-xs font-bold text-slate-700"
                  >
                    Occasion
                  </label>

                  <select
                    id="familyEventType"
                    value={eventForm.occasion}
                    onChange={(e) =>
                      setEventForm({
                        ...eventForm,
                        occasion: e.target.value,
                      })
                    }
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-purple-400"
                  >
                    {[
                      "Wedding",
                      "Birthday",
                      "Church",
                      "Family outing",
                      "Holiday",
                      "Anniversary",
                      "Other",
                    ].map((occasion) => (
                      <option key={occasion}>{occasion}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="familyEventLocation"
                  className="text-xs font-bold text-slate-700"
                >
                  Location
                </label>

                <input
                  id="familyEventLocation"
                  value={eventForm.location}
                  onChange={(e) =>
                    setEventForm({
                      ...eventForm,
                      location: e.target.value,
                    })
                  }
                  placeholder="Where will it take place?"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <p className="text-xs font-bold text-slate-700">
                  Who is attending?
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Select the family members you want to plan outfits for.
                </p>

                <div className="mt-3 space-y-2">
                  {members.map((member) => {
                    const selected = eventForm.members.includes(member.id);

                    return (
                      <button
                        type="button"
                        key={member.id}
                        onClick={() => toggleEventMember(member.id)}
                        className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                          selected
                            ? "border-purple-300 bg-purple-50"
                            : "border-slate-100 hover:border-purple-200"
                        }`}
                      >
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${member.color} font-bold text-white`}
                        >
                          {member.initials}
                        </div>

                        <div className="flex-1">
                          <p className="text-sm font-bold text-slate-800">
                            {member.name}
                          </p>

                          <p className="mt-1 text-[10px] text-slate-500">
                            {member.relationship}
                          </p>
                        </div>

                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                            selected
                              ? "border-purple-600 bg-purple-600 text-white"
                              : "border-slate-300"
                          }`}
                        >
                          {selected && <Check size={13} />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={addEvent}
                  disabled={!eventForm.title.trim() || !eventForm.date}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-purple-100 transition disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <CalendarCheck size={16} />
                  Create event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MEMBER PROFILE MODAL */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedMember(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="member-profile-title"
            className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`relative h-32 bg-gradient-to-br ${selectedMember.color}`}
            >
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                aria-label="Close profile"
                className="absolute right-4 top-4 rounded-xl bg-white/20 p-2 text-white hover:bg-white/30"
              >
                <X size={19} />
              </button>

              <div className="absolute -bottom-10 left-6 flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-white shadow-md">
                <div
                  className={`flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br ${selectedMember.color} text-3xl font-extrabold text-white`}
                >
                  {selectedMember.initials}
                </div>
              </div>
            </div>

            <div className="p-6 pt-14">
              <h2
                id="member-profile-title"
                className="text-2xl font-extrabold text-slate-900"
              >
                {selectedMember.name}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {selectedMember.relationship} · {selectedMember.age}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-purple-50 p-4">
                  <Shirt size={19} className="text-purple-600" />

                  <p className="mt-3 text-xl font-extrabold text-slate-900">
                    {selectedMember.wardrobeCount}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Wardrobe items
                  </p>
                </div>

                <div className="rounded-2xl bg-pink-50 p-4">
                  <Sparkles size={19} className="text-pink-600" />

                  <p className="mt-3 text-xl font-extrabold text-slate-900">
                    {selectedMember.plannedOutfits}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Planned outfits
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <Link
                  href="/dashboard/wardrobe"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-100 px-4 py-3 text-sm font-bold text-purple-700 transition hover:bg-purple-50"
                >
                  <Shirt size={17} />
                  Open wardrobe
                </Link>

                <Link
                  href="/dashboard/stylist"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-3 text-sm font-bold text-white transition hover:opacity-90"
                >
                  <WandSparkles size={17} />
                  Plan an outfit
                </Link>

                {selectedMember.relationship !== "You" && (
                  <button
                    type="button"
                    onClick={() => removeMember(selectedMember.id)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                  >
                    <Trash2 size={15} />
                    Remove family member
                  </button>
                )}
              </div>

              <p className="mt-4 text-center text-[10px] leading-5 text-slate-400">
                This profile view is a UI demonstration. Individual wardrobe
                filtering and profile-specific outfit planning need to be
                connected to your application data.
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* STAT CARD */

function StatCard({
  label,
  value,
  description,
  icon,
  iconClass,
  borderClass,
}: {
  label: string;
  value: number;
  description: string;
  icon: React.ReactNode;
  iconClass: string;
  borderClass: string;
}) {
  return (
    <div
      className={`rounded-2xl border ${borderClass} bg-white p-4 shadow-sm sm:p-5`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-slate-500">{label}</span>

        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </span>
      </div>

      <p className="mt-4 text-2xl font-extrabold text-slate-900">{value}</p>

      <p className="mt-1 text-[10px] text-slate-400">{description}</p>
    </div>
  );
}

/* STYLE IDEA */

function StyleIdea({
  icon,
  title,
  description,
  bg,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  bg: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg}`}
      >
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-extrabold text-slate-800">{title}</h3>

        <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
      </div>
    </div>
  );
}

/* ICON HELPER */

function Sun({ size = 20 }: { size?: number }) {
  return <Sparkles size={size} />;
}

function Church({ size = 20 }: { size?: number }) {
  return <Heart size={size} />;
}