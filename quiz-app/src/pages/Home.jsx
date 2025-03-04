import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeContext";

const Home = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-6 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Quiz Application</h1>

      {/* Theme Toggle Switch */}
      <div className="flex items-center mb-6">
        <span className="mr-2">Light</span>
        <label className="relative inline-flex cursor-pointer items-center">
          <input type="checkbox" className="sr-only peer" checked={theme === "dark"} onChange={toggleTheme} />
          <div className="w-10 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-5 peer-checked:bg-blue-600 after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
        </label>
        <span className="ml-2">Dark</span>
      </div>

      {/* Call to Action */}
      <p className="text-lg mb-6 text-center">Login or Sign Up to start the quiz and test your knowledge!</p>

      <div className="flex space-x-4">
        <Link to="/login">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">Login</button>
        </Link>
        <Link to="/signup">
          <button className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition">Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
