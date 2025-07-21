import React, { useEffect, useState } from 'react';
import CommentTableItems from '../../Components/admin/CommentTableitems';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

interface Blog {
  title: string;
}

interface CommentType {
  _id: string;
  blog: Blog;
  name: string;
  content: string;
  createdAt: string;
  isApproved: boolean;
}

const Comments: React.FC = () => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [filter, setFilter] = useState<'Approved' | 'Not Approved'>('Not Approved');
  const [loading, setLoading] = useState<boolean>(false);
  const { axios } = useAppContext();

  const fetchComments = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/comment/all-comment');
      if (data.success) {
        setComments(data.comments);
      } else {
        toast.error(data.message || 'Failed to fetch comments');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const filteredComments = comments.filter((comment) =>
    filter === 'Approved' ? comment.isApproved : !comment.isApproved
  );

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      {/* Header */}
      <div className="flex justify-between items-center max-w-3xl">
        <h1 className="text-lg font-semibold text-gray-800">Comments</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setFilter('Approved')}
            className={`border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === 'Approved' ? 'text-primary border-primary' : 'text-gray-700 border-gray-300'
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter('Not Approved')}
            className={`border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === 'Not Approved' ? 'text-primary border-primary' : 'text-gray-700 border-gray-300'
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide">
        {loading ? (
          <p className="text-center text-gray-400 py-6">Loading comments...</p>
        ) : (
          <>
            <table className="w-full text-sm text-gray-500">
              <thead className="text-xs text-gray-700 text-left uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Blog Title & Comment
                  </th>
                  <th scope="col" className="px-6 py-3 max-sm:hidden">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredComments.map((comment) => (
                  <CommentTableItems
                    key={comment._id}
                    comment={comment}
                    fetchComments={fetchComments}
                  />
                ))}
              </tbody>
            </table>

            {filteredComments.length === 0 && (
              <p className="text-center text-gray-400 py-6">No {filter.toLowerCase()} comments found.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Comments;
