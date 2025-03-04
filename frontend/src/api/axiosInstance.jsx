import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("📡 Sending Token:", token);
    } else {
      console.warn("🚨 No token found in localStorage!");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
