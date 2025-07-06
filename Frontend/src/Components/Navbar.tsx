import React from 'react';
import { FaArrowRight } from "react-icons/fa6";
import logo1 from '../assets/logo_main.png'; // Ensure the image path is correct
import { useAppContext } from '../context/AppContext';

const Navbar: React.FC = () => {
  const { isLogin, navigate } = useAppContext();

  return (
    <nav className="flex  sm:flex-row justify-between items-center mx-8 sm:mx-20 xl:mx-32 py-4 gap-4 sm:gap-0">
      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        src={logo1}
        alt="Logo"
        className="w-32 sm:w-64 cursor-pointer select-none"
      />

      {/* Button */}
      <button
        onClick={() => navigate("/admin")}
        className="flex gap-2 items-center rounded-full text-lg sm:text-xl cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 sm:px-10 py-2 sm:py-2.5 transition-transform hover:scale-105"
      >
        {isLogin ? "Dashboard" : "Login"}
        <FaArrowRight className="text-white animate-pulse pt-1 h-5 sm:h-6" />
      </button>
    </nav>
  );
};

export default Navbar;
