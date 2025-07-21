import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Blog {
  _id: string;
  title: string;
  description?: string;// Keep it optional to match AppContext and backend data
  category?: string;
  image?: string;
  content?: string;
  subTitle?: string;
  author?: string;
  isPublished?: boolean;
  createdAt: string;
  updatedAt?: string;
}

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const { title, description, category, image, _id } = blog;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-lg"
    >
      <img
        src={image || "/fallback.jpg"} 
        alt="blogImage"
        className="aspect-video"
      />
      <span className="ml-5 mt-4 px-3 py-1 inline-block text-xs bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white">
        {category || "Uncategorized"} 
      </span>
      <div className="p-5">
        <h5 className="mb-2 font-medium text-gray-900">{title}</h5>
        <p
          className="mb-3 text-xs text-gray-600"
          dangerouslySetInnerHTML={{
            __html: description?.slice(0, 90) || "No description available", 
          }}
        ></p>
      </div>
    </div>
  );
};

export default BlogCard;
