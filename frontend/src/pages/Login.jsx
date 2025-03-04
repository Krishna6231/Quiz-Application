import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import api from "../api/api"; // Import the configured Axios instance

const Login = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      console.log("Sending login request with:", { username, password }); // Debugging
      const response = await api.post("/login", { username, password });

      const { token, role } = response.data;

      if (!token) {
        console.error("🚨 No token received from server!");
        setError("Login failed: No token received.");
        return;
      }

      // Store token and role in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      console.log("✅ Token Stored:", token); // Debugging

      // Fetch user details using the token
      const userDetailsResponse = await api.get("/me");

      const userDetails = userDetailsResponse.data;
      console.log("✅ User Details:", userDetails); // Debugging

      // Redirect based on role
      if (role === "ROLE_ADMIN") {
        navigate("/admin-dashboard");
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.error("🚨 Login Error:", err.response || err.message);
      setError(err.response?.data?.error || "Login failed. Try again.");
    }
  };

  return (
    <div className={`flex w-full h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className={`w-11/12 max-w-[700px] px-10 py-14 rounded-3xl shadow-lg transition-all ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border-2`}>
          <h1 className="text-4xl font-semibold text-center">Welcome Back</h1>
          <p className="text-gray-500 text-center mt-3">Enter your details to log in.</p>

          {error && <p className="text-red-500 text-center mt-3">{error}</p>}

          <div className="mt-8">
            <label className="block text-lg font-medium">Username</label>
            <input 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full border rounded-lg p-3 mt-1 bg-transparent focus:outline-none transition-all ${theme === "dark" ? "border-gray-700 text-white" : "border-gray-300 text-black"}`}
              placeholder="Enter your username"
            />
            <label className="block text-lg font-medium mt-4">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full border rounded-lg p-3 mt-1 bg-transparent focus:outline-none transition-all ${theme === "dark" ? "border-gray-700 text-white" : "border-gray-300 text-black"}`}
              placeholder="Enter your password"
            />
          </div>
          <div className="mt-6 flex justify-between items-center">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">Remember me</span>
            </label>
            <button className="text-blue-500 hover:underline text-sm">Forgot password?</button>
          </div>
          <div className="mt-8">
            <button onClick={handleLogin} className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg rounded-lg transition-all">
              Sign In
            </button>
          </div>
          <div className="mt-6 text-center">
            <span className="text-sm">Don't have an account? </span>
            <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center w-1/2 bg-gradient-to-tr from-blue-500 to-purple-500">
        <div className="w-60 h-60 bg-white rounded-full opacity-20 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Login;