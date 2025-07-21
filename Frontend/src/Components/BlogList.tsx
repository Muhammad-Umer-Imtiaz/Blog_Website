import React, { useState } from "react";
import { blogCategories } from "../assets/assets";
import { motion } from "framer-motion";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";

// Remove local interface completely and use the one from AppContext
// This prevents type conflicts

const BlogList: React.FC = () => {
  const [menu, setMenu] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const blogsPerPage = 15;

  const { blogs, input } = useAppContext();

  const filterBlogs = () => {
    let filtered = blogs; // Remove type assertion - use context type directly

    if (input.trim() !== "") {
      const lowerInput = input.toLowerCase();
      filtered = filtered.filter((blog) => {
        const matchesTitle = blog.title?.toLowerCase().includes(lowerInput);
        const matchesCategory = blog.category?.toLowerCase().includes(lowerInput);
        return matchesTitle || matchesCategory;
      });
    }

    if (menu !== "All") {
      const lowerMenu = menu.toLowerCase();
      filtered = filtered.filter(
        (blog) => blog.category?.toLowerCase() === lowerMenu
      );
    }

    return filtered;
  };

  const filteredBlogs = filterBlogs();
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const currentBlogs = filteredBlogs.slice(startIndex, startIndex + blogsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMenuChange = (item: string) => {
    setMenu(item);
    setCurrentPage(1); 
  };

  return (
    <div>
      {/* Category Filter */}
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative flex-wrap">
        {blogCategories.map((item: string, index: number) => (
          <div key={index} className="relative">
            <button
              onClick={() => handleMenuChange(item)}
              aria-pressed={menu === item}
              className={`cursor-pointer text-gray-500 ${
                menu === item ? "text-white px-4 pt-0.5" : ""
              }`}
            >
              {item}
              {menu === item && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 600, damping: 30 }}
                  className="absolute left-0 right-0 top-0 h-7 -z-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-8 lg:px-16">
        {currentBlogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2 flex-wrap">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`w-8 h-8 rounded-full ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              } hover:bg-blue-400 transition`}
              aria-current={currentPage === index + 1 ? "page" : undefined}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;