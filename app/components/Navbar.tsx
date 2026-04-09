import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect } from "react";
import { ScrollTrigger, SplitText } from "gsap/all";


const Navbar = () => {
 
  useGSAP(() => {
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: ".navbar",
        start: "bottom top"}
    });
    navTween.fromTo(".navbar", { backgroundColor: "transparent" }, { duration: 1, ease: "power1.inout", backgroundColor: "rgba(215, 38, 61, 0.2)" });
  }, []);

  return (
<nav className="navbar w-full backdrop-blur shadow-sm px-8 flex items-center justify-between mb-10 py-1"> 
        <div className="flex items-center gap-2">
          <img src="/images/logo-try.png" alt="Outfit Library" className="h-10 w-auto" />
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="/" className="hover:text-[rgb(215,38,61)] transition">Home</a>
          <a href="/wardrobe" className="hover:text-[#D7263D] transition">Wardrobe</a>
          <a href="/stylist" className="hover:text-[#D7263D] transition">Stylist</a>
          <a href="/discover" className="hover:text-[#D7263D] transition">Discover</a>

        </div>
      </nav>  )
}

export default Navbar