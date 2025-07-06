import React from 'react';
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import logo1 from '../assets/logo_main.png'; // Ensure the image path is correct

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-400 px-4 sm:px-20 xl:px-32 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Logo */}
        <img 
          src={logo1} 
          alt="logo" 
          className="w-32 sm:w-44 cursor-pointer" 
        />

        {/* Copyright */}
        <h3 className="text-center sm:text-left text-sm sm:text-base text-gray-700">
          Copyright 2025 © BlogBreeze Muhammad Umer Imtiaz - All Rights Reserved.
        </h3>

        {/* Social Icons */}
        <div className="flex gap-6">
          <a href="https://x.com/SardarS71494323" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaSquareXTwitter className="text-2xl cursor-pointer text-black transition-transform duration-300 hover:scale-110" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebookSquare className="text-2xl cursor-pointer text-blue-600 transition-transform duration-300 hover:scale-110" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagramSquare className="text-2xl cursor-pointer text-purple-500 transition-transform duration-300 hover:scale-110" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
