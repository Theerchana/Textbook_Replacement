// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api"; // optional: if your API supports login, else can remove
import {
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      // --- Check localStorage for registered users ---
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const foundUser = storedUsers.find(
        (u) => u.email === form.email
      );

      if (!foundUser) {
        setMessage("❌ No account found with this email.");
        setLoading(false);
        return;
      }

      // For demo only — in real case, password should be hashed & validated on backend
      // Since we didn’t store password, you can remove this check or handle it via API
      // Example if you had password stored:
      // if (foundUser.password !== form.password) { ... }

      // --- Optional: API call for backend login (if available) ---
      // const data = await login(form);
      // if (data.success) { ... }

      // --- Save current user to localStorage for session management ---
      localStorage.setItem("currentUser", JSON.stringify(foundUser));

      setMessage("✅ Login successful!");
      setTimeout(() => navigate("/dashboard"), 1500); // Change to your target page
    } catch (err) {
      console.error(err);
      setMessage("❌ Server error. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-5 overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.6), rgba(240,220,255,0.7)),
          url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Floating glow effects */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-rose-300 rounded-full opacity-30 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-300 rounded-full opacity-30 blur-3xl animate-pulse"></div>

      <div className="relative w-full max-w-md bg-white/80 backdrop-blur-2xl shadow-2xl rounded-3xl p-8 animate-fade-in">
        <h2 className="text-3xl font-extrabold text-center text-indigo-800 mb-1">
          Welcome Back
        </h2>
        <p className="text-center text-gray-700 mb-6 text-sm">
          Sign in to your{" "}
          <span className="text-pink-600 font-semibold">Textbook Exchange</span>{" "}
          account 📘
        </p>

        {message && (
          <div
            className={`mb-4 p-3 rounded-lg text-center text-sm font-medium ${
              message.includes("✅")
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <EnvelopeIcon className="w-5 h-5 text-gray-500 absolute left-3 top-3" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <LockClosedIcon className="w-5 h-5 text-gray-500 absolute left-3 top-3" />
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-10 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-2.5"
            >
              {showPass ? (
                <EyeSlashIcon className="w-5 h-5 text-gray-600" />
              ) : (
                <EyeIcon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white font-semibold shadow-md transition-all duration-200 hover:shadow-lg ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        {/* Extra Links */}
        <div className="text-center mt-6 text-sm text-gray-700">
          <button
            onClick={() => navigate("/forgot-password")}
            className="text-pink-600 hover:underline font-medium"
          >
            Forgot Password?
          </button>
          <p className="mt-3">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-pink-600 font-semibold hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
