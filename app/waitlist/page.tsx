"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { useEffect} from "react";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setLoading(false);
    if (res.ok) {
      setSuccess(true);
      setEmail("");
    }
  }

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FFF8F0] dark:bg-neutral-950 transition-colors">

      {/* GRID */}
      <div
        className="absolute inset-5 -z-99 dark:opacity-70"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* BLOBS */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute left-0 top-0 w-40 h-40 bg-yellow-400 rounded-full opacity-20 blur-3xl" />
        <div className="absolute right-10 bottom-10 w-64 h-64 bg-red-300 rounded-full opacity-20 blur-3xl" />
      </div>

      {/* HEADER */}
      <header className="relative z-10 px-6 lg:px-20 pt-6 max-w-7xl mx-auto flex items-center justify-between">
        <img src="/images/logo-try.png" alt="Outfit Library" className="h-20 W-30" />

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-4 px-4 py-2 rounded-full text-sm font-medium border bg-white dark:bg-neutral-900 dark:text-white transition"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </header>

      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 px-6 lg:px-20 py-25 max-w-4xl mx-auto text-center"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-sm bg-white/80 dark:bg-white/10 dark:text-white border mb-8">
          🚀 Early Access Open
        </span>

        <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 text-[#046A38] dark:text-green-400 leading-tight">
          Style Smarter in{" "}
          <span className="px-4 py-1 rounded-lg bg-[#D7263D] text-white">Seconds</span>
        </h1>

        <p className="text-gray-700 dark:text-gray-300 max-w-xl mx-auto mb-10 text-lg">
          Join the waitlist to get early access to AI-powered outfit recommendations.
        </p>

        <form onSubmit={handleSubmit} className="flex items-center max-w-md mx-auto bg-white dark:bg-neutral-900 rounded-full p-1 shadow">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 bg-transparent px-5 py-3 outline-none text-gray-800 dark:text-white"
          />

          <button
            disabled={loading}
            className="bg-[#046A38] hover:bg-[#034E2A] text-white w-12 h-12 rounded-full flex items-center justify-center"
          >
            {loading ? "…" : "→"}
          </button>
        </form>

        {success && (
          <p className="text-sm text-green-600 dark:text-green-400 mt-4">
            🎉 You’re on the waitlist!
          </p>
        )}
      </motion.section>

      {/* FEATURES */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 px-6 lg:px-20 pb-32 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
      >
        <div className="group">
          <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-[#D7263D]/20 flex items-center justify-center text-xl transition group-hover:scale-110">
            ⚡
          </div>
          <h3 className="font-semibold text-lg mb-2 text-[#046A38] dark:text-green-400">Lightning Fast</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Get outfit recommendations in seconds.</p>
        </div>

        <div className="group">
          <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-[#046A38]/20 flex items-center justify-center text-xl transition group-hover:scale-110">
            🤖
          </div>
          <h3 className="font-semibold text-lg mb-2 text-[#046A38] dark:text-green-400">AI Powered</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Styled for your events & culture.</p>
        </div>

        <div className="group">
          <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-yellow-400/20 flex items-center justify-center text-xl transition group-hover:scale-110">
            👗
          </div>
          <h3 className="font-semibold text-lg mb-2 text-[#046A38] dark:text-green-400">Wardrobe Aware</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Uses what you already own.</p>
        </div>
      </motion.section>
    </div>
  );
}
