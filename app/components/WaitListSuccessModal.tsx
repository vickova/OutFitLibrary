"use client";

import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";

export default function SuccessModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  if (!isOpen) return null;

  return (
    <>
      <Confetti width={windowSize.width} height={windowSize.height} />
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-neutral-900 rounded-xl p-8 w-96 shadow-lg text-center relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>

          <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-green-100 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-xl font-semibold mb-2 dark:text-white">Welcome to the Waitlist!</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Thank you for joining the OutfitLibrary Waitlist! You are all set to receive updates as soon as we launch.
          </p>

          <button
            onClick={onClose}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition mb-2"
          >
            You're all set 🎉
          </button>

          <button
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            onClick={() => navigator.share ? navigator.share({ title: 'OutfitLibrary', text: 'Join me on the OutfitLibrary waitlist!', url: window.location.href }) : alert('Share this link!')}
          >
            Share with others
          </button>
        </motion.div>
      </div>
    </>
  );
}
