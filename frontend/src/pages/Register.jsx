import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", {
        email,
        password
      });

      // Store JWT Token
      localStorage.setItem("token", response.data.token);

      // Redirect to home page
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <div className="w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100">
      <h1 className="text-5xl font-semibold">Register</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">Create your account</p>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mt-3">{error}</p>}

      <div className="mt-8">
        <div className="flex flex-col">
          <label className="text-lg font-medium">Email</label>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Enter your email"
          />
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-lg font-medium">Password</label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Enter your password"
          />
        </div>
        <div className="mt-8">
          <button 
            onClick={handleRegister}
            className="w-full py-4 bg-violet-500 rounded-xl text-white font-bold text-lg"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
