import axios from "axios";

// Create an Axios instance with a base URL and default headers
const api = axios.create({
  baseURL: "http://localhost:8080/api/auth", // Base URL for all requests
  headers: {
    "Content-Type": "application/json", // Default content type
  },
});

// Interceptor to attach the token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to headers
      console.log("📡 Sending Token:", token); // Debugging
    } else {
      console.warn("🚨 No token found in localStorage!"); // Debugging
    }
    return config;
  },
  (error) => {
    console.error("🚨 Request Interceptor Error:", error); // Debugging
    return Promise.reject(error);
  }
);

// Interceptor to handle errors globally
api.interceptors.response.use(
  (response) => {
    console.log("✅ Response:", response.data); // Debugging
    return response;
  },
  (error) => {
    console.error("🚨 Response Error:", error.response || error.message); // Debugging
    return Promise.reject(error);
  }
);

export default api;