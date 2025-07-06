import React from 'react';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

const Header: React.FC = () => {
  const { setInput, input } = useAppContext();

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <h1 className='text-3xl sm:text-5xl font-bold text-center mt-10 mb-5 text-gray-700 sm:leading-16'>
        A Modern Platform for <br />
        <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Creative Bloggers
        </span>
        .
      </h1>
      <p className='mt-6 mb-6 sm:mt-8 sm:mb-8 max-w-2xl mx-auto text-center text-gray-600 text-sm sm:text-base font-semibold'>
        This is your space to think out loud, to share what matters, and to write without filters. Whether it's one word or a thousand, your story starts right here.
      </p>
      <form
        onSubmit={onSubmitHandler}
        className='flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden'
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Search for Blogs"
          required
          className="w-full pl-4 outline-none"
        />
        <button
          type="submit"
          className='bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer text-white'
        >
          Search
        </button>
      </form>
      <img src={assets.gradientBackground} alt="background" className='absolute -top-50 -z-1 opacity-50'/>
    </div>
  );
};

export default Header;
