"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Plus,
  Sparkles,
  Shirt,
  Heart,
  BriefcaseBusiness,
  Church,
  PartyPopper,
  Coffee,
  Users,
  X,
  Check,
  ShoppingBag,
  CalendarCheck,
  Sun,
  MoreHorizontal,
  WandSparkles,
  Trash2,
  Pencil,
} from "lucide-react";

type OutfitEvent = {
  id: number;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  dressCode: string;
  notes: string;
  outfitPlanned: boolean;
  outfitName?: string;
  color: string;
};

const initialEvents: OutfitEvent[] = [
  {
    id: 1,
    title: "Team Meeting",
    type: "Work",
    date: "2026-10-29",
    time: "10:00",
    location: "Office",
    dressCode: "Smart casual",
    notes: "Look polished and professional.",
    outfitPlanned: true,
    outfitName: "The Effortless Classic",
    color: "purple",
  },
  {
    id: 2,
    title: "Dinner with Friends",
    type: "Casual outing",
    date: "2026-10-31",
    time: "18:30",
    location: "Restaurant",
    dressCode: "Smart casual",
    notes: "Something comfortable but stylish.",
    outfitPlanned: false,
    color: "pink",
  },
  {
    id: 3,
    title: "Sunday Service",
    type: "Church",
    date: "2026-11-01",
    time: "09:00",
    location: "Church",
    dressCode: "Elegant",
    notes: "Plan a modest, elegant look.",
    outfitPlanned: false,
    color: "blue",
  },
  {
    id: 4,
    title: "Ada's Wedding",
    type: "Wedding",
    date: "2026-11-07",
    time: "12:00",
    location: "Lagos",
    dressCode: "Traditional / Aso Ebi",
    notes: "Coordinate accessories with the outfit.",
    outfitPlanned: false,
    color: "orange",
  },
  {
    id: 5,
    title: "Project Presentation",
    type: "Work",
    date: "2026-11-12",
    time: "11:00",
    location: "Office",
    dressCode: "Business formal",
    notes: "Prepare a confident, professional look.",
    outfitPlanned: false,
    color: "purple",
  },
];

const eventTypes = [
  {
    name: "Work",
    icon: BriefcaseBusiness,
    color: "bg-purple-100 text-purple-600",
    dot: "bg-purple-500",
  },
  {
    name: "Wedding",
    icon: Heart,
    color: "bg-pink-100 text-pink-600",
    dot: "bg-pink-500",
  },
  {
    name: "Church",
    icon: Church,
    color: "bg-blue-100 text-blue-600",
    dot: "bg-blue-500",
  },
  {
    name: "Casual outing",
    icon: Coffee,
    color: "bg-orange-100 text-orange-600",
    dot: "bg-orange-500",
  },
  {
    name: "Party",
    icon: PartyPopper,
    color: "bg-amber-100 text-amber-600",
    dot: "bg-amber-500",
  },
  {
    name: "Family event",
    icon: Users,
    color: "bg-emerald-100 text-emerald-600",
    dot: "bg-emerald-500",
  },
];

const emptyEvent = {
  title: "",
  type: "Work",
  date: "",
  time: "10:00",
  location: "",
  dressCode: "No preference",
  notes: "",
};

function formatDate(dateString: string) {
  const date = new Date(`${dateString}T12:00:00`);

  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatShortDate(dateString: string) {
  const date = new Date(`${dateString}T12:00:00`);

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

function getEventColor(color: string) {
  const colors: Record<string, string> = {
    purple: "bg-purple-100 text-purple-700 border-purple-200",
    pink: "bg-pink-100 text-pink-700 border-pink-200",
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    orange: "bg-orange-100 text-orange-700 border-orange-200",
    amber: "bg-amber-100 text-amber-700 border-amber-200",
    emerald: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };

  return colors[color] || colors.purple;
}

function getEventDot(color: string) {
  const colors: Record<string, string> = {
    purple: "bg-purple-500",
    pink: "bg-pink-500",
    blue: "bg-blue-500",
    orange: "bg-orange-500",
    amber: "bg-amber-500",
    emerald: "bg-emerald-500",
  };

  return colors[color] || colors.purple;
}

function getEventColorName(type: string) {
  const found = eventTypes.find((event) => event.name === type);

  if (found) {
    if (type === "Work") return "purple";
    if (type === "Wedding") return "pink";
    if (type === "Church") return "blue";
    if (type === "Casual outing") return "orange";
    if (type === "Party") return "amber";
    if (type === "Family event") return "emerald";
  }

  return "purple";
}

export default function CalendarPage() {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [selectedDate, setSelectedDate] = useState(
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`
  );

  const [events, setEvents] = useState<OutfitEvent[]>(initialEvents);
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<OutfitEvent | null>(null);
  const [eventForm, setEventForm] = useState(emptyEvent);
  const [activeFilter, setActiveFilter] = useState("All events");
  const [showEventDetails, setShowEventDetails] =
    useState<OutfitEvent | null>(null);

  const monthName = currentMonth.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  const monthStart = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  );

  const monthEnd = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  );

  // Monday-first calendar.
  const startingDay = (monthStart.getDay() + 6) % 7;
  const daysInMonth = monthEnd.getDate();

  const calendarDays: (number | null)[] = [
    ...Array.from({ length: startingDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  while (calendarDays.length % 7 !== 0) {
    calendarDays.push(null);
  }

  const getDateString = (day: number) => {
    return `${currentMonth.getFullYear()}-${String(
      currentMonth.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const monthEvents = events
    .filter((event) => {
      const date = new Date(`${event.date}T12:00:00`);

      return (
        date.getFullYear() === currentMonth.getFullYear() &&
        date.getMonth() === currentMonth.getMonth()
      );
    })
    .sort((a, b) => {
      return (
        new Date(`${a.date}T${a.time}`).getTime() -
        new Date(`${b.date}T${b.time}`).getTime()
      );
    });

  const selectedEvents = events
    .filter((event) => event.date === selectedDate)
    .filter((event) => {
      return activeFilter === "All events" || event.type === activeFilter;
    })
    .sort((a, b) => a.time.localeCompare(b.time));

  const upcomingEvents = [...events]
    .filter((event) => event.date >= selectedDate)
    .sort((a, b) => {
      return (
        new Date(`${a.date}T${a.time}`).getTime() -
        new Date(`${b.date}T${b.time}`).getTime()
      );
    })
    .slice(0, 4);

  const plannedCount = events.filter((event) => event.outfitPlanned).length;
  const needsPlanning = events.filter((event) => !event.outfitPlanned).length;

  function changeMonth(direction: number) {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + direction,
        1
      )
    );
  }

  function goToToday() {
    const now = new Date();

    setCurrentMonth(new Date(now.getFullYear(), now.getMonth(), 1));
    setSelectedDate(
      `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`
    );
  }

  function openCreateModal(date = selectedDate) {
    setEditingEvent(null);
    setEventForm({
      ...emptyEvent,
      date,
    });
    setShowEventModal(true);
  }

  function openEditModal(event: OutfitEvent) {
    setEditingEvent(event);

    setEventForm({
      title: event.title,
      type: event.type,
      date: event.date,
      time: event.time,
      location: event.location,
      dressCode: event.dressCode,
      notes: event.notes,
    });

    setShowEventDetails(null);
    setShowEventModal(true);
  }

  function saveEvent() {
    if (!eventForm.title.trim() || !eventForm.date) {
      return;
    }

    const event: OutfitEvent = {
      id: editingEvent?.id ?? Date.now(),
      title: eventForm.title.trim(),
      type: eventForm.type,
      date: eventForm.date,
      time: eventForm.time,
      location: eventForm.location.trim(),
      dressCode: eventForm.dressCode,
      notes: eventForm.notes.trim(),
      outfitPlanned: editingEvent?.outfitPlanned ?? false,
      outfitName: editingEvent?.outfitName,
      color: getEventColorName(eventForm.type),
    };

    setEvents((previous) => {
      if (editingEvent) {
        return previous.map((item) =>
          item.id === editingEvent.id ? event : item
        );
      }

      return [...previous, event];
    });

    setSelectedDate(event.date);

    setCurrentMonth(
      new Date(
        Number(event.date.slice(0, 4)),
        Number(event.date.slice(5, 7)) - 1,
        1
      )
    );

    setShowEventModal(false);
    setEditingEvent(null);
    setEventForm(emptyEvent);
    setActiveFilter("All events");
  }

  function deleteEvent(id: number) {
    setEvents((previous) => previous.filter((event) => event.id !== id));
    setShowEventDetails(null);
  }

  function markOutfitPlanned(event: OutfitEvent) {
    setEvents((previous) =>
      previous.map((item) =>
        item.id === event.id
          ? {
              ...item,
              outfitPlanned: true,
              outfitName: item.outfitName || "Outfit selected",
            }
          : item
      )
    );

    setShowEventDetails(null);
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
              Outfit Calendar
            </h1>

            <p className="hidden text-xs text-slate-500 sm:block">
              Plan your events. Prepare your looks.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/stylist"
            className="hidden items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-purple-50 sm:flex"
          >
            <WandSparkles size={17} />
            Outfit Planner
          </Link>

          <button
            type="button"
            onClick={() => openCreateModal()}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-3 py-2.5 text-xs font-bold text-white shadow-md shadow-purple-100 transition hover:-translate-y-0.5 sm:px-4 sm:text-sm"
          >
            <Plus size={17} />
            <span className="hidden sm:inline">Add event</span>
            <span className="sm:hidden">Add</span>
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
                <CalendarDays size={14} />
                YOUR PERSONAL STYLE CALENDAR
              </div>

              <h2 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Every occasion,
                <br />
                <span className="text-yellow-300">one perfect look.</span> ✨
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-white/85 sm:text-base">
                Keep track of every event, plan your outfits in advance, and
                know exactly what you need before the big day arrives.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-xs font-medium">
                <span className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-2">
                  <CalendarCheck size={14} />
                  Plan ahead
                </span>

                <span className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-2">
                  <Shirt size={14} />
                  Prepare your looks
                </span>

                <span className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-2">
                  <ShoppingBag size={14} />
                  Shop what is missing
                </span>
              </div>
            </div>

            <div className="relative mx-auto hidden h-[250px] w-[260px] md:block">
              <div className="absolute inset-3 rotate-6 rounded-[35px] bg-white/15" />

              <div className="absolute inset-5 overflow-hidden rounded-[30px] border-4 border-white/50 bg-white p-4 text-slate-800 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-purple-500">
                      YOUR STYLE PLANNER
                    </p>

                    <p className="mt-1 text-sm font-extrabold">
                      October 2026
                    </p>
                  </div>

                  <CalendarDays className="text-purple-500" size={21} />
                </div>

                <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[8px] font-bold text-slate-400">
                  {["M", "T", "W", "T", "F", "S", "S"].map(
                    (day, index) => (
                      <span key={`${day}-${index}`}>{day}</span>
                    )
                  )}
                </div>

                <div className="mt-2 grid grid-cols-7 gap-1 text-center text-[9px]">
                  {Array.from({ length: 35 }, (_, index) => {
                    const day = index - 2;
                    const valid = day >= 1 && day <= 31;
                    const highlighted = [29, 31].includes(day);

                    return (
                      <span
                        key={index}
                        className={`flex h-6 items-center justify-center rounded-lg ${
                          highlighted
                            ? "bg-purple-600 font-bold text-white"
                            : valid
                              ? "text-slate-600"
                              : "text-transparent"
                        }`}
                      >
                        {valid ? day : "0"}
                      </span>
                    );
                  })}
                </div>

                <div className="mt-3 flex items-center gap-2 rounded-xl bg-pink-50 p-2">
                  <span className="h-7 w-1 rounded-full bg-pink-500" />

                  <div>
                    <p className="text-[9px] font-extrabold">
                      Dinner with friends
                    </p>

                    <p className="mt-0.5 text-[8px] text-slate-500">
                      Saturday · 6:30 PM
                    </p>
                  </div>

                  <Heart size={14} className="ml-auto text-pink-500" />
                </div>
              </div>

              <div className="absolute -right-3 bottom-5 flex items-center gap-2 rounded-xl bg-white px-3 py-3 text-xs font-bold text-purple-700 shadow-xl">
                <Check size={16} className="text-emerald-500" />
                Look planned!
              </div>
            </div>
          </div>
        </section>

        {/* STATISTICS */}
        <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <div className="rounded-2xl border border-purple-100 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-500">
                Events this month
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                <CalendarDays size={18} />
              </span>
            </div>

            <p className="mt-4 text-2xl font-extrabold text-slate-900">
              {monthEvents.length}
            </p>

            <p className="mt-1 text-[10px] text-slate-400">
              In {monthName}
            </p>
          </div>

          <div className="rounded-2xl border border-pink-100 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-500">
                Outfits planned
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-100 text-pink-600">
                <Shirt size={18} />
              </span>
            </div>

            <p className="mt-4 text-2xl font-extrabold text-slate-900">
              {plannedCount}
            </p>

            <p className="mt-1 text-[10px] text-slate-400">
              Across all events
            </p>
          </div>

          <div className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-500">
                Need outfit planning
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                <Clock size={18} />
              </span>
            </div>

            <p className="mt-4 text-2xl font-extrabold text-slate-900">
              {needsPlanning}
            </p>

            <p className="mt-1 text-[10px] text-slate-400">
              Ready for your attention
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-500">
                Upcoming events
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <CalendarCheck size={18} />
              </span>
            </div>

            <p className="mt-4 text-2xl font-extrabold text-slate-900">
              {upcomingEvents.length}
            </p>

            <p className="mt-1 text-[10px] text-slate-400">
              Next events to prepare for
            </p>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_350px]">
          {/* CALENDAR */}
          <section className="min-w-0 overflow-hidden rounded-3xl border border-purple-100 bg-white shadow-sm">
            {/* CALENDAR HEADER */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-5 sm:p-6">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Your calendar
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Select a date to view or add an event.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goToToday}
                  className="rounded-xl border border-purple-100 px-3 py-2 text-xs font-bold text-purple-700 transition hover:bg-purple-50"
                >
                  Today
                </button>

                <button
                  type="button"
                  onClick={() => changeMonth(-1)}
                  aria-label="Previous month"
                  className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:border-purple-200 hover:bg-purple-50"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => changeMonth(1)}
                  aria-label="Next month"
                  className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:border-purple-200 hover:bg-purple-50"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* MONTH TITLE */}
            <div className="flex items-center justify-between px-4 pb-4 pt-5 sm:px-6">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  {monthName}
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  {monthEvents.length} scheduled{" "}
                  {monthEvents.length === 1 ? "event" : "events"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => openCreateModal(selectedDate)}
                className="flex items-center gap-2 rounded-xl bg-purple-50 px-3 py-2.5 text-xs font-bold text-purple-700 transition hover:bg-purple-100"
              >
                <Plus size={15} />
                Add event
              </button>
            </div>

            {/* WEEKDAYS */}
            <div className="grid grid-cols-7 border-y border-slate-100 bg-[#FCFBFF]">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                (day, index) => (
                  <div
                    key={day}
                    className={`py-3 text-center text-[10px] font-bold uppercase tracking-wide sm:text-xs ${
                      index >= 5 ? "text-pink-500" : "text-slate-500"
                    }`}
                  >
                    <span className="sm:hidden">{day.slice(0, 1)}</span>
                    <span className="hidden sm:inline">{day}</span>
                  </div>
                )
              )}
            </div>

            {/* CALENDAR GRID */}
            <div className="grid grid-cols-7">
              {calendarDays.map((day, index) => {
                if (day === null) {
                  return (
                    <div
                      key={`empty-${index}`}
                      className="min-h-[76px] border-b border-r border-slate-100 bg-[#FCFBFF]/70 sm:min-h-[110px]"
                    />
                  );
                }

                const dateString = getDateString(day);

                const dayEvents = monthEvents.filter(
                  (event) => event.date === dateString
                );

                const isSelected = selectedDate === dateString;

                const isToday =
                  today.getFullYear() === currentMonth.getFullYear() &&
                  today.getMonth() === currentMonth.getMonth() &&
                  today.getDate() === day;

                return (
                  <button
                    type="button"
                    key={dateString}
                    onClick={() => setSelectedDate(dateString)}
                    aria-label={`${formatDate(dateString)}${dayEvents.length ? `, ${dayEvents.length} events` : ""}`}
                    aria-pressed={isSelected}
                    className={`relative min-h-[76px] border-b border-r border-slate-100 p-1.5 text-left transition sm:min-h-[110px] sm:p-2.5 ${
                      isSelected
                        ? "bg-purple-50 ring-2 ring-inset ring-purple-400"
                        : "bg-white hover:bg-purple-50/50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold sm:h-8 sm:w-8 sm:text-sm ${
                          isToday
                            ? "bg-gradient-to-br from-pink-500 to-purple-600 text-white"
                            : isSelected
                              ? "bg-purple-200 text-purple-800"
                              : "text-slate-700"
                        }`}
                      >
                        {day}
                      </span>

                      {dayEvents.length > 0 && (
                        <span className="hidden text-[9px] font-semibold text-slate-400 sm:inline">
                          {dayEvents.length}{" "}
                          {dayEvents.length === 1 ? "event" : "events"}
                        </span>
                      )}
                    </div>

                    <div className="mt-2 hidden space-y-1 sm:block">
                      {dayEvents.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className={`truncate rounded-md border px-1.5 py-1 text-[9px] font-semibold ${getEventColor(event.color)}`}
                          title={event.title}
                        >
                          {event.title}
                        </div>
                      ))}

                      {dayEvents.length > 2 && (
                        <p className="px-1 text-[9px] font-semibold text-purple-600">
                          +{dayEvents.length - 2} more
                        </p>
                      )}
                    </div>

                    {/* MOBILE EVENT INDICATORS */}
                    <div className="mt-2 flex flex-wrap gap-1 sm:hidden">
                      {dayEvents.slice(0, 3).map((event) => (
                        <span
                          key={event.id}
                          className={`h-1.5 w-1.5 rounded-full ${getEventDot(event.color)}`}
                        />
                      ))}
                    </div>

                    {dayEvents.some((event) => !event.outfitPlanned) && (
                      <span
                        className="absolute bottom-2 right-2 hidden h-2 w-2 rounded-full bg-orange-400 sm:block"
                        title="An event needs outfit planning"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* LEGEND */}
            <div className="flex flex-wrap gap-x-4 gap-y-3 border-t border-slate-100 px-5 py-4 sm:px-6">
              {eventTypes.map((type) => (
                <div
                  key={type.name}
                  className="flex items-center gap-2 text-[10px] font-medium text-slate-500"
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${type.dot}`}
                  />
                  {type.name}
                </div>
              ))}
            </div>
          </section>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-5">
            {/* SELECTED DATE EVENTS */}
            <section className="rounded-3xl border border-purple-100 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <CalendarDays size={18} className="text-purple-600" />

                    <h3 className="text-lg font-extrabold text-slate-900">
                      Your events
                    </h3>
                  </div>

                  <p className="mt-2 text-xs text-slate-500">
                    {formatDate(selectedDate)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => openCreateModal(selectedDate)}
                  aria-label="Add event on selected date"
                  className="rounded-xl bg-purple-50 p-2.5 text-purple-600 transition hover:bg-purple-100"
                >
                  <Plus size={18} />
                </button>
              </div>

              {/* FILTER */}
              <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
                {["All events", "Work", "Wedding", "Church"].map((filter) => (
                  <button
                    type="button"
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`shrink-0 rounded-full px-3 py-2 text-[10px] font-bold transition ${
                      activeFilter === filter
                        ? "bg-purple-600 text-white"
                        : "bg-slate-100 text-slate-500 hover:bg-purple-50 hover:text-purple-600"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* EVENT LIST */}
              <div className="mt-5 space-y-3">
                {selectedEvents.length > 0 ? (
                  selectedEvents.map((event) => {
                    const eventType = eventTypes.find(
                      (type) => type.name === event.type
                    );

                    const EventIcon = eventType?.icon || CalendarDays;

                    return (
                      <button
                        type="button"
                        key={event.id}
                        onClick={() => setShowEventDetails(event)}
                        className="w-full rounded-2xl border border-slate-100 p-3 text-left transition hover:border-purple-200 hover:bg-purple-50/30"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${eventType?.color || "bg-purple-100 text-purple-600"}`}
                          >
                            <EventIcon size={19} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-extrabold text-slate-800">
                              {event.title}
                            </p>

                            <p className="mt-1 text-[10px] text-slate-500">
                              {event.type}
                            </p>

                            <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-500">
                              <Clock size={12} />
                              {event.time}
                            </div>

                            <div className="mt-2">
                              {event.outfitPlanned ? (
                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-[9px] font-bold text-emerald-700">
                                  <Check size={11} />
                                  Outfit planned
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-1 text-[9px] font-bold text-orange-700">
                                  <Shirt size={11} />
                                  Plan your outfit
                                </span>
                              )}
                            </div>
                          </div>

                          <ChevronRight
                            size={16}
                            className="mt-1 shrink-0 text-slate-300"
                          />
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="rounded-2xl border border-dashed border-purple-200 bg-purple-50/50 px-4 py-8 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-purple-500 shadow-sm">
                      <CalendarDays size={23} />
                    </div>

                    <h4 className="mt-4 text-sm font-extrabold text-slate-800">
                      Nothing planned yet
                    </h4>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      Add an event to this date and start planning your look.
                    </p>

                    <button
                      type="button"
                      onClick={() => openCreateModal(selectedDate)}
                      className="mt-4 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-purple-700"
                    >
                      <Plus size={14} />
                      Add an event
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* UPCOMING EVENTS */}
            <section className="rounded-3xl border border-pink-100 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    Coming up
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Events to prepare for
                  </p>
                </div>

                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100 text-pink-600">
                  <CalendarCheck size={19} />
                </span>
              </div>

              <div className="mt-5 space-y-4">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event) => (
                    <button
                      type="button"
                      key={event.id}
                      onClick={() => {
                        setSelectedDate(event.date);

                        const date = new Date(`${event.date}T12:00:00`);

                        setCurrentMonth(
                          new Date(date.getFullYear(), date.getMonth(), 1)
                        );
                      }}
                      className="flex w-full items-center gap-3 text-left"
                    >
                      <div
                        className={`flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl border ${getEventColor(event.color)}`}
                      >
                        <span className="text-sm font-extrabold">
                          {new Date(
                            `${event.date}T12:00:00`
                          ).getDate()}
                        </span>

                        <span className="text-[8px] font-bold uppercase">
                          {new Date(
                            `${event.date}T12:00:00`
                          ).toLocaleDateString("en-GB", {
                            month: "short",
                          })}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-extrabold text-slate-800">
                          {event.title}
                        </p>

                        <p className="mt-1 truncate text-[10px] text-slate-500">
                          {event.time} · {event.type}
                        </p>

                        <p
                          className={`mt-1 text-[9px] font-bold ${
                            event.outfitPlanned
                              ? "text-emerald-600"
                              : "text-orange-600"
                          }`}
                        >
                          {event.outfitPlanned
                            ? "Look ready"
                            : "Outfit needed"}
                        </p>
                      </div>

                      <ChevronRight
                        size={15}
                        className="shrink-0 text-slate-300"
                      />
                    </button>
                  ))
                ) : (
                  <p className="py-4 text-center text-xs text-slate-500">
                    No upcoming events. You're all caught up!
                  </p>
                )}
              </div>
            </section>

            {/* STYLE PREPARATION CARD */}
            <section className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 p-5 text-white shadow-lg shadow-pink-100">
              <div className="absolute -right-8 -top-8 -z-10 h-32 w-32 rounded-full bg-white/15 blur-2xl" />

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                <WandSparkles size={22} />
              </div>

              <h3 className="mt-4 text-lg font-extrabold">
                Don't wait until the last minute!
              </h3>

              <p className="mt-2 text-xs leading-6 text-white/85">
                Plan your outfits early, discover missing pieces, and give
                yourself enough time to shop before your next event.
              </p>

              <Link
                href="/dashboard/stylist"
                className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-xs font-extrabold text-purple-700 transition hover:bg-purple-50"
              >
                Plan an outfit
                <ArrowRight size={15} />
              </Link>
            </section>
          </aside>
        </div>

        {/* PREPARATION CHECKLIST */}
        <section className="rounded-3xl border border-purple-100 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles size={19} className="text-purple-600" />

                <h2 className="text-xl font-extrabold text-slate-900">
                  Your event preparation checklist
                </h2>
              </div>

              <p className="mt-2 text-sm text-slate-500">
                A little preparation goes a long way.
              </p>
            </div>

            <Link
              href="/dashboard/stylist"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-50 px-4 py-3 text-xs font-bold text-purple-700 transition hover:bg-purple-100"
            >
              <Shirt size={16} />
              Open Outfit Planner
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="flex items-start gap-3 rounded-2xl bg-purple-50/70 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-purple-600 shadow-sm">
                <CalendarCheck size={19} />
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  1. Add your events
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Record upcoming weddings, work events, church services,
                  birthdays, and outings.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl bg-pink-50/70 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-pink-600 shadow-sm">
                <WandSparkles size={19} />
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  2. Choose your looks
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Explore outfit combinations that suit each occasion and
                  your personal style.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl bg-orange-50/70 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-orange-600 shadow-sm">
                <ShoppingBag size={19} />
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  3. Get what you need
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Identify missing shoes, accessories, or clothing early so
                  you can prepare without rushing.
                </p>
              </div>
            </div>
          </div>
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
              href="/dashboard/history"
              className="transition hover:text-purple-600"
            >
              Saved Looks
            </Link>
          </div>
        </footer>
      </div>

      {/* ADD / EDIT EVENT MODAL */}
      {showEventModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onClick={() => setShowEventModal(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="event-modal-title"
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 p-5 sm:p-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-purple-600">
                  Your style calendar
                </p>

                <h2
                  id="event-modal-title"
                  className="mt-1 text-xl font-extrabold text-slate-900"
                >
                  {editingEvent ? "Edit event" : "Add a new event"}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Tell us about the occasion so you can plan your look.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowEventModal(false)}
                aria-label="Close event form"
                className="rounded-xl bg-slate-100 p-2 text-slate-600 transition hover:bg-pink-100 hover:text-pink-600"
              >
                <X size={19} />
              </button>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              <div>
                <label
                  htmlFor="eventTitle"
                  className="text-xs font-bold text-slate-700"
                >
                  Event name *
                </label>

                <input
                  id="eventTitle"
                  type="text"
                  value={eventForm.title}
                  onChange={(e) =>
                    setEventForm({
                      ...eventForm,
                      title: e.target.value,
                    })
                  }
                  placeholder="e.g. Sarah's wedding"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-purple-400 focus:ring-4 focus:ring-purple-50"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">
                  What is the occasion?
                </label>

                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {eventTypes.map((type) => {
                    const Icon = type.icon;
                    const active = eventForm.type === type.name;

                    return (
                      <button
                        type="button"
                        key={type.name}
                        onClick={() =>
                          setEventForm({
                            ...eventForm,
                            type: type.name,
                          })
                        }
                        className={`flex items-center gap-2 rounded-xl border p-3 text-left text-xs font-semibold transition ${
                          active
                            ? "border-purple-300 bg-purple-50 text-purple-700 ring-2 ring-purple-100"
                            : "border-slate-100 text-slate-600 hover:border-purple-200"
                        }`}
                      >
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${type.color}`}
                        >
                          <Icon size={16} />
                        </span>

                        <span>{type.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="eventDate"
                    className="flex items-center gap-2 text-xs font-bold text-slate-700"
                  >
                    <CalendarDays size={15} />
                    Event date *
                  </label>

                  <input
                    id="eventDate"
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
                    htmlFor="eventTime"
                    className="flex items-center gap-2 text-xs font-bold text-slate-700"
                  >
                    <Clock size={15} />
                    Time
                  </label>

                  <input
                    id="eventTime"
                    type="time"
                    value={eventForm.time}
                    onChange={(e) =>
                      setEventForm({
                        ...eventForm,
                        time: e.target.value,
                      })
                    }
                    className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="eventLocation"
                  className="flex items-center gap-2 text-xs font-bold text-slate-700"
                >
                  <MapPin size={15} />
                  Location
                </label>

                <input
                  id="eventLocation"
                  type="text"
                  value={eventForm.location}
                  onChange={(e) =>
                    setEventForm({
                      ...eventForm,
                      location: e.target.value,
                    })
                  }
                  placeholder="e.g. Lagos, church, outdoor venue"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label
                  htmlFor="eventDressCode"
                  className="text-xs font-bold text-slate-700"
                >
                  Dress code
                </label>

                <select
                  id="eventDressCode"
                  value={eventForm.dressCode}
                  onChange={(e) =>
                    setEventForm({
                      ...eventForm,
                      dressCode: e.target.value,
                    })
                  }
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-purple-400"
                >
                  {[
                    "No preference",
                    "Casual",
                    "Smart casual",
                    "Business formal",
                    "Black tie",
                    "Traditional",
                    "All white",
                    "Ankara / Aso Ebi",
                    "Modest and elegant",
                  ].map((code) => (
                    <option key={code}>{code}</option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="eventNotes"
                  className="text-xs font-bold text-slate-700"
                >
                  Additional notes
                </label>

                <textarea
                  id="eventNotes"
                  value={eventForm.notes}
                  onChange={(e) =>
                    setEventForm({
                      ...eventForm,
                      notes: e.target.value,
                    })
                  }
                  rows={3}
                  placeholder="e.g. The wedding colors are wine and gold..."
                  className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-purple-400"
                />
              </div>

              <div className="rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-purple-600 shadow-sm">
                    <WandSparkles size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      Plan your outfit next
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Once you add this event, you can use the Outfit Planner
                      to explore looks for the occasion.
                    </p>
                  </div>
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
                  onClick={saveEvent}
                  disabled={!eventForm.title.trim() || !eventForm.date}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-purple-100 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Check size={17} />
                  {editingEvent ? "Save changes" : "Create event"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EVENT DETAILS MODAL */}
      {showEventDetails && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onClick={() => setShowEventDetails(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="event-details-title"
            className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-violet-700 via-purple-600 to-pink-500 p-6 text-white">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

              <div className="relative flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                    Event details
                  </p>

                  <h2
                    id="event-details-title"
                    className="mt-2 text-2xl font-extrabold"
                  >
                    {showEventDetails.title}
                  </h2>

                  <p className="mt-2 text-sm text-white/80">
                    {showEventDetails.type}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowEventDetails(null)}
                  aria-label="Close event details"
                  className="rounded-xl bg-white/15 p-2 transition hover:bg-white/25"
                >
                  <X size={19} />
                </button>
              </div>
            </div>

            <div className="space-y-5 p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                  <CalendarDays size={19} />
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-800">
                    Date and time
                  </p>

                  <p className="mt-1 text-sm text-slate-600">
                    {formatDate(showEventDetails.date)}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {showEventDetails.time}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-100 text-pink-600">
                  <MapPin size={19} />
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-800">
                    Location
                  </p>

                  <p className="mt-1 text-sm text-slate-600">
                    {showEventDetails.location || "No location added"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <Shirt size={19} />
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-800">
                    Dress code
                  </p>

                  <p className="mt-1 text-sm text-slate-600">
                    {showEventDetails.dressCode}
                  </p>
                </div>
              </div>

              {showEventDetails.notes && (
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-bold text-slate-800">
                    Notes
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {showEventDetails.notes}
                  </p>
                </div>
              )}

              <div
                className={`rounded-2xl p-4 ${
                  showEventDetails.outfitPlanned
                    ? "bg-emerald-50"
                    : "bg-purple-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white ${
                      showEventDetails.outfitPlanned
                        ? "text-emerald-600"
                        : "text-purple-600"
                    }`}
                  >
                    {showEventDetails.outfitPlanned ? (
                      <Check size={19} />
                    ) : (
                      <WandSparkles size={19} />
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {showEventDetails.outfitPlanned
                        ? "Your outfit is marked as planned"
                        : "Have you chosen your outfit?"}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {showEventDetails.outfitPlanned
                        ? `Selected look: ${showEventDetails.outfitName || "Outfit selected"}`
                        : "Explore your wardrobe and prepare a look for this event."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => openEditModal(showEventDetails)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  <Pencil size={15} />
                  Edit event
                </button>

                <Link
                  href="/dashboard/stylist"
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-3 text-xs font-bold text-white shadow-md shadow-purple-100 transition hover:-translate-y-0.5"
                >
                  <WandSparkles size={15} />
                  Plan an outfit
                </Link>
              </div>

              {!showEventDetails.outfitPlanned && (
                <button
                  type="button"
                  onClick={() => markOutfitPlanned(showEventDetails)}
                  className="w-full rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100"
                >
                  Mark outfit as planned
                </button>
              )}

              <button
                type="button"
                onClick={() => deleteEvent(showEventDetails.id)}
                className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50"
              >
                <Trash2 size={14} />
                Delete event
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}