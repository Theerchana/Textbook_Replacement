import React, { createContext, useContext, useState } from "react";

// Create the context
const AuthContext = createContext();

// Hook for easy usage
export function useAuth() {
  return useContext(AuthContext);
}

// Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Fake login
  const login = (username) => {
    setUser({ name: username });
  };

  // Fake register
  const register = (username) => {
    setUser({ name: username });
  };

  // Logout
  const logout = () => {
    setUser(null);
  };

  const value = { user, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
