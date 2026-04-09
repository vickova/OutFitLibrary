"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function AuthPage() {
  const [tab, setTab] = useState("signup");

  const containerRef = useRef<HTMLDivElement | null>(null);
  const orbitRef = useRef<HTMLDivElement | null>(null);
  const orbitItemsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    const orbitEl = orbitRef.current;
    const containerEl = containerRef.current;

    if (!orbitEl || !containerEl) return;

    const ctx = gsap.context(() => {
      const items = orbitItemsRef.current;

      // Intro animation
      gsap.from(orbitEl, {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      // Floating animation
      gsap.to(orbitEl, {
        y: 10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Orbit rotation
      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "none" },
      });

      tl.to(orbitEl, {
        rotate: 360,
        duration: 18,
        transformOrigin: "50% 50%",
      });

      tl.to(
        items,
        {
          rotate: -360,
          duration: 18,
          transformOrigin: "50% 50%",
        },
        0
      );

      // Hover pause
      const handleEnter = () => tl.pause();
      const handleLeave = () => tl.resume();

      orbitEl.addEventListener("mouseenter", handleEnter);
      orbitEl.addEventListener("mouseleave", handleLeave);

      // Mouse parallax
      const handleMove = (e: MouseEvent) => {
        const rect = containerEl.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(orbitEl, {
          x: x * 20,
          y: y * 20,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      containerEl.addEventListener("mousemove", handleMove);

      return () => {
        orbitEl.removeEventListener("mouseenter", handleEnter);
        orbitEl.removeEventListener("mouseleave", handleLeave);
        containerEl.removeEventListener("mousemove", handleMove);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen w-full flex bg-[#FFF8F0] overflow-hidden">

      {/* LEFT SECTION */}
      <div
        ref={containerRef}
        className="hidden lg:flex w-1/2 min-h-screen relative overflow-hidden bg-gradient-to-br from-[#046A38] to-[#022e1f]"
      >

        {/* 🌙 HALF MOON ORBIT */}
        <div className="absolute -left-[140px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] overflow-hidden">

          <div ref={orbitRef} className="relative w-full h-full rounded-full">

            {/* Glow layers */}
            <div className="absolute inset-0 rounded-full bg-[#046A38]/30"></div>
            <div className="absolute inset-0 rounded-full bg-white/10"></div>

            {/* Orbit Items */}
            {[
              "/images/green-gown.png",
              "/images/red-gown.png",
              "/images/ofi-gown.png",
              "/images/Top.jpg",
              "/images/Jean.jpg",
              "/images/purse.jpg",
            ].map((src, i) => (
              <div
                key={i}
                ref={(el) => {
                  if (el) orbitItemsRef.current[i] = el;
                }}
                className="absolute w-20 h-20 rounded-xl overflow-hidden shadow-2xl 
                           hover:scale-125 transition-transform duration-300 cursor-pointer"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `rotate(${i * 60}deg) translate(140px) rotate(-${i * 60}deg)`
                }}
              >
                <img
                  src={src}
                  className="w-full h-[150px] object-cover"
                  alt="fashion item"
                />
              </div>
            ))}
          </div>
        </div>
          <img
            src="/images/green-gown.png"
            className="w-[400px] h-full z-40 ml-20"
            alt="fashion item"
          />
        {/* TEXT */}
        <div className="absolute bottom-10 top-[50%] left-10 text-white max-w-md z-50">
          <h2 className="text-4xl font-bold mb-4">
            Your AI Wardrobe Assistant
          </h2>
          <p className="text-lg opacity-90">
            Upload your wardrobe and get AI powered outfit
            recommendations for weddings, work, and everyday style.
          </p>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 min-h-screen px-8">

        <div className="w-full max-w-md">

          {/* Logo */}
          <img
            src="/images/logo-1.png"
            className="h-14 mb-6"
            alt="Outfit Library"
          />

          {/* Tabs */}
          <div className="flex border rounded-lg overflow-hidden mb-6">
            <button
              onClick={() => setTab("login")}
              className={`flex-1 py-3 font-medium ${
                tab === "login"
                  ? "bg-[#D7263D] text-white"
                  : "bg-gray-100"
              }`}
            >
              Sign In
            </button>

            <button
              onClick={() => setTab("signup")}
              className={`flex-1 py-3 font-medium ${
                tab === "signup"
                  ? "bg-[#D7263D] text-white"
                  : "bg-gray-100"
              }`}
            >
              Register
            </button>
          </div>

          {/* SIGNUP */}
          {tab === "signup" && (
            <form className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#046A38]" />
              <input type="email" placeholder="Email" className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#046A38]" />
              <input type="password" placeholder="Password" className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#046A38]" />
              <button className="w-full bg-[#046A38] hover:bg-[#034E2A] text-white py-3 rounded-lg font-semibold">
                Create Account
              </button>

              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <span
                  className="text-[#D7263D] cursor-pointer"
                  onClick={() => setTab("login")}
                >
                  Sign in
                </span>
              </p>
            </form>
          )}

          {/* LOGIN */}
          {tab === "login" && (
            <form className="space-y-4">
              <input type="email" placeholder="Email" className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#046A38]" />
              <input type="password" placeholder="Password" className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#046A38]" />

              <div className="flex justify-between text-sm text-gray-600">
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Remember me
                </label>
                <span className="text-[#D7263D] cursor-pointer">
                  Forgot password?
                </span>
              </div>

              <button className="w-full bg-[#046A38] hover:bg-[#034E2A] text-white py-3 rounded-lg font-semibold">
                Sign In
              </button>
            </form>
          )}

          {/* Footer */}
          <p className="text-center text-xs text-gray-500 mt-8">
            © 2025 Outfit Library
          </p>

        </div>
      </div>
    </div>
  );
}