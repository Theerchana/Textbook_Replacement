import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  const navLinkClass = ({ isActive }) =>
    `hover:text-indigo-600 transition ${
      isActive ? "text-indigo-600 font-semibold" : "text-gray-700"
    }`;

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition"
        >
          📚 Textbook Exchange
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/add-book" className={navLinkClass}>
            Sell / Exchange
          </NavLink>
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>

          {!user ? (
            <>
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
              <NavLink to="/register" className={navLinkClass}>
                Register
              </NavLink>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                Hello,{" "}
                <span className="font-semibold text-indigo-600">
                  {user.name}
                </span>
              </span>
              <button
                onClick={logout}
                className="text-red-500 hover:text-red-600 font-medium transition"
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
