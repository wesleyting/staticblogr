import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function BlogPostList({ apiUrl }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/blogposts`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [apiUrl]);

  const handleDeletePost = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      axios
        .delete(`${apiUrl}/blogposts/${postId}`)
        .then(() => {
          setPosts(posts.filter((post) => post.id !== postId));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleFeaturePost = (post) => {
    const updatedPost = { ...post, isFeatured: !post.isFeatured };

    axios
      .put(`${apiUrl}/blogposts/${post.id}`, updatedPost)
      .then(() => {
        setPosts(posts.map((p) => (p.id === post.id ? updatedPost : p)));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl my-3 text-center font-bold text-gray-900">
            Blog Post List
          </h1>
        </div>
      </div>
      <div className="max-w-3xl min-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="py-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border-b border-gray-300 mb-4 pb-4 last:border-0"
            >
              <div className="text-xl font-bold text-gray-900 mb-2">
                Title: {post.title}
              </div>
              <p className="mt-2 text-gray-600">
                <span className="font-bold">Content:</span>
                <br />
                {post.content.slice(0, 100)}{" "}
                {post.content.length > 100 && "..."}
              </p>
              <div className="flex space-x-4 mt-4">
                <Link
                  to={`/edit-post/${post.id}`}
                  className="px-3 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="px-3 py-1 text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleFeaturePost(post)}
                  className={`px-3 py-1 rounded-md ${
                    post.isFeatured
                      ? "text-gray-800 bg-yellow-300 hover:bg-yellow-400"
                      : "text-white bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {post.isFeatured ? "Unfeature" : "Feature"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogPostList;
