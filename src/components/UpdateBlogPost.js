import React, { useState, useEffect } from "react";
import axios from "axios";

function UpdateBlogPost({ apiUrl, postId, onSuccess }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    axios
      .get(`${apiUrl}/blogposts/${postId}`)
      .then((response) => {
        setTitle(response.data.title);
        setContent(response.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [apiUrl, postId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${apiUrl}/blogposts/${postId}`, { title, content })
      .then(() => {
        onSuccess();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full bg-white rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 block w-full h-48 bg-white rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <button
        type="submit"
        className="w-full px-3 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
      >
        Update Blog Post
      </button>
    </form>
  );
}

export default UpdateBlogPost;
