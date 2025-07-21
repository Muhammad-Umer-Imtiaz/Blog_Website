import React from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { RiDeleteBin6Line } from "react-icons/ri";

type Blog = {
  _id: string;
  title: string;
  createdAt: string; // or Date, depending on your schema
  isPublished: boolean;
};

type BlogTableItemProps = {
  blog: Blog;
  fetchBlogs: () => void;
  index: number;
};

const BlogTableItem: React.FC<BlogTableItemProps> = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt, isPublished, _id } = blog;
  const BlogDate = new Date(createdAt);
  const { axios } = useAppContext();

  const deleteBlog = async () => {
    const confirm = window.confirm('Are you sure you want to delete this Blog?');
    if (!confirm) return;

    try {
      const { data } = await axios.delete('/api/blog/delete', {
        data: { id: _id },
      });

      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.error || 'Failed to delete blog');
      }
    } catch (error) {
      toast.error( 'Something went wrong '+ error);
    }
  };

  const togglePublish = async () => {
    try {
      const { data } = await axios.post('/api/blog/toggle-publish', { id: _id });

      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.error || 'Failed to toggle publish status');
      }
    } catch (error) {
      toast.error( 'Something went wrong' + error);
    }
  };

  return (
    <tr className="border-y border-gray-300">
      <th className="px-2 py-4">{index}</th>
      <td className="px-2 py-4">{title}</td>
      <td>{BlogDate.toDateString()}</td>
      <td className="px-2 py-4 max-sm:hidden">
        <p className={isPublished ? 'text-green-600' : 'text-red-700'}>
          {isPublished ? 'Published' : 'Unpublished'}
        </p>
      </td>
      <td className="py-2 px-4 flex text-xs justify-evenly items-center">
        <button
          onClick={togglePublish}
          className="border  px-2 py-1 mt-1 hover:scale-110 transition-all  rounded cursor-pointer"
        >
          {isPublished ? 'Unpublish' : 'Publish'}
        </button>
        <RiDeleteBin6Line onClick={deleteBlog}
          className="w-8 hover:scale-110 transition-all cursor-pointer h-5"
        />

      </td>
    </tr>
  );
};

export default BlogTableItem;
