import React from 'react';

const NewSletter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 my-32">
      <h1 className="md:text-4xl text-2xl font-semibold">Never Miss a Blog!</h1>
      <p className="md:text-lg text-base text-gray-500/70 pb-8">Subscribe to get the latest blog, news, and exclusive news.</p>
      <form className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">
        <input
          className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
          type="text"
          placeholder="enter your email id"
          required
        />
        <button type="submit" className="md:px-12 px-8 h-full text-white  bg-gradient-to-r from-blue-500 to-purple-500 rounded-l-none cursor-pointer rounded-md transition-all">
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewSletter;