"use client";
import Link from "next/link";
import Navbar from "./Navbar";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);


export default function Home() {

  // ✅ FIXED TYPES
  const container = useRef<HTMLDivElement | null>(null);

  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  const storySectionRef = useRef<HTMLElement | null>(null);
const storyContentRef = useRef<HTMLDivElement | null>(null);
const orbitRef = useRef<HTMLDivElement | null>(null);
const orbitItemsRef = useRef<HTMLDivElement[]>([]);

const carouselRef = useRef<HTMLDivElement | null>(null);

const testimonials = [
  { name: "Chinwe", quote: "I stopped stressing about what to wear!", image: "/images/profile-picture.jpg" },
  { name: "Tobi", quote: "The AI styling changed my Sundays!", image: "/images/profile-picture2.jpg" },
  { name: "Amara", quote: "I feel confident and stylish every day!", image: "/images/profile-picture3.jpg" },
  { name: "Seyi", quote: "Outfit Library is a game-changer!", image: "/images/profile-picture1.jpg" },
  { name: "Ada", quote: "Now picking outfits is effortless!", image: "/images/profile-picture.jpg" },
];

   useGSAP(() => {

    // HERO
    const tl = gsap.timeline();
    tl.from(".hero-title", { y: 120, opacity: 0, duration: 1 })
      .from(".hero-text", { y: 60, opacity: 0 }, "-=0.6")
      .from(".hero-buttons", { y: 40, opacity: 0 }, "-=0.6")
      .from(".hero-image", { x: 100, opacity: 0 }, "-=1");

    // FADE SECTIONS
    gsap.utils.toArray<HTMLElement>(".fade-section").forEach((section) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      });

      tl.from(section.querySelector(".section-title"), {
        y: 80,
        opacity: 0,
      })
        .from(section.querySelectorAll(".section-text"), {
          y: 40,
          opacity: 0,
          stagger: 0.2,
        }, "-=0.4")
        .from(section.querySelectorAll(".card"), {
          y: 60,
          opacity: 0,
          stagger: 0.2,
        }, "-=0.4");
    });

    // STORY PIN
    if (storySectionRef.current && storyContentRef.current) {
      const content = storyContentRef.current.firstElementChild;
      gsap.fromTo(content,
        { y: 0 },
        {
          y: -300,
          scrollTrigger: {
            trigger: storySectionRef.current,
            start: "top top",
            end: "+=600",
            scrub: true,
            pin: true,
          },
        }
      );
    }

    // ORBIT
    if (orbitRef.current && orbitItemsRef.current.length) {
      const orbitTL = gsap.timeline({ repeat: -1 });

      orbitTL.to(orbitRef.current, { rotate: 360, duration: 20, ease: "none" })
        .to(orbitItemsRef.current, { rotate: -360, duration: 20, ease: "none" }, 0);

      orbitRef.current.addEventListener("mouseenter", () => orbitTL.pause());
      orbitRef.current.addEventListener("mouseleave", () => orbitTL.resume());
    }

    // AI CARDS
    gsap.from(".ai-feature-card", {
      y: 60,
      opacity: 0,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".ai-section",
        start: "top 80%",
      },
    });

    // FLOATING CARDS (FIXED)
gsap.utils.toArray<HTMLElement>(".ai-card").forEach((card, i) => {
  gsap.to(card, {
    y: i % 2 === 0 ? -15 : 15,   // alternate up/down
    x: i % 2 === 0 ? 10 : -10,   // slight side movement
    rotation: i % 2 === 0 ? 3 : -3,
    duration: 2 + i * 0.3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
});

    // CAROUSEL
    if (carouselRef.current) {
      const carousel = carouselRef.current;
      const items = Array.from(carousel.children);

      items.forEach((item) => {
        const clone = item.cloneNode(true);
        carousel.appendChild(clone);
      });

      const totalWidth = Array.from(carousel.children).reduce(
        (sum: number, el: any) => sum + el.offsetWidth + 24,
        0
      );

      const anim = gsap.to(carousel, {
        x: `-=${totalWidth}`,
        duration: 30,
        repeat: -1,
        ease: "linear",
      });

      carousel.addEventListener("mouseenter", () => anim.pause());
      carousel.addEventListener("mouseleave", () => anim.resume());
    }

    ScrollTrigger.refresh();

  }, { scope: container });
  
  return (
    <div className="min-h-screen bg-[#FFF8F0] text-gray-800 font-sans">


      {/* HERO SECTION 1 */}
      <section ref={container} className="px-8 lg:px-20 py-10 flex flex-col lg:flex-row justify-between gap-16 relative overflow-hidden h-[120vh]">

        {/* Soft Background Pattern */}
        <div className="absolute left-0 top-0 w-full md:w-[50%] h-full md:h-[70%] opacity-20 bg-[#D7263D]"/>
          <div className="relative z-10 h-full w-full md:w-[50%]">
            <Navbar />
            <div className="my-10">
              <h1 className="hero-title text-5xl lg:text-5xl font-extrabold leading-tight my-10 text-[#046A38]">
                Your Wardrobe, <br />
                <span className="text-[#D7263D]">Your Style Assistant.</span>
              </h1>

              <p className="hero-text text-gray-700 mb-8 max-w-lg text-lg">
                Upload your wardrobe and let AI recommend outfits for any event effortlessly.
              </p>

              <div className="hero-buttons flex gap-10 mt-8">
                <Link href={'/wardrobe'}>
                  <button className="mb-5 hidden md:block bg-[#D7263D] text-grey font-bold px-6 py-2 md:py-3 rounded-[50px] shadow hover:bg-[#B81F33] transition outline-2 outline-[#D7263D] outline-offset-4">
                    Find Your Next Outfit
                  </button>
                </Link>

                <Link href={'/stylist'}>
                  <button className="mb-5 bg-[#046A38] text-grey font-bold px-6 py-2 md:py-3 rounded-[50px] shadow hover:bg-[#034E2A] transition outline-2 outline-[#046A38] outline-offset-4">
                    Upload Wardrobe
                  </button>
                </Link>
              </div>
            </div>
        </div>
        <div className="absolute left-0 bottom-0 z-10 h-[30%] py-2 w-full md:w-[50%] bg-[rgba(4,106,56,0.2)] flex items-center gap-4 p-4">
        <p className="rotate-90 text-grey">
            Trending Outfits
          </p>
          <div className="flex gap-4 justify-center items-center">
            <div className="w-30">
              <img src="/images/trend1.png" alt="Trending Outfit 1" className="w-full rounded-tl-[40%] rounded-tr-[40%]" />
            </div>
            <div className="w-30">
              <img src="/images/trend5.png" alt="Trending Outfit 2" className="w-full" />
            </div>
            <div className="w-30">
              <img src="/images/trend4.png" alt="Trending Outfit 3" className="w-full" />
            </div>
          </div>
        </div>

        <div className="relative w-[35%] h-[80%]">
          <Link href="/signup" className="">
            <button className="md:block hidden absolute right-[-6] text-grey px-5 py-2 rounded-lg shadow hover:bg-[#B81F33] transition">
              Sign Up
            </button>
          </Link>
          <div className="hero-image hidden md:block md:absolute right-5 z-99 w-[100%] inset-0 bg-yellow-400 rounded-tl-[60%] rounded-tr-[60%]">
            <img
              src="/images/hero2.png"
              alt="Event Outfits"
              className="object-cover"
            />
          </div>
          <div className="hidden md:block relative md:absolute right-5 z-10 inset-4 w-[100%] h-full bg-[#D7263D] rounded-tl-[60%] rounded-tr-[60%]">
          </div>
        </div>
      </section>

        {/* Brand Story & Purpose Section */}
      <section 
          ref={storySectionRef}
          className="fade-section w-full bg-black text-white px-0 lg:px-20 py-20 flex flex-col lg:flex-row items-center gap-10"
        >
          {/* Image */}
          <div className="lg:w-[30%] w-[80%] border-[#D7263D] border-4 rounded-lg p-1">
            <img src="/images/Outfit1.jpg" alt="Vedora Hat" />
          </div>

          {/* Content Container */}
          <div className="mx-auto text-center lg:w-[50%] w-[80%] relative overflow-hidden rounded-xl">

            {/* Background Video */}
            <video
              className="absolute inset-0 w-full h-full object-cover opacity-50"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="https://v1.pinimg.com/videos/mc/720p/d5/7a/c6/d57ac6c2bacf231bf1c9f8a5b5ab34f1.mp4" type="video/mp4" />
            </video>

            {/* SCROLLABLE CONTENT */}
            <div
              ref={storyContentRef}
              className="relative z-10 p-10 text-white h-[450px] overflow-hidden"
            >
              {/* 👇 THIS WRAPPER IS IMPORTANT */}
              <div className="space-y-6">

                <h2 className=" hero-text text-3xl lg:text-4xl font-bold mb-6">
                  Our Story & Purpose
                </h2>

                <p className="hero-text text-gray-300 leading-relaxed text-lg bg-[rgba(222,221,221,0.1)] p-8 rounded-lg">
                  Outfit Library was created to help people dress with confidence, 
                  without the stress of “What should I wear?”  
                  Whether it’s a wedding, birthday, office event, or a casual outing, 
                  we believe choosing the right outfit should feel effortless.
                </p>

                <p className="hero-text text-gray-300 leading-relaxed text-lg bg-[rgba(222,221,221,0.1)] p-8 rounded-lg">
                  Beyond styling, we help you organize your wardrobe digitally, making it easier to keep track of what you own, what you love, and what to wear next.
                </p>

                <p className="hero-text text-gray-300 leading-relaxed text-lg bg-[rgba(222,221,221,0.1)] p-8 rounded-lg">
                  With AI-powered recommendations, Outfit Library becomes your personal stylist,  
                  guiding you with outfit ideas, color suggestions, and event-ready looks tailored just for you.
                </p>

              </div>
            </div>
          </div>
        </section>
      {/* Digital Wardrobe Preview Section */}
    <section className="fade-section relative w-full px-8 lg:px-20 py-16 bg-green-50 overflow-hidden">
  
      {/* 🔥 FLOATING ORBIT (TOP RIGHT) */}
      <div 
          ref={orbitRef}
          className="hidden lg:block absolute top-10 right-10 w-[220px] h-[220px] group"
        >

          {/* Glow Ring */}
          <div className="absolute inset-0 rounded-full bg-green-300/20 blur-2xl"></div>
          <div className="absolute inset-0 rounded-full border border-green-300/30"></div>

          {/* Orbit Items */}
          {[
            "images/Top.jpg",
            "images/Jean.jpg",
            "images/purse.jpg",
            "images/Gold_shoes.jpg",
            "images/Bangles.jpg",
            "images/brown_dress.png"
          ].map((src, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) orbitItemsRef.current[i] = el;
              }}
              className="absolute w-12 h-12 rounded-full overflow-hidden shadow-lg 
                        hover:scale-125 transition-transform duration-300 cursor-pointer"
              style={{
                top: "50%",
                left: "50%",
                transform: `rotate(${i * 60}deg) translate(90px) rotate(-${i * 60}deg)`
              }}
            >
              <img 
                src={src} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>


      {/* TEXT */}
      <h2 ref={titleRef} className="text-3xl font-bold text-gray-800 mb-6">
        Your Digital Wardrobe
      </h2>

      <p ref={textRef} className="text-gray-600 max-w-lg mb-10">
        Organize, tag, and access your outfits from anywhere. Upload new pieces,
        browse categories, and let your wardrobe come alive.
      </p>


      {/* Horizontal Scroll */}
      <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">

        {/* Upload Item Card */}
        <div className="min-w-[200px] h-[240px] bg-white border border-gray-200 rounded-xl 
          flex flex-col items-center justify-center shadow-sm hover:shadow-md transition">
          <div className="text-4xl text-green-600 mb-3">＋</div>
          <p className="text-gray-700 font-medium">Upload Item</p>
        </div>

        {/* Closet Grid Card */}
        <div className="min-w-[260px] h-[240px] bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
          <h3 className="font-semibold mb-3 text-gray-800">Closet Grid</h3>

          <div className="grid grid-cols-3 gap-2">
            <div className="h-16 rounded"><img className="h-full w-full object-cover" src="images/brown_dress.png" /></div>
            <div className="h-16 rounded"><img className="h-full w-full object-cover" src="images/Gold_shoes.jpg" /></div>
            <div className="h-16 rounded"><img className="h-full w-full object-cover" src="images/Bangles.jpg" /></div>
            <div className="h-16 rounded"><img className="h-full w-full object-cover" src="images/purse.jpg" /></div>
            <div className="h-16 rounded"><img className="h-full w-full object-cover" src="images/Jean.jpg" /></div>
            <div className="h-16 rounded"><img className="h-full w-full object-cover" src="images/Top.jpg" /></div>
          </div>
        </div>

        {/* Categories */}
        <div className="min-w-[220px] h-[240px] bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
          <h3 ref={titleRef} className="font-semibold mb-3 text-gray-800">Categories</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>• Tops</li>
            <li>• Gowns</li>
            <li>• Shoes</li>
            <li>• Bags</li>
            <li>• Accessories</li>
          </ul>
        </div>

        {/* Tagging */}
        <div className="min-w-[240px] h-[240px] bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
          <h3 className="font-semibold text-gray-800 mb-3">Smart Tagging</h3>

          <div className="space-y-2">
            <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs">Wedding</span>
            <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">Casual</span>
            <span className="inline-block bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs">Ankara</span>
          </div>

          <p className="text-gray-600 text-sm mt-4">
            Tags help AI match outfits to your events.
          </p>
        </div>

      </div>
    </section>

      {/* AI Styling Engine Section */}
<section className="ai-section w-full relative px-8 lg:px-20 py-24 overflow-hidden bg-[#FFF8F0]">

  {/* Background Glow */}
  <div className="absolute -left-10 -top-10 w-40 h-40 bg-yellow-400 rounded-full opacity-20 blur-2xl" />
  <div className="absolute right-0 bottom-0 w-64 h-64 bg-red-300 rounded-full opacity-20 blur-3xl" />

  <div className="relative z-10 max-w-6xl mx-auto">

    {/* ================= HEADER ================= */}
    <div className="text-center mb-20">
      <h2 className="text-3xl lg:text-5xl font-extrabold text-[#046A38] mb-6">
        AI Styling Engine,
        <span className="block text-[#D7263D]">
          Tailored For Every Event
        </span>
      </h2>

      <p className="text-gray-600 max-w-2xl mx-auto text-lg">
        From owambes to office meetings — your AI stylist understands your wardrobe,
        the event, and your vibe to create perfect outfits instantly.
      </p>
    </div>

    {/* ================= EVENT CARDS ================= */}
    <div className="grid md:grid-cols-3 gap-8 mb-20">

      {[
        {
          title: "Weddings",
          desc: "Elegant & culturally perfect looks for owambes and ceremonies.",
          img: "/images/Wedding.png",
        },
        {
          title: "Work",
          desc: "Smart, polished outfits tailored to your workplace.",
          img: "/images/Work.png",
        },
        {
          title: "Date Nights",
          desc: "Flattering, stylish combinations that match your vibe.",
          img: "/images/Date.png",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="ai-feature-card group p-4 rounded-2xl bg-white/70 backdrop-blur-md shadow-md hover:shadow-xl hover:-translate-y-2 transition"
        >
          <img
            src={item.img}
            className="w-full h-48 object-cover rounded-xl mb-4"
          />

          <h3 className="text-lg font-semibold text-[#046A38] mb-2">
            {item.title}
          </h3>

          <p className="text-gray-600 text-sm">
            {item.desc}
          </p>
        </div>
      ))}
    </div>

    {/* ================= AI DEMO ================= */}
    <div className="bg-gradient-to-br from-[#046A38] to-[#034E2A] p-10 rounded-3xl text-white grid lg:grid-cols-2 gap-10 items-center">

      {/* LEFT */}
      <div>
        <h3 className="text-2xl lg:text-3xl font-bold mb-6">
          See the AI in Action
        </h3>

        <div className="space-y-3 text-white/90">
          <p><span className="font-semibold">Event:</span> Wedding (Blush Pink & Gold)</p>
          <p><span className="font-semibold">Your Wardrobe:</span> Chocolate gown, gold heels, pearl earrings</p>
          <p className="bg-white/10 p-4 rounded-lg">
            <span className="font-semibold">AI Suggestion:</span><br />
            Elegant fitted chocolate gown + gold heels + pearl accessories.
          </p>
        </div>

        <Link href={'/stylist'}>
          <button className="mt-6 px-6 py-3 rounded-full bg-[#D7263D] hover:bg-[#B81F33] transition font-semibold">
            Try AI Styling →
          </button>
        </Link>
      </div>

      {/* RIGHT VISUAL */}
      <div className="relative flex justify-center items-center">

        {/* Glow */}
        <div className="absolute w-[250px] h-[250px] bg-[#FFD166] opacity-20 blur-3xl rounded-full"></div>

        {/* Floating Cards */}
        <div className="ai-card w-[160px] h-[240px] bg-white rounded-xl overflow-hidden shadow-lg">
          <img src="/images/outfit1.jpg" className="w-full h-full object-cover" />
        </div>

        <div className="ai-card absolute w-[160px] h-[240px] bg-white rounded-xl overflow-hidden shadow-lg translate-x-16 translate-y-8 rotate-6">
          <img src="/images/outfit2.jpg" className="w-full h-full object-cover" />
        </div>

        <div className="ai-card absolute w-[160px] h-[240px] bg-white rounded-xl overflow-hidden shadow-lg -translate-x-16 translate-y-8 -rotate-6">
          <img src="/images/complete_image1.png" className="w-full h-full object-cover" />
        </div>

      </div>
    </div>

  </div>
</section>

    {/* User Testimonials Carousel */}
    <section className="fade-section px-8 lg:px-20 py-20 bg-[#F7EFE8] text-gray-700 relative overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-[#046A38]">
          What Our Users Say
        </h2>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="flex gap-6 cursor-grab"
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="min-w-[300px] flex-shrink-0 p-6 rounded-2xl bg-white/80 backdrop-blur-md"
            >
              <p className="text-gray-700 italic mb-4">“{t.quote}”</p>
              <div className="flex items-center justify-center gap-3">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-gray-700 font-medium">{t.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Optional Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() =>
              gsap.to(carouselRef.current, {
                x: "+=320",
                duration: 0.6,
                ease: "power2.out",
              })
            }
            className="px-4 py-2 bg-[#046A38] text-white rounded-lg"
          >
            ‹
          </button>

          <button
            onClick={() =>
              gsap.to(carouselRef.current, {
                x: "-=320",
                duration: 0.6,
                ease: "power2.out",
              })
            }
            className="px-4 py-2 bg-[#D7263D] text-white rounded-lg"
          >
            ›
          </button>
        </div>
      </div>
    </section>

      {/* FOOTER */}
<footer className="relative bg-black text-gray-200 px-8 lg:px-20 py-16 overflow-hidden">

  {/* Soft Pattern Background */}
  <div className="absolute inset-0 bg-[url('/images/african-pattern.svg')] bg-repeat opacity-10 pointer-events-none"></div>

  <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
    {/* Brand / Logo */}
    <div className="space-y-4">
      <img src="/images/logo-1.png" alt="Outfit Library" className="h-16 w-auto" />
      <p className="text-gray-300 text-sm">
        Outfit Library helps you organize your wardrobe and get AI-curated outfit recommendations for any event.
      </p>
      <div className="flex gap-3 text-xl text-[#D7263D]">
        <a href="#"><i className="fa-brands fa-facebook hover:text-[#046A38] transition"></i></a>
        <a href="#"><i className="fa-brands fa-twitter hover:text-[#046A38] transition"></i></a>
        <a href="#"><i className="fa-brands fa-instagram hover:text-[#046A38] transition"></i></a>
      </div>
    </div>

    {/* Company */}
    <div>
      <h4 className="font-semibold text-lg text-[#D7263D] mb-4">Company</h4>
      <ul className="space-y-2 text-gray-300">
        <li><a href="#" className="hover:text-[#046A38] transition">About Us</a></li>
        <li><a href="#" className="hover:text-[#046A38] transition">Careers</a></li>
        <li><a href="#" className="hover:text-[#046A38] transition">Blog</a></li>
        <li><a href="#" className="hover:text-[#046A38] transition">Press</a></li>
      </ul>
    </div>

    {/* Resources */}
    <div>
      <h4 className="font-semibold text-lg text-[#D7263D] mb-4">Resources</h4>
      <ul className="space-y-2 text-gray-300">
        <li><a href="#" className="hover:text-[#046A38] transition">Help Center</a></li>
        <li><a href="#" className="hover:text-[#046A38] transition">Tutorials</a></li>
        <li><a href="#" className="hover:text-[#046A38] transition">Community</a></li>
        <li><a href="#" className="hover:text-[#046A38] transition">Partners</a></li>
      </ul>
    </div>

    {/* Legal */}
    <div>
      <h4 className="font-semibold text-lg text-[#D7263D] mb-4">Legal</h4>
      <ul className="space-y-2 text-gray-300">
        <li><a href="#" className="hover:text-[#046A38] transition">Privacy Policy</a></li>
        <li><a href="#" className="hover:text-[#046A38] transition">Terms of Service</a></li>
        <li><a href="#" className="hover:text-[#046A38] transition">Cookie Policy</a></li>
      </ul>
    </div>
  </div>

  {/* Footer Bottom */}
  <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
    © 2025 Outfit Library. All rights reserved.
  </div>
</footer>


    </div>
  );
}
