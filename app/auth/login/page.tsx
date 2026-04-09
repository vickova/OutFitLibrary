"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF8F0] px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/images/logo-try.png"
            alt="Outfit Library"
            className="h-14"
          />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-center text-[#046A38] mb-2">
          Welcome Back 👋
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Log in to continue styling smarter
        </p>

        {/* Login Form */}
        <form className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-[#D7263D]/40"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-[#D7263D]/40"
              required
            />
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <a
              href="/auth/forgot-password"
              className="text-sm text-[#D7263D] hover:underline"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#046A38] text-white py-3 rounded-lg 
            font-medium hover:bg-[#034E2A] transition"
          >
            Log In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-4 text-sm text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Google Login */}
        <button
          className="w-full border border-gray-300 py-3 rounded-lg 
          flex items-center justify-center gap-3 hover:bg-gray-50 transition"
        >
          <img src="/images/google-icon.svg" alt="Google" className="h-5" />
          <span className="text-sm font-medium text-gray-700">
            Continue with Google
          </span>
        </button>

        {/* Sign up */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a
            href="/auth/register"
            className="text-[#D7263D] font-medium hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
