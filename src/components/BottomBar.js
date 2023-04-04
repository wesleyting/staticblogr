import React from "react";
import { Link } from "react-router-dom";

function BottomBar() {
  return (
    <div className="fixed bottom-0 w-full bg-gray-800 text-white py-6">
      <div className="flex justify-center gap-8">
        <Link
          to="/"
          className="text-white hover:text-gray-400 font-bold px-8 py-3 rounded-lg border border-white"
        >
          Home
        </Link>
        <Link
          to="/blog-posts"
          className="text-white hover:text-gray-400 font-bold px-8 py-3 rounded-lg border border-white"
        >
          View All Posts
        </Link>
        <Link
          to="/create-post"
          className="text-white hover:text-gray-400 font-bold px-8 py-3 rounded-lg border border-white"
        >
          Create Post
        </Link>
      </div>
    </div>
  );
}

export default BottomBar;
