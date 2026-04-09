import HomePage from "./components/HomePage";
import WaitlistPage from "./components/WaitList";
// import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";

const PRODUCT_LIVE = true; // later switch to true

// gsap.registerPlugin(ScrollTrigger, SplitText)

export default function Home() {
  if (!PRODUCT_LIVE) {
    return <WaitlistPage />;
  }

  return <HomePage />;
}
 