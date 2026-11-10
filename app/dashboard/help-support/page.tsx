"use client";

import { useMemo, useState } from "react";
import {
  Search,
  BookOpen,
  Shirt,
  CalendarDays,
  UserRound,
  Camera,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  MessageCircle,
  Mail,
  Send,
  Sparkles,
  CircleHelp,
  ArrowUpRight,
  X,
  CheckCircle2,
  Headphones,
  Heart,
  Package,
} from "lucide-react";

type HelpCategory =
  | "All topics"
  | "Getting started"
  | "My wardrobe"
  | "Outfit planner"
  | "Profile & measurements"
  | "Photos & privacy"
  | "Account";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: Exclude<HelpCategory, "All topics">;
}

const categories: {
  label: HelpCategory;
  description: string;
  icon: typeof BookOpen;
}[] = [
  {
    label: "Getting started",
    description: "Learn the basics",
    icon: BookOpen,
  },
  {
    label: "My wardrobe",
    description: "Manage your clothes",
    icon: Shirt,
  },
  {
    label: "Outfit planner",
    description: "Plan what to wear",
    icon: CalendarDays,
  },
  {
    label: "Profile & measurements",
    description: "Personalize your profile",
    icon: UserRound,
  },
  {
    label: "Photos & privacy",
    description: "Manage photos safely",
    icon: Camera,
  },
  {
    label: "Account",
    description: "Account and settings",
    icon: ShieldCheck,
  },
];

const faqs: FAQ[] = [
  {
    id: 1,
    question: "What is OutfitLibrary?",
    answer:
      "OutfitLibrary helps you organize your clothes digitally, explore fashion inspiration, and plan outfits. As the app develops, more personalization features can be added to help you get more from the clothes you already own.",
    category: "Getting started",
  },
  {
    id: 2,
    question: "How do I get started?",
    answer:
      "Start by adding clothing items to your wardrobe. Add useful details such as category and colour, then explore the Discover page for inspiration and use the outfit planner to organize your looks.",
    category: "Getting started",
  },
  {
    id: 3,
    question: "How do I add clothes to my wardrobe?",
    answer:
      "Open My Wardrobe and select the add or upload option. Choose a photo of the clothing item, enter its details, and save it. The exact upload and saving behaviour depends on the features currently enabled in your version of OutfitLibrary.",
    category: "My wardrobe",
  },
  {
    id: 4,
    question: "Can I organize clothes by category?",
    answer:
      "Yes. Clothing categories can help you organize items such as tops, shirts, trousers, skirts, dresses, and shoes. Consistent categories make it easier to find items when putting an outfit together.",
    category: "My wardrobe",
  },
  {
    id: 5,
    question: "How do I plan an outfit?",
    answer:
      "Open the outfit planner and choose the date or occasion you want to plan for. Select the clothing items you want to wear and save the outfit if saving is available in your current version.",
    category: "Outfit planner",
  },
  {
    id: 6,
    question: "Can I plan outfits for special occasions?",
    answer:
      "You can use your outfit-planning workflow for occasions such as work, church, weddings, casual outings, travel, and parties. Adding the occasion to your plan can help you stay organized.",
    category: "Outfit planner",
  },
  {
    id: 7,
    question: "Where can I update my profile?",
    answer:
      "Open Settings and select Personal Profile. Depending on the features available in your version, you can update your personal details, profile picture, style preferences, and clothing sizes.",
    category: "Profile & measurements",
  },
  {
    id: 8,
    question: "Why should I add my body measurements?",
    answer:
      "Measurements can help you keep a personal fit reference and support future fit-related recommendations. You can choose which measurements to provide. Measurements entered manually are not the same as measurements estimated from a photograph.",
    category: "Profile & measurements",
  },
  {
    id: 9,
    question: "Do I have to upload a full-body photo?",
    answer:
      "No. A full-body reference photo should be optional. You can use OutfitLibrary's wardrobe features without providing one. If you choose to upload a photo, make sure you understand how the app stores and uses it.",
    category: "Photos & privacy",
  },
  {
    id: 10,
    question: "Can OutfitLibrary determine my exact measurements from a photo?",
    answer:
      "A photograph alone cannot guarantee accurate body measurements. Image-based estimation can be affected by pose, clothing, camera angle, and lighting. Do not treat estimated measurements as exact without appropriate validation.",
    category: "Photos & privacy",
  },
  {
    id: 11,
    question: "Who can see my photos and measurements?",
    answer:
      "Your photos and body measurements should be treated as private personal information. Before uploading sensitive photos, review the privacy information for the version of the app you are using. A production version should enforce private storage and access permissions.",
    category: "Photos & privacy",
  },
  {
    id: 12,
    question: "How do I change my settings?",
    answer:
      "Open Settings and choose the relevant section, such as Personal Profile, Body Measurements, Style Preferences, Clothing Sizes, or Privacy & Security. Save your changes after editing.",
    category: "Account",
  },
  {
    id: 13,
    question: "What should I do if something isn't working?",
    answer:
      "Refresh the page and try again. Check that your internet connection is working and that your image is in a supported format. If the issue continues, contact support with a description of the problem and the steps that caused it.",
    category: "Account",
  },
];

export default function HelpSupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<HelpCategory>("All topics");
  const [openFAQ, setOpenFAQ] = useState<number | null>(1);
  const [showContactForm, setShowContactForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    topic: "General question",
    message: "",
  });

  const filteredFAQs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === "All topics" ||
        faq.category === activeCategory;

      const matchesSearch =
        !query ||
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  function updateContactForm(
    field: keyof typeof contactForm,
    value: string
  ) {
    setContactForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleContactSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // This prototype validates the form but does not send messages.
    // Connect this handler to a secure support API before launch.
    setSubmitted(true);
  }

  function openContactForm() {
    setSubmitted(false);
    setShowContactForm(true);
  }

  function resetFilters() {
    setSearchQuery("");
    setActiveCategory("All topics");
    setOpenFAQ(null);
  }

  return (
    <main className="min-h-screen bg-[#FFFDF9] text-gray-900">

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-100 via-pink-50 to-orange-50">
        <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-pink-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-purple-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-purple-600 shadow-lg shadow-purple-100">
              <Headphones size={30} />
            </div>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/70 px-4 py-2 text-xs font-semibold text-purple-700 sm:text-sm">
              <Sparkles size={15} />
              Your OutfitLibrary help centre
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              How can we{" "}
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                help you?
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              Find answers, learn how to use your wardrobe tools, and get help
              with your OutfitLibrary experience.
            </p>

            {/* SEARCH */}
            <div className="mx-auto mt-8 max-w-2xl">
              <div className="relative">
                <Search
                  size={21}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => {
                    setSearchQuery(event.target.value);
                    setOpenFAQ(null);
                  }}
                  placeholder="Search for answers..."
                  aria-label="Search help articles"
                  className="w-full rounded-2xl border border-white bg-white py-4 pl-14 pr-5 text-sm shadow-xl shadow-purple-100/50 outline-none transition placeholder:text-gray-400 focus:border-purple-300 focus:ring-4 focus:ring-purple-100 sm:py-5 sm:text-base"
                />
              </div>

              <p className="mt-4 text-sm text-gray-500">
                Popular searches:{" "}
                {["upload clothes", "measurements", "outfit planning"].map(
                  (term, index) => (
                    <span key={term}>
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery(term);
                          setActiveCategory("All topics");
                          setOpenFAQ(null);
                        }}
                        className="font-medium text-purple-700 underline-offset-4 hover:underline"
                      >
                        {term}
                      </button>
                      {index < 2 && <span className="mx-2">·</span>}
                    </span>
                  )
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK SUPPORT */}
      <section className="mx-auto max-w-7xl px-5 pt-10 sm:px-8 lg:px-10">
        <div className="grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => {
              setActiveCategory("Getting started");
              setSearchQuery("");
              setOpenFAQ(null);
            }}
            className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-purple-200 hover:shadow-lg"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 transition group-hover:bg-purple-100">
              <BookOpen size={23} />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="font-bold">Getting started</h2>
              <p className="mt-1 text-sm text-gray-500">
                Learn the basics of OutfitLibrary.
              </p>
            </div>

            <ChevronRight
              size={19}
              className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-purple-600"
            />
          </button>

          <button
            type="button"
            onClick={openContactForm}
            className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-pink-200 hover:shadow-lg"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pink-50 text-pink-600 transition group-hover:bg-pink-100">
              <MessageCircle size={23} />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="font-bold">Contact support</h2>
              <p className="mt-1 text-sm text-gray-500">
                Need more help? Tell us what happened.
              </p>
            </div>

            <ChevronRight
              size={19}
              className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-pink-600"
            />
          </button>
        </div>
      </section>

      {/* HELP CATEGORIES */}
      <section className="mx-auto max-w-7xl px-5 pt-14 sm:px-8 lg:px-10">
        <div className="mb-7">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-purple-600">
            Browse by topic
          </p>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            What do you need help with?
          </h2>
          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Choose a topic to find answers related to that part of the app.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => {
            const Icon = category.icon;
            const active = activeCategory === category.label;

            return (
              <button
                key={category.label}
                type="button"
                onClick={() => {
                  setActiveCategory(
                    active ? "All topics" : category.label
                  );
                  setOpenFAQ(null);
                }}
                aria-pressed={active}
                className={`rounded-2xl border p-4 text-left transition sm:p-5 ${
                  active
                    ? "border-purple-300 bg-purple-50 ring-2 ring-purple-100"
                    : "border-gray-100 bg-white hover:border-purple-200 hover:shadow-md"
                }`}
              >
                <div
                  className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${
                    active
                      ? "bg-purple-600 text-white"
                      : "bg-purple-50 text-purple-600"
                  }`}
                >
                  <Icon size={21} />
                </div>

                <h3 className="text-sm font-bold leading-5">
                  {category.label}
                </h3>

                <p className="mt-1.5 text-xs leading-5 text-gray-500">
                  {category.description}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-purple-600">
              Help centre
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently asked questions
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
              Find quick answers to common questions about using
              OutfitLibrary.
            </p>

            <div className="mt-7 rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-purple-600 shadow-sm">
                <CircleHelp size={22} />
              </div>

              <h3 className="mt-4 font-bold">Still have questions?</h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                If you cannot find the answer you're looking for, tell us what
                you need help with.
              </p>

              <button
                type="button"
                onClick={openContactForm}
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-purple-700 transition hover:text-pink-600"
              >
                Get in touch
                <ArrowUpRight size={17} />
              </button>
            </div>
          </div>

          <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-medium text-gray-500">
                {filteredFAQs.length}{" "}
                {filteredFAQs.length === 1 ? "answer" : "answers"} found
                {activeCategory !== "All topics" &&
                  ` in ${activeCategory}`}
              </p>

              {(searchQuery || activeCategory !== "All topics") && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-sm font-semibold text-purple-700 hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>

            {filteredFAQs.length > 0 ? (
              <div className="space-y-3">
                {filteredFAQs.map((faq) => {
                  const isOpen = openFAQ === faq.id;

                  return (
                    <article
                      key={faq.id}
                      className={`overflow-hidden rounded-2xl border bg-white transition ${
                        isOpen
                          ? "border-purple-200 shadow-sm"
                          : "border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenFAQ(isOpen ? null : faq.id)
                        }
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                      >
                        <div>
                          <span className="mb-2 inline-block rounded-full bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-700">
                            {faq.category}
                          </span>

                          <h3 className="font-semibold leading-6 text-gray-900 sm:text-base">
                            {faq.question}
                          </h3>
                        </div>

                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${
                            isOpen
                              ? "rotate-180 bg-purple-100 text-purple-700"
                              : "bg-gray-50 text-gray-500"
                          }`}
                        >
                          <ChevronDown size={19} />
                        </span>
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-6 sm:px-6">
                          <div className="mb-4 h-px bg-gray-100" />
                          <p className="text-sm leading-7 text-gray-600">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-gray-200 bg-white px-6 py-14 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                  <Search size={25} />
                </div>

                <h3 className="mt-4 text-lg font-bold">
                  No answers found
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                  Try another search term or browse a different category.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
                >
                  Show all questions
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-8 lg:px-10 lg:pb-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-purple-700 via-fuchsia-600 to-pink-500 px-6 py-10 text-white sm:px-10 sm:py-12 lg:px-14">
          <div className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full border-[35px] border-white/10" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

          <div className="relative flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-white/80">
                <Heart size={17} />
                We're here to help
              </div>

              <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                Let's get you back to styling.
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/80 sm:text-base">
                Whether you have a question or ran into a problem, let us know
                what you need help with.
              </p>
            </div>

            <button
              type="button"
              onClick={openContactForm}
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-purple-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-purple-50"
            >
              <MessageCircle size={18} />
              Contact support
              <ArrowUpRight size={17} />
            </button>
          </div>
        </div>
      </section>

      {/* CONTACT FORM MODAL */}
      {showContactForm && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-gray-950/60 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowContactForm(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            className="my-auto w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 p-5 sm:p-7">
              <div>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <Mail size={22} />
                </div>

                <h2
                  id="contact-title"
                  className="text-2xl font-bold tracking-tight"
                >
                  Contact support
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Tell us about your question or the problem you're
                  experiencing.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowContactForm(false)}
                aria-label="Close contact form"
                className="rounded-xl p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            {submitted ? (
              <div className="p-6 text-center sm:p-10">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                  <CheckCircle2 size={32} />
                </div>

                <h3 className="mt-5 text-xl font-bold">
                  Your message is ready
                </h3>

                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
                  This demo form has validated your message, but it has not
                  been sent. A support API or email integration must be
                  connected before users can contact your team.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setShowContactForm(false);
                    setSubmitted(false);
                  }}
                  className="mt-6 rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleContactSubmit}
                className="space-y-5 p-5 sm:p-7"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-gray-700">
                      Your name
                    </span>
                    <input
                      required
                      maxLength={100}
                      value={contactForm.name}
                      onChange={(event) =>
                        updateContactForm("name", event.target.value)
                      }
                      placeholder="Enter your name"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-purple-400 focus:ring-4 focus:ring-purple-50"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-gray-700">
                      Email address
                    </span>
                    <input
                      required
                      type="email"
                      maxLength={254}
                      value={contactForm.email}
                      onChange={(event) =>
                        updateContactForm("email", event.target.value)
                      }
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-purple-400 focus:ring-4 focus:ring-purple-50"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-gray-700">
                    What do you need help with?
                  </span>

                  <select
                    value={contactForm.topic}
                    onChange={(event) =>
                      updateContactForm("topic", event.target.value)
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-purple-400 focus:ring-4 focus:ring-purple-50"
                  >
                    <option>General question</option>
                    <option>Wardrobe and clothing uploads</option>
                    <option>Outfit planning</option>
                    <option>Profile and measurements</option>
                    <option>Photos and privacy</option>
                    <option>Technical issue</option>
                    <option>Feature suggestion</option>
                    <option>Other</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-gray-700">
                    Your message
                  </span>

                  <textarea
                    required
                    minLength={10}
                    maxLength={3000}
                    rows={5}
                    value={contactForm.message}
                    onChange={(event) =>
                      updateContactForm("message", event.target.value)
                    }
                    placeholder="Describe your question or the problem you encountered..."
                    className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-gray-400 focus:border-purple-400 focus:ring-4 focus:ring-purple-50"
                  />

                  <span className="mt-1 block text-right text-xs text-gray-400">
                    {contactForm.message.length}/3000
                  </span>
                </label>

                <div className="rounded-xl bg-gray-50 p-3 text-xs leading-5 text-gray-500">
                  Please do not include passwords or sensitive personal
                  information in your message.
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3.5 font-semibold text-white transition hover:bg-purple-700"
                >
                  <Send size={17} />
                  Submit message
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}