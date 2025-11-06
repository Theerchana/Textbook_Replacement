// src/pages/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const ADMIN_EMAIL = "admin@bookexchange.com";
    const ADMIN_PASS = "admin123";

    setTimeout(() => {
      if (form.email === ADMIN_EMAIL && form.password === ADMIN_PASS) {
        localStorage.setItem("isAdminLoggedIn", "true");
        setMessage("✅ Admin login successful!");
        setTimeout(() => navigate("/admin"), 1000);
      } else {
        setMessage("❌ Invalid admin credentials!");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-5 text-white overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=80')",
        // 📚 Elegant book and desk background (admin vibe)
      }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

      {/* Login content */}
      <div className="relative z-10 w-full max-w-md space-y-6 text-center animate-fade-in">
        {/* Header */}
        <div className="flex flex-col items-center">
          <ShieldCheckIcon className="w-14 h-14 text-yellow-400 mb-2 drop-shadow-lg" />
          <h2 className="text-4xl font-extrabold text-white drop-shadow-lg">
            Admin Login
          </h2>
          <p className="text-gray-200 text-sm mt-2">
            Manage BookSwap securely
          </p>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`p-3 rounded-lg text-sm font-semibold backdrop-blur-md inline-block ${
              message.includes("✅")
                ? "bg-green-600/60 text-white"
                : "bg-red-600/60 text-white"
            }`}
          >
            {message}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 text-left mx-auto w-full max-w-sm"
        >
          {/* Email */}
          <div className="relative">
            <EnvelopeIcon className="w-5 h-5 text-gray-300 absolute left-3 top-3" />
            <input
              type="email"
              name="email"
              placeholder="Admin Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 border border-gray-500 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <LockClosedIcon className="w-5 h-5 text-gray-300 absolute left-3 top-3" />
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Admin Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 border border-gray-500 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-2.5"
            >
              {showPass ? (
                <EyeSlashIcon className="w-5 h-5 text-gray-200" />
              ) : (
                <EyeIcon className="w-5 h-5 text-gray-200" />
              )}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-bold shadow-md transition-all duration-200 hover:shadow-lg ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging In..." : "Login as Admin"}
          </button>
        </form>

        {/* Back to User Login */}
        <p className="text-gray-300 mt-4 text-sm">
          Not an admin?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-yellow-400 font-semibold hover:underline"
          >
            Go to User Login
          </button>
        </p>
      </div>
    </div>
  );
}
