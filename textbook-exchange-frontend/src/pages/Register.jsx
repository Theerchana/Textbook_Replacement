// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api";
import {
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!passwordRegex.test(form.password)) {
      setMessage(
        "❌ Password must be 8+ chars, include uppercase, lowercase, number & special character."
      );
      setLoading(false);
      return;
    }

    try {
      const data = await signup(form);
      if (data.message) {
        setMessage(data.message);
      } else {
        // --- Save user to localStorage under "users" ---
        // ⚠️ For learning/demo only. Don't store plaintext passwords in production.
        const newUser = {
          name: form.name,
          email: form.email,
          role: "user",
        };

        const stored = JSON.parse(localStorage.getItem("users") || "[]");

        // Prevent duplicate emails
        const exists = stored.some((u) => u.email === newUser.email);
        if (!exists) {
          stored.push(newUser);
          localStorage.setItem("users", JSON.stringify(stored));
        } else {
          console.warn("User with this email already exists in localStorage.");
        }

        // Notify other components (optional)
        window.dispatchEvent(new CustomEvent("users-updated"));

        setMessage("✅ Signup successful!");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      console.log(err);
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
          url('https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1600&q=80')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Floating glow effects */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-300 rounded-full opacity-30 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-300 rounded-full opacity-30 blur-3xl animate-pulse"></div>

      <div className="relative w-full max-w-md bg-white/80 backdrop-blur-2xl shadow-2xl rounded-3xl p-8 animate-fade-in">
        <h2 className="text-3xl font-extrabold text-center text-indigo-800 mb-1">
          Create Your Account
        </h2>
        <p className="text-center text-gray-700 mb-6 text-sm">
          Join the{" "}
          <span className="text-pink-600 font-semibold">Textbook Exchange</span>{" "}
          community 📚
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
          {/* Name */}
          <div className="relative">
            <UserIcon className="w-5 h-5 text-gray-500 absolute left-3 top-3" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>

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
              placeholder="Create a strong password"
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
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-700 mt-6 text-sm">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-pink-600 font-semibold hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
