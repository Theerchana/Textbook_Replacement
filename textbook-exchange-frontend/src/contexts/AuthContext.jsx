import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (savedUser) setUser(savedUser);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!found) return { error: "User not found!" };
    if (found.password !== password) return { error: "Invalid password!" };

    setUser(found);
    localStorage.setItem("currentUser", JSON.stringify(found));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export const useAuth = () => useContext(AuthContext);
