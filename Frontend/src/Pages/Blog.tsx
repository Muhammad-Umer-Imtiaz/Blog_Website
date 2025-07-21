import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import Navbar from '../Components/Navbar';
import Moment from 'moment';
import Footer from '../Components/Footer';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

interface BlogPost {
  _id: string;
  title: string;
  subTitle: string;
  createdAt: string;
  image: string;
  description: string;
}

interface Comment {
  name: string;
  content: string;
  createdAt: string;
}

const Blog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [formData, setFormData] = useState({ name: '', content: '' });
  const [loading, setLoading] = useState(false);
  const { axios } = useAppContext();

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);
      if(data.success) setData(data.blog)
      else toast.error(data.message);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios.post(`/api/comment/comments`, { blogId: id });
      if(data.success)  setComments(data.comments) 
      else toast.error(data.message);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  const addComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { name, content } = formData;

    try {
      const { data } = await axios.post('api/comment/add-comment', {
        blog:id,
        name,
        content,
      });

      if (data.success) {
        setFormData({ name: '', content: '' });
        toast.success(data.message);
      } else {
        toast.error(data.message);
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
    fetchData();
    fetchComments();
  }, [id]);

  return (
    <div className="relative flex flex-col min-h-screen bg-white">
      <Navbar />
      {data ? (
        <div>
          <div className="text-center mt-2 text-gray-600 relative z-10">
            <p className="py-4 font-medium bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Published on {Moment(data.createdAt).format('MMMM Do YYYY')}
            </p>
            <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800 mb-8">
              {data.title}
            </h1>
           <p className="inline-block py-2 px-4 rounded-full mb-4 border text-white bg-gradient-to-r from-blue-500 to-purple-500 font-medium text-sm">
              {data.subTitle}
            </p>
          </div>
          <div className="mx-5 max-w-5xl  md:mx-auto my-10 mt-6 z-10 relative">
            <img src={data.image} alt="" className="rounded-3xl mb-5" />
            <div
              className="rich-text max-w-3xl mx-auto"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          </div>


          {/* Comments Section */}
          <div className="mt-14 mb-10 max-w-3xl mx-auto z-10 relative px-4 sm:px-0">
            <p className="font-semibold mb-4">Comments ({comments.length})</p>
            <div className="flex flex-col gap-4">
              {comments
                .slice()
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((item, index) => (
                  <div
                    key={index}
                    className="relative bg-primary/5 border border-primary/10 max-w-xl p-4 rounded text-gray-600"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <img src={assets.user_icon} alt="" className="w-6" />
                      <p className="font-medium">{item.name}</p>
                    </div>
                    <p className="text-sm max-w-md ml-8">{item.content}</p>
                    <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
                      {Moment(item.createdAt).fromNow()}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Comment Form */}
          <div className="max-w-3xl mx-auto mt-10 relative z-10 px-4 sm:px-0">
  <p className="font-semibold mb-4">Add your comment</p>
  <form onSubmit={addComment} className="flex flex-col items-start gap-4 max-w-lg">
    <input
      type="text"
      placeholder="Name"
      required
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      className="w-full p-2 border border-gray-300 rounded outline-none"
    />
    <textarea
      placeholder="Comment"
      required
      value={formData.content}
      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
      className="w-full p-2 border border-gray-300 rounded outline-none h-48"
    />
    <button
      type="submit"
      disabled={loading}
      className={`bg-gradient-to-r mb-8 from-blue-500 to-purple-500 text-white rounded p-2 px-8 transition-all ${
        loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 cursor-pointer'
      }`}
    >
      {loading ? 'Submitting...' : 'Submit'}
    </button>
  </form>
</div>

        </div>
      ) : (
        <div className="flex justify-center items-center h-60 text-gray-500">Loading blog...</div>
      )}

<img src={assets.gradientBackground} alt="background" className="absolute -top-[200px] -z-[1] opacity-50" />

      
      <Footer />
    </div>
  );
};

export default Blog;
