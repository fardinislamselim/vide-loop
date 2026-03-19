import axios from "axios";

// Create instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1",
  withCredentials: true, // for cookie-based auth
  headers: {
    "Content-Type": "application/json",
  },
});

// ---------------- REQUEST INTERCEPTOR ----------------
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage (if using token-based auth)
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ---------------- RESPONSE INTERCEPTOR ----------------
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors
    if (error.response?.status === 401) {
      console.log("Unauthorized - redirect to login");

      // optional redirect
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
