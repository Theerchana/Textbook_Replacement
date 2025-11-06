// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";

// Pages
import Home from "./pages/Home"; // ✅ Added Home page
import Marketplace from "./pages/Marketplace"; // Book search page
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import BookDetails from "./pages/BookDetails";
import AddBook from "./pages/AddBook";
import SellBook from "./pages/SellBook";
import ExchangeBook from "./pages/ExchangeBook";
import Dashboard from "./pages/Dashboard";
import ListingDetail from "./pages/ListingDetail";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";

// Static pages
function About() {
  return (
    <div className="text-center mt-20 text-2xl text-gray-700">
      📘 About Page Coming Soon!
    </div>
  );
}
function Contact() {
  return (
    <div className="text-center mt-20 text-2xl text-gray-700">
      ✉️ Contact Page Coming Soon!
    </div>
  );
}
function LearnMore() {
  return (
    <div className="text-center mt-20 text-2xl text-gray-700">
      💡 Learn More Page Coming Soon!
    </div>
  );
}

// Protected Admin Route
function ProtectedAdminRoute({ children }) {
  const isAdmin = localStorage.getItem("isAdminLoggedIn") === "true";
  return isAdmin ? children : <Navigate to="/admin-login" replace />;
}

export default function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="pt-24 px-4">
        <Routes>
          {/* 🌐 Public Routes */}
          <Route path="/" element={<Home />} /> {/* ✅ Now Home.jsx is your main page */}
          <Route path="/search-book" element={<Marketplace />} /> {/* ✅ Book search tab */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* 📚 Book Related Routes */}
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/sell-book" element={<SellBook />} />
          <Route path="/exchange-book" element={<ExchangeBook />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/listing/:id" element={<ListingDetail />} />

          {/* 🛠️ Admin Routes */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />

          {/* 🚫 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}
