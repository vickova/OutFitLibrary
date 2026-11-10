
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Shirt,
  Sparkles,
  CalendarDays,
  UsersRound,
  ShoppingBag,
  Palette,
  History,
  Settings,
  CircleHelp,
  Menu,
  X,
  ChevronRight,
  Heart,
} from "lucide-react";

const navigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Wardrobe",
    href: "/dashboard/wardrobe",
    icon: Shirt,
  },
  {
    label: "Outfit Planner",
    href: "/dashboard/stylist",
    icon: Sparkles,
  },
  {
    label: "Calendar",
    href: "/dashboard/calendar",
    icon: CalendarDays,
  },
  {
    label: "Family",
    href: "/dashboard/family",
    icon: UsersRound,
  },
  {
    label: "Shopping",
    href: "/dashboard/shopping",
    icon: ShoppingBag,
  },
  {
    label: "Outfit History",
    href: "/dashboard/history",
    icon: History,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard" || pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={mobileOpen}
        className="fixed left-4 top-4 z-[70] flex h-10 w-10 items-center
          justify-center rounded-xl border border-pink-100 bg-white
          text-gray-800 shadow-md transition hover:bg-pink-50 lg:hidden"
      >
        {mobileOpen ? <X size={21} /> : <Menu size={21} />}
      </button>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeMobileMenu}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col
          border-r border-purple-100/70 bg-white
          transition-transform duration-300 ease-in-out
          lg:sticky lg:top-0 lg:z-30 lg:h-screen lg:translate-x-0
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
      >
        {/* Logo */}
        <Link
          href="/dashboard"
          onClick={closeMobileMenu}
          className="flex h-[76px] shrink-0 items-center gap-2.5
            border-b border-purple-50 px-5"
        >
          <div
            className="flex h-10 w-10 items-center justify-center
              rounded-2xl bg-gradient-to-br from-fuchsia-500
              via-purple-500 to-orange-400 text-white shadow-md
              shadow-purple-200"
          >
            <Shirt size={22} strokeWidth={2.5} />
          </div>

          <span className="text-[19px] font-extrabold tracking-tight text-gray-900">
            Outfit<span className="text-fuchsia-600">Library</span>
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-6">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
            Your Style Space
          </p>

          <nav className="space-y-1.5" aria-label="Main navigation">
            {navigation.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  aria-current={active ? "page" : undefined}
                  className={`group relative flex items-center gap-3
                    rounded-xl px-3 py-3 text-[13px] font-semibold
                    transition-all duration-200 ${
                      active
                        ? "bg-gradient-to-r from-pink-100 via-fuchsia-50 to-purple-50 text-fuchsia-700 shadow-sm"
                        : "text-gray-500 hover:bg-purple-50 hover:text-purple-700"
                    }`}
                >
                  {active && (
                    <span
                      className="absolute bottom-2 left-0 top-2 w-[3px]
                        rounded-r-full bg-gradient-to-b
                        from-pink-500 to-purple-600"
                    />
                  )}

                  <Icon
                    size={19}
                    strokeWidth={active ? 2.4 : 1.8}
                    className={`shrink-0 transition-transform duration-200
                      ${
                        active
                          ? "text-fuchsia-600"
                          : "text-gray-400 group-hover:scale-110 group-hover:text-purple-600"
                      }`}
                  />

                  <span className="flex-1">{item.label}</span>

                  {active && (
                    <ChevronRight
                      size={15}
                      className="text-fuchsia-500"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Family plan promotion */}
          <div className="relative mt-8 overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-400 p-4 text-white">
            <div className="absolute -right-5 -top-5 h-20 w-20 rounded-full bg-white/15" />
            <div className="absolute -bottom-7 -left-4 h-20 w-20 rounded-full bg-orange-300/30" />

            <div className="relative">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <Heart size={19} fill="white" />
              </div>

              <p className="text-sm font-bold">Style together!</p>

              <p className="mt-1 text-[11px] leading-relaxed text-white/85">
                Coordinate outfits and plan special moments with your family.
              </p>

              <Link
                href="/dashboard/family"
                onClick={closeMobileMenu}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-3 py-2.5 text-xs font-bold text-fuchsia-700 shadow-sm transition hover:bg-pink-50"
              >
                Explore Family Plan
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom navigation and profile */}
        <div className="shrink-0 border-t border-purple-50 px-3 py-4">
          <Link
            href="/dashboard/settings"
            onClick={closeMobileMenu}
            className={`mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition ${
              isActive("/dashboard/settings")
                ? "bg-purple-50 text-purple-700"
                : "text-gray-500 hover:bg-purple-50 hover:text-purple-700"
            }`}
          >
            <Settings size={18} />
            Settings
          </Link>

          <Link
            href="/dashboard/help-support"
            onClick={closeMobileMenu}
            className="mb-4 flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-gray-500 transition hover:bg-purple-50 hover:text-purple-700"
          >
            <CircleHelp size={18} />
            Help & Support
          </Link>

          <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-300 via-pink-400 to-purple-500 text-sm font-bold text-white ring-2 ring-white">
              V
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-gray-800">
                Your Profile
              </p>
              <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[9px] font-bold text-fuchsia-600 shadow-sm">
                <Heart size={10} fill="currentColor" />
                Family Plan
              </span>
            </div>

            <Link
              href="/dashboard/settings"
              onClick={closeMobileMenu}
              aria-label="Manage profile settings"
              className="rounded-lg p-1.5 text-gray-400 transition hover:bg-white hover:text-purple-600"
            >
              <ChevronRight size={17} />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
