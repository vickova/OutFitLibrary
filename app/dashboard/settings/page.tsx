"use client";

import { useEffect, useRef, useState } from "react";
import {
  UserRound,
  Ruler,
  Camera,
  Palette,
  Shirt,
  ShieldCheck,
  Upload,
  Trash2,
  Save,
  Check,
  ChevronRight,
  Sparkles,
  Heart,
  Eye,
  EyeOff,
  X,
  CircleHelp,
  LoaderCircle,
} from "lucide-react";

type SettingsSection =
  | "profile"
  | "measurements"
  | "photos"
  | "style"
  | "wardrobe"
  | "privacy";

type MeasurementUnit = "cm" | "in";

interface UserProfile {
  fullName: string;
  username: string;
  email: string;
  bio: string;
  location: string;
  profilePicture: string;
  bodyPhoto: string;
  height: string;
  weight: string;
  shoulder: string;
  chest: string;
  waist: string;
  hips: string;
  inseam: string;
  unit: MeasurementUnit;
  styles: string[];
  colors: string[];
  occasions: string[];
  preferredFit: string;
  topsSize: string;
  bottomsSize: string;
  dressSize: string;
  shoeSize: string;
  privateProfile: boolean;
  privatePhotos: boolean;
}

const STORAGE_KEY = "outfitlibrary-user-settings";

const initialProfile: UserProfile = {
  fullName: "",
  username: "",
  email: "",
  bio: "",
  location: "",
  profilePicture: "",
  bodyPhoto: "",
  height: "",
  weight: "",
  shoulder: "",
  chest: "",
  waist: "",
  hips: "",
  inseam: "",
  unit: "cm",
  styles: [],
  colors: [],
  occasions: [],
  preferredFit: "Regular",
  topsSize: "",
  bottomsSize: "",
  dressSize: "",
  shoeSize: "",
  privateProfile: true,
  privatePhotos: true,
};

const navigation: {
  id: SettingsSection;
  label: string;
  description: string;
  icon: typeof UserRound;
}[] = [
  {
    id: "profile",
    label: "Personal profile",
    description: "Your personal details",
    icon: UserRound,
  },
  {
    id: "measurements",
    label: "Body measurements",
    description: "Your fit profile",
    icon: Ruler,
  },
  {
    id: "photos",
    label: "My photos",
    description: "Manage your pictures",
    icon: Camera,
  },
  {
    id: "style",
    label: "Style preferences",
    description: "Your personal style",
    icon: Palette,
  },
  {
    id: "wardrobe",
    label: "Clothing sizes",
    description: "Your fit and sizes",
    icon: Shirt,
  },
  {
    id: "privacy",
    label: "Privacy & security",
    description: "Manage your privacy",
    icon: ShieldCheck,
  },
];

const styleOptions = [
  "Casual",
  "Minimalist",
  "Corporate",
  "Elegant",
  "Traditional",
  "Streetwear",
  "Sporty",
  "Vintage",
  "Modest",
  "Trendy",
];

const colorOptions = [
  { name: "Black", value: "#171717" },
  { name: "White", value: "#FFFFFF" },
  { name: "Brown", value: "#925C3B" },
  { name: "Beige", value: "#D9C5A5" },
  { name: "Blue", value: "#3B82F6" },
  { name: "Green", value: "#16A34A" },
  { name: "Pink", value: "#EC4899" },
  { name: "Purple", value: "#9333EA" },
  { name: "Red", value: "#DC2626" },
  { name: "Yellow", value: "#EAB308" },
];

const occasionOptions = [
  "Work",
  "Church",
  "Casual outings",
  "Weddings",
  "Date nights",
  "Travel",
  "Parties",
  "Formal events",
];

const fitOptions = ["Slim", "Regular", "Relaxed", "Oversized"];

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-purple-400 focus:ring-4 focus:ring-purple-50"
      />

      {hint && (
        <span className="mt-1.5 block text-xs text-gray-400">{hint}</span>
      )}
    </label>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-7">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-purple-600">
        {eyebrow}
      </p>

      <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        {title}
      </h2>

      <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
        {description}
      </p>
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div>
        <p className="text-sm font-semibold text-gray-800">{label}</p>
        <p className="mt-1 max-w-md text-sm leading-5 text-gray-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition",
          checked ? "bg-purple-600" : "bg-gray-300"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition",
            checked ? "left-[22px]" : "left-0.5"
          )}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("profile");

  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [showMeasurementGuide, setShowMeasurementGuide] = useState(false);

  const profilePhotoInput = useRef<HTMLInputElement>(null);
  const bodyPhotoInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved) as Partial<UserProfile>;

        setProfile({
          ...initialProfile,
          ...parsed,
          styles: Array.isArray(parsed.styles) ? parsed.styles : [],
          colors: Array.isArray(parsed.colors) ? parsed.colors : [],
          occasions: Array.isArray(parsed.occasions)
            ? parsed.occasions
            : [],
        });
      }
    } catch {
      setNotice("We couldn't load your saved settings.");
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!notice) return;

    const timeout = window.setTimeout(() => setNotice(""), 3500);

    return () => window.clearTimeout(timeout);
  }, [notice]);

  function updateProfile<K extends keyof UserProfile>(
    key: K,
    value: UserProfile[K]
  ) {
    setProfile((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function toggleOption(
    key: "styles" | "colors" | "occasions",
    value: string
  ) {
    setProfile((current) => {
      const values = current[key];

      return {
        ...current,
        [key]: values.includes(value)
          ? values.filter((item) => item !== value)
          : [...values, value],
      };
    });
  }

  function handlePhotoUpload(
    event: React.ChangeEvent<HTMLInputElement>,
    type: "profilePicture" | "bodyPhoto"
  ) {
    const file = event.target.files?.[0];

    // Permit selecting the same file again later.
    event.target.value = "";

    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setNotice("Please upload a JPG, PNG, or WebP image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setNotice("Your image must be smaller than 5 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== "string") {
        setNotice("We couldn't preview that image. Please try again.");
        return;
      }

      updateProfile(type, reader.result);
      setNotice(
        type === "profilePicture"
          ? "Profile picture updated. Save your changes to keep it."
          : "Reference photo updated. Save your changes to keep it."
      );
    };

    reader.onerror = () => {
      setNotice("We couldn't read that image. Please try another.");
    };

    reader.readAsDataURL(file);
  }

  function saveSettings() {
    setSaving(true);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      setNotice("Your settings have been saved.");
    } catch {
      setNotice(
        "We couldn't save your settings. Your browser storage may be full."
      );
    } finally {
      setSaving(false);
    }
  }

  function removePhoto(type: "profilePicture" | "bodyPhoto") {
    updateProfile(type, "");
    setNotice("Photo removed. Save your changes to keep this update.");
  }

  const completedFields = [
    profile.fullName,
    profile.username,
    profile.email,
    profile.height,
    profile.profilePicture,
    profile.styles.length > 0 ? "yes" : "",
    profile.occasions.length > 0 ? "yes" : "",
  ].filter(Boolean).length;

  const completion = Math.round((completedFields / 7) * 100);

  if (!loaded) {
    return (
      <main className="min-h-screen bg-[#FFFDF9]">
        <div className="flex min-h-[60vh] items-center justify-center">
          <LoaderCircle className="animate-spin text-purple-600" size={30} />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFFDF9] text-gray-900">

      {/* PAGE HEADER */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                <span>Home</span>
                <ChevronRight size={14} />
                <span className="font-medium text-purple-600">Settings</span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Your personal space
              </h1>

              <p className="mt-2 text-sm text-gray-500 sm:text-base">
                Manage your profile, measurements, and personal style.
              </p>
            </div>

            <button
              type="button"
              onClick={saveSettings}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-100 transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <LoaderCircle size={17} className="animate-spin" />
              ) : (
                <Save size={17} />
              )}
              Save changes
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="grid items-start gap-8 lg:grid-cols-[270px_minmax(0,1fr)]">
          {/* SIDEBAR */}
          <aside className="space-y-5 lg:sticky lg:top-6">
            <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-pink-400 text-xl font-bold text-white">
                  {profile.profilePicture ? (
                    <img
                      src={profile.profilePicture}
                      alt="Your profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    profile.fullName.trim().charAt(0).toUpperCase() || (
                      <UserRound size={25} />
                    )
                  )}
                </div>

                <div className="min-w-0">
                  <p className="truncate font-semibold text-gray-900">
                    {profile.fullName || "Your profile"}
                  </p>
                  <p className="truncate text-sm text-gray-500">
                    {profile.username ? `@${profile.username}` : "Welcome to OutfitLibrary"}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="font-medium text-gray-500">
                    Profile completion
                  </span>
                  <span className="font-bold text-purple-700">
                    {completion}%
                  </span>
                </div>

                <div
                  className="h-2 overflow-hidden rounded-full bg-purple-50"
                  role="progressbar"
                  aria-valuenow={completion}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Profile completion"
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-600 to-pink-500 transition-all"
                    style={{ width: `${completion}%` }}
                  />
                </div>
              </div>
            </div>

            <nav
              aria-label="Settings sections"
              className="flex gap-2 overflow-x-auto rounded-2xl border border-gray-100 bg-white p-2 shadow-sm lg:block lg:space-y-1 lg:overflow-visible"
            >
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = activeSection === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveSection(item.id)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-w-max items-center gap-3 rounded-xl px-3 py-3 text-left transition lg:w-full",
                      active
                        ? "bg-purple-50 text-purple-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                        active
                          ? "bg-purple-100 text-purple-700"
                          : "bg-gray-50 text-gray-500"
                      )}
                    >
                      <Icon size={19} />
                    </span>

                    <span>
                      <span className="block text-sm font-semibold">
                        {item.label}
                      </span>
                      <span className="mt-0.5 hidden text-xs text-gray-400 lg:block">
                        {item.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </nav>

            <div className="hidden rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 p-5 text-white lg:block">
              <Sparkles size={22} />
              <h3 className="mt-4 font-bold">Your style, your way</h3>
              <p className="mt-2 text-sm leading-6 text-white/80">
                Your measurements and preferences can help personalize your
                wardrobe experience.
              </p>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <div className="min-w-0 space-y-6">
            {/* PERSONAL PROFILE */}
            {activeSection === "profile" && (
              <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">
                <SectionHeading
                  eyebrow="Your identity"
                  title="Personal profile"
                  description="Tell us a little about yourself. These details help personalize your OutfitLibrary experience."
                />

                <div className="mb-8 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 p-5 sm:p-6">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-gradient-to-br from-purple-500 to-pink-400 text-3xl font-bold text-white shadow-md">
                      {profile.profilePicture ? (
                        <img
                          src={profile.profilePicture}
                          alt="Profile preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        profile.fullName.trim().charAt(0).toUpperCase() || (
                          <UserRound size={36} />
                        )
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">
                        Your profile picture
                      </h3>
                      <p className="mt-1 text-sm leading-5 text-gray-500">
                        Choose a photo that represents you. JPG, PNG, or WebP,
                        up to 5 MB.
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => profilePhotoInput.current?.click()}
                          className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700"
                        >
                          <Upload size={16} />
                          Upload photo
                        </button>

                        {profile.profilePicture && (
                          <button
                            type="button"
                            onClick={() => removePhoto("profilePicture")}
                            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:border-red-200 hover:text-red-600"
                          >
                            <Trash2 size={15} />
                            Remove
                          </button>
                        )}
                      </div>

                      <input
                        ref={profilePhotoInput}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={(event) =>
                          handlePhotoUpload(event, "profilePicture")
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Full name"
                    value={profile.fullName}
                    onChange={(value) => updateProfile("fullName", value)}
                    placeholder="Enter your full name"
                  />

                  <Field
                    label="Username"
                    value={profile.username}
                    onChange={(value) =>
                      updateProfile("username", value.replace(/^@/, ""))
                    }
                    placeholder="e.g. stylebyada"
                    hint="Your username does not include the @ symbol."
                  />

                  <Field
                    label="Email address"
                    value={profile.email}
                    onChange={(value) => updateProfile("email", value)}
                    placeholder="you@example.com"
                    type="email"
                    hint="Connect this field to your account system before production."
                  />

                  <Field
                    label="Location (optional)"
                    value={profile.location}
                    onChange={(value) => updateProfile("location", value)}
                    placeholder="e.g. Lagos, Nigeria"
                  />
                </div>

                <div className="mt-5">
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-gray-700">
                      Style bio (optional)
                    </span>
                    <textarea
                      value={profile.bio}
                      onChange={(event) =>
                        updateProfile("bio", event.target.value)
                      }
                      rows={4}
                      maxLength={250}
                      placeholder="Tell us about your personal style..."
                      className="w-full resize-y rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-purple-400 focus:ring-4 focus:ring-purple-50"
                    />
                    <span className="mt-1 block text-right text-xs text-gray-400">
                      {profile.bio.length}/250
                    </span>
                  </label>
                </div>
              </section>
            )}

            {/* BODY MEASUREMENTS */}
            {activeSection === "measurements" && (
              <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">
                <SectionHeading
                  eyebrow="Your fit profile"
                  title="Body measurements"
                  description="Add the measurements you're comfortable sharing to help you track fit and personalize clothing recommendations. All measurements are optional."
                />

                <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-purple-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-purple-950">
                      Choose your measurement unit
                    </p>
                    <p className="mt-1 text-sm text-purple-700/70">
                      Use the same unit for all measurements.
                    </p>
                  </div>

                  <div className="flex rounded-xl border border-purple-100 bg-white p-1">
                    {(["cm", "in"] as MeasurementUnit[]).map((unit) => (
                      <button
                        key={unit}
                        type="button"
                        onClick={() => updateProfile("unit", unit)}
                        className={cn(
                          "rounded-lg px-5 py-2 text-sm font-semibold uppercase transition",
                          profile.unit === unit
                            ? "bg-purple-600 text-white shadow-sm"
                            : "text-gray-500 hover:bg-purple-50"
                        )}
                      >
                        {unit}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label={`Height (${profile.unit})`}
                    value={profile.height}
                    onChange={(value) => updateProfile("height", value)}
                    placeholder={profile.unit === "cm" ? "e.g. 168" : "e.g. 66"}
                    type="number"
                    hint="Your height from head to toe."
                  />

                  <Field
                    label="Weight (optional)"
                    value={profile.weight}
                    onChange={(value) => updateProfile("weight", value)}
                    placeholder="Optional"
                    type="number"
                    hint="If you choose to provide it, specify the unit when saving to your backend."
                  />

                  <Field
                    label={`Shoulder width (${profile.unit})`}
                    value={profile.shoulder}
                    onChange={(value) => updateProfile("shoulder", value)}
                    placeholder="Optional"
                    type="number"
                  />

                  <Field
                    label={`Chest / bust (${profile.unit})`}
                    value={profile.chest}
                    onChange={(value) => updateProfile("chest", value)}
                    placeholder="Optional"
                    type="number"
                  />

                  <Field
                    label={`Waist (${profile.unit})`}
                    value={profile.waist}
                    onChange={(value) => updateProfile("waist", value)}
                    placeholder="Optional"
                    type="number"
                  />

                  <Field
                    label={`Hips (${profile.unit})`}
                    value={profile.hips}
                    onChange={(value) => updateProfile("hips", value)}
                    placeholder="Optional"
                    type="number"
                  />

                  <Field
                    label={`Inseam (${profile.unit})`}
                    value={profile.inseam}
                    onChange={(value) => updateProfile("inseam", value)}
                    placeholder="Optional"
                    type="number"
                    hint="Inner leg length, useful for trouser fit."
                  />
                </div>

                <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                  <div className="flex gap-3">
                    <CircleHelp
                      size={20}
                      className="mt-0.5 shrink-0 text-blue-600"
                    />
                    <div>
                      <h3 className="font-semibold text-blue-950">
                        Need help measuring yourself?
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-blue-800/80">
                        Use a flexible measuring tape. Keep it comfortably
                        against your body without pulling it too tight.
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          setShowMeasurementGuide((current) => !current)
                        }
                        className="mt-3 text-sm font-bold text-blue-700 underline underline-offset-4"
                      >
                        {showMeasurementGuide
                          ? "Hide measurement guide"
                          : "Show measurement guide"}
                      </button>
                    </div>
                  </div>

                  {showMeasurementGuide && (
                    <div className="mt-4 space-y-3 border-t border-blue-100 pt-4 text-sm leading-6 text-blue-950">
                      <p>
                        <strong>Height:</strong> Stand upright against a wall
                        and measure from the floor to the top of your head.
                      </p>
                      <p>
                        <strong>Shoulders:</strong> Measure across the back
                        from one shoulder point to the other.
                      </p>
                      <p>
                        <strong>Chest / bust:</strong> Measure around the
                        fullest part of your chest or bust.
                      </p>
                      <p>
                        <strong>Waist:</strong> Measure around your natural
                        waist, keeping the tape comfortably snug.
                      </p>
                      <p>
                        <strong>Hips:</strong> Measure around the fullest part
                        of your hips.
                      </p>
                      <p>
                        <strong>Inseam:</strong> Measure from the top of your
                        inner thigh to the ankle, or use a well-fitting pair of
                        trousers as a reference.
                      </p>
                      <p className="text-blue-700">
                        These are general guidelines. For garment sizing,
                        follow the measurement instructions provided by the
                        relevant clothing brand.
                      </p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* PHOTOS */}
            {activeSection === "photos" && (
              <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">
                <SectionHeading
                  eyebrow="Your visual profile"
                  title="My photos"
                  description="Manage your profile picture and optional full-body reference photo. Your reference photo is not required to use OutfitLibrary."
                />

                <div className="grid gap-6 md:grid-cols-2">
                  {/* PROFILE PHOTO */}
                  <div className="rounded-2xl border border-gray-100 p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-50 text-pink-600">
                        <UserRound size={21} />
                      </div>
                      <div>
                        <h3 className="font-bold">Profile picture</h3>
                        <p className="text-xs text-gray-500">
                          Your personal avatar
                        </p>
                      </div>
                    </div>

                    <div className="my-5 flex justify-center">
                      <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border-4 border-purple-50 bg-gray-50">
                        {profile.profilePicture ? (
                          <img
                            src={profile.profilePicture}
                            alt="Your profile picture"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <UserRound size={42} className="text-gray-300" />
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => profilePhotoInput.current?.click()}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold transition hover:border-purple-300 hover:bg-purple-50"
                    >
                      <Upload size={16} />
                      {profile.profilePicture ? "Replace picture" : "Upload picture"}
                    </button>

                    {profile.profilePicture && (
                      <button
                        type="button"
                        onClick={() => removePhoto("profilePicture")}
                        className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50"
                      >
                        <Trash2 size={15} />
                        Remove picture
                      </button>
                    )}
                  </div>

                  {/* BODY PHOTO */}
                  <div className="rounded-2xl border border-gray-100 p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                        <Camera size={21} />
                      </div>
                      <div>
                        <h3 className="font-bold">Full-body reference</h3>
                        <p className="text-xs text-gray-500">
                          Optional styling reference
                        </p>
                      </div>
                    </div>

                    <div className="my-5 flex h-52 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50">
                      {profile.bodyPhoto ? (
                        <img
                          src={profile.bodyPhoto}
                          alt="Full-body reference"
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <div className="px-5 text-center">
                          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                            <Camera size={23} />
                          </div>
                          <p className="mt-3 text-sm font-semibold text-gray-700">
                            Add your reference photo
                          </p>
                          <p className="mt-1 text-xs leading-5 text-gray-400">
                            A full-length image with good lighting works best.
                          </p>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => bodyPhotoInput.current?.click()}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
                    >
                      <Upload size={16} />
                      {profile.bodyPhoto ? "Replace photo" : "Upload reference photo"}
                    </button>

                    {profile.bodyPhoto && (
                      <button
                        type="button"
                        onClick={() => removePhoto("bodyPhoto")}
                        className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50"
                      >
                        <Trash2 size={15} />
                        Remove reference photo
                      </button>
                    )}
                  </div>
                </div>

                <input
                  ref={profilePhotoInput}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(event) =>
                    handlePhotoUpload(event, "profilePicture")
                  }
                />

                <input
                  ref={bodyPhotoInput}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(event) => handlePhotoUpload(event, "bodyPhoto")}
                />

                <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 p-4">
                  <div className="flex gap-3">
                    <ShieldCheck
                      size={20}
                      className="mt-0.5 shrink-0 text-amber-700"
                    />
                    <div>
                      <p className="text-sm font-semibold text-amber-950">
                        Your photos deserve privacy
                      </p>
                      <p className="mt-1 text-sm leading-6 text-amber-900/75">
                        In this prototype, images are saved in your browser.
                        This is not secure cloud storage. Before launching,
                        connect private image storage and enforce access
                        controls on the server.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* STYLE PREFERENCES */}
            {activeSection === "style" && (
              <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">
                <SectionHeading
                  eyebrow="Your aesthetic"
                  title="Style preferences"
                  description="Choose the styles, colours, and occasions that reflect your personality. You can change these whenever you like."
                />

                <div>
                  <h3 className="font-bold text-gray-900">Your style</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Select as many as you like.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {styleOptions.map((style) => {
                      const selected = profile.styles.includes(style);

                      return (
                        <button
                          key={style}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => toggleOption("styles", style)}
                          className={cn(
                            "rounded-full border px-4 py-2.5 text-sm font-medium transition",
                            selected
                              ? "border-purple-600 bg-purple-600 text-white"
                              : "border-gray-200 bg-white text-gray-600 hover:border-purple-300 hover:bg-purple-50"
                          )}
                        >
                          {selected && (
                            <Check size={14} className="mr-1 inline" />
                          )}
                          {style}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="my-8 h-px bg-gray-100" />

                <div>
                  <h3 className="font-bold text-gray-900">Favourite colours</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Choose colours you enjoy wearing.
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
                    {colorOptions.map((color) => {
                      const selected = profile.colors.includes(color.name);

                      return (
                        <button
                          key={color.name}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => toggleOption("colors", color.name)}
                          className={cn(
                            "flex items-center gap-2 rounded-xl border p-3 text-sm transition",
                            selected
                              ? "border-purple-400 bg-purple-50 ring-2 ring-purple-100"
                              : "border-gray-100 hover:border-gray-300"
                          )}
                        >
                          <span
                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-black/10"
                            style={{ backgroundColor: color.value }}
                          >
                            {selected && (
                              <Check
                                size={14}
                                className={
                                  ["White", "Yellow", "Beige"].includes(
                                    color.name
                                  )
                                    ? "text-gray-900"
                                    : "text-white"
                                }
                              />
                            )}
                          </span>
                          <span className="truncate">{color.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="my-8 h-px bg-gray-100" />

                <div>
                  <h3 className="font-bold text-gray-900">
                    Where do you dress up for?
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Help us personalize outfit ideas for your life.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {occasionOptions.map((occasion) => {
                      const selected = profile.occasions.includes(occasion);

                      return (
                        <button
                          key={occasion}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => toggleOption("occasions", occasion)}
                          className={cn(
                            "rounded-xl border px-4 py-3 text-sm font-medium transition",
                            selected
                              ? "border-pink-300 bg-pink-50 text-pink-700"
                              : "border-gray-200 text-gray-600 hover:border-pink-200 hover:bg-pink-50"
                          )}
                        >
                          {occasion}
                          {selected && (
                            <Check size={14} className="ml-2 inline" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </section>
            )}

            {/* CLOTHING SIZES */}
            {activeSection === "wardrobe" && (
              <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">
                <SectionHeading
                  eyebrow="Your fit"
                  title="Clothing sizes"
                  description="Save your usual sizes as a reference for wardrobe organization and future shopping recommendations."
                />

                <div className="mb-6 flex items-start gap-3 rounded-2xl bg-pink-50 p-4">
                  <Heart
                    size={20}
                    className="mt-0.5 shrink-0 text-pink-600"
                  />
                  <p className="text-sm leading-6 text-pink-900/80">
                    Clothing sizes vary by brand and region. These fields are
                    your personal reference, not a guarantee that every item
                    will fit the same way.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Tops"
                    value={profile.topsSize}
                    onChange={(value) => updateProfile("topsSize", value)}
                    placeholder="e.g. S, M, L, XL"
                  />

                  <Field
                    label="Bottoms / trousers"
                    value={profile.bottomsSize}
                    onChange={(value) => updateProfile("bottomsSize", value)}
                    placeholder="e.g. UK 12 or waist size"
                  />

                  <Field
                    label="Dresses"
                    value={profile.dressSize}
                    onChange={(value) => updateProfile("dressSize", value)}
                    placeholder="e.g. UK 12"
                  />

                  <Field
                    label="Shoes"
                    value={profile.shoeSize}
                    onChange={(value) => updateProfile("shoeSize", value)}
                    placeholder="e.g. EU 39"
                  />
                </div>

                <div className="mt-8">
                  <h3 className="font-bold text-gray-900">
                    Preferred clothing fit
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    How do you usually like your clothes to fit?
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {fitOptions.map((fit) => {
                      const selected = profile.preferredFit === fit;

                      return (
                        <button
                          key={fit}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => updateProfile("preferredFit", fit)}
                          className={cn(
                            "rounded-2xl border p-4 text-center transition",
                            selected
                              ? "border-purple-400 bg-purple-50 text-purple-700 ring-2 ring-purple-100"
                              : "border-gray-200 text-gray-600 hover:border-purple-200"
                          )}
                        >
                          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50">
                            <Shirt size={23} />
                          </div>
                          <span className="text-sm font-semibold">{fit}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </section>
            )}

            {/* PRIVACY */}
            {activeSection === "privacy" && (
              <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">
                <SectionHeading
                  eyebrow="Your information"
                  title="Privacy & security"
                  description="Control how your profile and photos should be handled. These switches demonstrate the interface; real access restrictions must also be enforced by your backend."
                />

                <div className="divide-y divide-gray-100">
                  <Toggle
                    checked={profile.privateProfile}
                    onChange={(value) =>
                      updateProfile("privateProfile", value)
                    }
                    label="Private profile"
                    description="Keep your profile private by default. Only authenticated, authorized access should reveal your personal details."
                  />

                  <Toggle
                    checked={profile.privatePhotos}
                    onChange={(value) =>
                      updateProfile("privatePhotos", value)
                    }
                    label="Keep my photos private"
                    description="Your profile and full-body photos should not be publicly accessible without your permission."
                  />
                </div>

                <div className="my-7 h-px bg-gray-100" />

                <div className="rounded-2xl border border-gray-200 p-5">
                  <div className="flex gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <ShieldCheck size={22} />
                    </div>
                    <div>
                      <h3 className="font-bold">Your personal information</h3>
                      <p className="mt-2 text-sm leading-6 text-gray-500">
                        Body measurements and reference photos should be
                        collected only when needed. Keep them private, explain
                        how they will be used, and provide a way to delete
                        them.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 p-5">
                  <h3 className="font-bold text-red-800">Remove personal data</h3>
                  <p className="mt-2 text-sm leading-6 text-red-700/80">
                    This prototype stores settings in this browser. You can
                    remove its saved settings below. A production account
                    deletion feature must also delete the relevant server
                    records and stored images.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      const confirmed = window.confirm(
                        "Remove all OutfitLibrary settings saved in this browser? This cannot be undone."
                      );

                      if (!confirmed) return;

                      localStorage.removeItem(STORAGE_KEY);
                      setProfile(initialProfile);
                      setNotice("Browser settings have been cleared.");
                    }}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                  >
                    <Trash2 size={16} />
                    Clear saved settings
                  </button>
                </div>
              </section>
            )}

            {/* SAVE BAR */}
            <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <Check size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Keep your profile up to date
                  </p>
                  <p className="text-xs text-gray-500">
                    Remember to save after making changes.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={saveSettings}
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:opacity-60"
              >
                {saving ? (
                  <LoaderCircle size={17} className="animate-spin" />
                ) : (
                  <Save size={17} />
                )}
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* NOTIFICATION */}
      {notice && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 z-[120] flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-4 shadow-xl"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <Check size={18} />
          </div>

          <p className="flex-1 text-sm font-medium text-gray-700">{notice}</p>

          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss notification"
            className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={17} />
          </button>
        </div>
      )}
    </main>
  );
}