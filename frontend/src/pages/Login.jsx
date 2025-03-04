import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeContext";

const Login = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={`flex w-full h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      {/* Login Form Section */}
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className={`w-11/12 max-w-[700px] px-10 py-14 rounded-3xl shadow-lg transition-all ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border-2`}>
          <h1 className="text-4xl font-semibold text-center">Welcome Back</h1>
          <p className="text-gray-500 text-center mt-3">Enter your details to log in.</p>

          {/* Form Fields */}
          <div className="mt-8">
            <label className="block text-lg font-medium">Email</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full border rounded-lg p-3 mt-1 bg-transparent focus:outline-none transition-all ${theme === "dark" ? "border-gray-700 text-white" : "border-gray-300 text-black"}`}
              placeholder="Enter your email"
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

          {/* Remember Me & Forgot Password */}
          <div className="mt-6 flex justify-between items-center">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">Remember me</span>
            </label>
            <button className="text-blue-500 hover:underline text-sm">Forgot password?</button>
          </div>

          {/* Login Button */}
          <div className="mt-8">
            <button className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg rounded-lg transition-all">
              Sign In
            </button>
          </div>

          {/* Alternative Login */}
          {/* <div className="mt-6 text-center text-sm">or</div>
          <button className="w-full mt-4 flex items-center justify-center py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-all">
            <img src="/google-icon.svg" alt="Google" className="h-5 w-5 mr-2" />
            Sign in with Google
          </button> */}

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <span className="text-sm">Don't have an account? </span>
            <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
          </div>
        </div>
      </div>

      {/* Right Section (for larger screens) */}
      <div className="hidden lg:flex items-center justify-center w-1/2 bg-gradient-to-tr from-blue-500 to-purple-500">
        <div className="w-60 h-60 bg-white rounded-full opacity-20 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Login;
