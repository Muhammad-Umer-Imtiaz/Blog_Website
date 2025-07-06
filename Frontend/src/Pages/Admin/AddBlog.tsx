import React, { useEffect, useRef, useState } from 'react';
import { assets, blogCategories } from '../../assets/assets';
import Quill from 'quill';
import { useAppContext } from '../../context/AppContext';
import { marked } from 'marked';
import toast from 'react-hot-toast';

const AddBlog: React.FC = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);
  const { axios } = useAppContext();

  const [isAdding, setIsAdding] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [subTitle, setSubtitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('Startup');
  const [isPublished, setIsPublished] = useState(false);

  const generateContent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!title) return toast.error('Please Enter Title');

      const { data } = await axios.post('/api/blog/generate', { prompt: title });
      if (data.success) {
quillRef.current!.clipboard.dangerouslyPasteHTML(marked(data.content));
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

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      const blog = {
        title,
        subTitle,
        description: quillRef.current?.root.innerHTML || '',
        category,
        isPublished,
      };

      const formData = new FormData();
      formData.append('blog', JSON.stringify(blog));
      if (image) formData.append('image', image);

      const { data } = await axios.post('/api/blog/add', formData);

      if (data.success) {
        toast.success(data.message);
        setImage(null);
        setTitle('');
        setSubtitle('');
        setIsPublished(false);
        setCategory('Startup');
        quillRef.current?.setText('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'Failed to add blog');
      } else {
        toast.error('Failed to add blog');
      }
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'
    >
      <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>
        <p>Upload thumbnail</p>
        <label htmlFor='image'>
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt='Upload Thumbnail'
            className='mt-2 h-16 rounded cursor-pointer'
          />
          <input
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setImage(file);
            }}
            type='file'
            id='image'
            hidden
            required
          />
        </label>

        <p className='mt-4'>Blog title</p>
        <input
          type='text'
          placeholder='Type here'
          required
          className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <p className='mt-4'>Author Name</p>
        <input
          type='text'
          placeholder='Enter Author Name'
          required
          className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'
          onChange={(e) => setSubtitle(e.target.value)}
          value={subTitle}
        />

        <p className='mt-4'>Blog Description</p>
        <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
          <div ref={editorRef}></div>
          <button
            disabled={loading}
            type='button'
            onClick={generateContent}
            className='absolute bottom-1 right-2 ml-2 text-sx bg-gradient-to-r from-blue-500 to-purple-500 text-white  px-4 py-1.5 rounded hover:underline cursor-pointer'
          >
            {loading ? "Generating Blog.....":"Generate with AI"}
          </button>
        </div>

        <p className='mt-4'>Blog Category</p>
        <select
          name='category'
          className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value=''>Select Category</option>
          {blogCategories.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        <div className='flex gap-3 items-center mt-4'>
          <p>Publish Now</p>
          <input
            type='checkbox'
            checked={isPublished}
            className='scale-125 cursor-pointer'
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </div>

        <button
          disabled={isAdding}
          type='submit'
          className='mt-9 w-40 h-10 bg-blue-600 rounded cursor-pointer text-sm text-white'
        >
          {isAdding ? 'Adding...' : 'Add Blog'}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
