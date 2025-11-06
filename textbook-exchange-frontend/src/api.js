import axios from "axios";

// Backend base URL (change this if your backend URL changes)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api", 
});

// 🔐 Automatically attach token if user is logged in
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Signup API call
export async function signup(userData) {
  try {
    const res = await api.post("/auth/signup", userData);
    return res.data;
  } catch (err) {
    return { error: err.response?.data?.message || "Signup failed" };
  }
}

// ✅ Login API call
export async function login(userData) {
  try {
    const res = await api.post("/auth/login", userData);
    return res.data;
  } catch (err) {
    return { error: err.response?.data?.message || "Login failed" };
  }
}

// ✅ Forgot Password API call
export async function forgotPassword(formData) {
  try {
    const res = await api.post("/forgot-password", formData);
    return res.data; // { success: true, message: "..." }
  } catch (err) {
    return { success: false, message: err.response?.data?.message || "Server error" };
  }
}

export default api;
