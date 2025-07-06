import React from 'react';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

interface Comment {
  _id: string;
  blog: string; // blog ID
  name: string;
  content: string;
  createdAt: string;
  isApproved: boolean;
}

interface CommentTableItemsProps {
  comment: Comment;
  fetchComments: () => void;
}

const CommentTableItems: React.FC<CommentTableItemsProps> = ({ comment, fetchComments }) => {
  const { createdAt, isApproved, _id, name, content } = comment;
  const { axios, blogs } = useAppContext();

  const fullBlog = blogs.find((b) => b._id === comment.blog);
  const formattedDate = new Date(createdAt).toLocaleDateString();

  const approveComment = async () => {
    try {
      const { data } = await axios.post('/api/admin/approve-comment', { id: _id });
      if (data.success) {
        toast.success('Comment approved successfully');
        fetchComments();
      } else {
        toast.error(data.message || 'Failed to approve comment');
      }
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  const deleteComment = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this comment?');
    if (!confirmDelete) return;

    try {
      const { data } = await axios.post('/api/admin/delete-comment', { id: _id });
      if (data.success) {
        toast.success('Comment deleted successfully');
        fetchComments();
      } else {
        toast.error(data.message || 'Failed to delete comment');
      }
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  return (
    <tr className="border-y border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 text-sm">
        <p><b className="text-gray-700">Blog</b>: {fullBlog?.title || "Unknown Blog"}</p>
        <p><b className="text-gray-700">Name</b>: {name}</p>
        <p><b className="text-gray-700">Comment</b>: {content}</p>
      </td>
      <td className="px-6 py-4 text-sm max-sm:hidden">{formattedDate}</td>
      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-4">
          {!isApproved ? (
            <img
              onClick={approveComment}
              src={assets.tick_icon}
              alt="Approve Comment"
              className="w-5 hover:scale-110 transition-transform cursor-pointer"
              title="Approve Comment"
              role="button"
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter') approveComment(); }}
            />
          ) : (
            <span className="text-xs text-green-600 bg-green-100 border border-green-600 rounded-full px-3 py-1">
              Approved
            </span>
          )}
          <img
            onClick={deleteComment}
            src={assets.bin_icon}
            alt="Delete Comment"
            className="w-5 hover:scale-110 transition-transform cursor-pointer"
            title="Delete Comment"
            role="button"
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter') deleteComment(); }}
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItems;
