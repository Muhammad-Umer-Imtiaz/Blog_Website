import React from 'react';
import { useNavigate } from 'react-router-dom';

// Define the interface for the blog prop
interface Blog {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
}

// Define the props type for the BlogCard component
interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const { title, description, category, image, _id } = blog;
  const navigate = useNavigate(); // Use lowercase 'navigate' (convention)

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-lg"
    >
      <img src={image} alt="blogImage" className="aspect-video" />
      <span className="ml-5 mt-4 px-3 py-1 inline-block text-xs bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white">
        {category}
      </span>
      <div className="p-5">
        <h5 className="mb-2 font-medium text-gray-900">{title}</h5>
        <p className="mb-3 text-xs text-gray-600" dangerouslySetInnerHTML={{"__html": description.slice(0, 90)}}></p>
      </div>
    </div>
  );
};

export default BlogCard;