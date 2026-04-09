"use client";

import Link from "next/link";
import Navbar from "./Navbar";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Home() {
  const container = useRef(null);

  const titleRef = useRef<HTMLHeadingElement | null>(null);
const textRef = useRef<HTMLParagraphElement | null>(null);
const buttonsRef = useRef<HTMLDivElement | null>(null);
const imageRef = useRef<HTMLDivElement | null>(null);
const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    // HERO ANIMATION
    const tl = gsap.timeline();

    tl.from(titleRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })
      .from(textRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
      }, "-=0.5")
      .from(buttonsRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
      }, "-=0.5");

    // IMAGE ANIMATION
    gsap.from(imageRef.current, {
      x: 100,
      opacity: 0,
      duration: 1.2,
      delay: 0.5,
    });

    // SCROLL ANIMATIONS
    gsap.utils.toArray(".fade-section").forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 80,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      });
    });

  }, { scope: container });

  return (
    <div ref={container} className="min-h-screen bg-[#FFF8F0] text-gray-800 font-sans">

      {/* HERO SECTION */}
      <section className="px-8 lg:px-20 py-10 flex flex-col lg:flex-row justify-between gap-16 relative overflow-hidden h-[120vh]">

        <div className="absolute left-0 top-0 w-full md:w-[50%] h-full md:h-[70%] opacity-20 bg-[#D7263D]" />

        <div className="relative z-10 h-full w-full md:w-[50%]">
          <Navbar />

          <div className="my-10">
            <h1
              ref={titleRef}
              className="text-5xl font-extrabold leading-tight my-10 text-[#046A38]"
            >
              Your Wardrobe, <br />
              <span className="text-[#D7263D]">
                Your Style Assistant.
              </span>
            </h1>

            <p
              ref={textRef}
              className="text-gray-700 mb-8 max-w-lg text-lg"
            >
              Upload your wardrobe and let AI recommend outfits for any event effortlessly.
            </p>

            <div ref={buttonsRef} className="flex gap-10 mt-8">
              <button className="bg-[#D7263D] text-white font-bold px-6 py-3 rounded-[50px] hover:bg-[#B81F33] transition">
                Find Your Next Outfit
              </button>

              <button className="bg-[#046A38] text-white font-bold px-6 py-3 rounded-[50px] hover:bg-[#034E2A] transition">
                Upload Wardrobe
              </button>
            </div>
          </div>
        </div>

        {/* IMAGE */}
        <div className="relative w-[35%] h-[80%]">
          <Link href="/signup">
            <button className="hidden md:block absolute right-[-6] px-5 py-2 rounded-lg shadow hover:bg-[#B81F33] transition">
              Sign Up
            </button>
          </Link>

          <div
            ref={imageRef}
            className="hidden md:block absolute right-5 w-full inset-0 bg-yellow-400 rounded-tl-[60%] rounded-tr-[60%]"
          >
            <img
              src="/images/hero2.png"
              alt="Event Outfits"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="fade-section w-full bg-black text-white px-8 lg:px-20 py-20">
        <h2 className="text-3xl font-bold mb-6">Our Story & Purpose</h2>
        <p className="text-gray-300 max-w-2xl">
          Outfit Library helps you dress with confidence and remove the stress of choosing outfits.
        </p>
      </section>

      {/* DIGITAL WARDROBE */}
      <section className="fade-section w-full px-8 lg:px-20 py-16 bg-green-50">
        <h2 className="text-3xl font-bold mb-6">Your Digital Wardrobe</h2>
      </section>

      {/* AI STYLING */}
      <section className="fade-section px-8 lg:px-20 py-20">
        <h2 className="text-3xl font-bold mb-6">
          AI Styling Engine
        </h2>
      </section>

      {/* TESTIMONIALS */}
      <section className="fade-section px-8 lg:px-20 py-20 bg-[#F7EFE8]">
        <h2 className="text-3xl font-bold mb-6">
          What Our Users Say
        </h2>
      </section>

    </div>
  );
}