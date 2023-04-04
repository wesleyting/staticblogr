import React, { useState } from "react";
import axios from "axios";

function CreateBlogPost({ apiUrl, onSuccess }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${apiUrl}/blogposts`, { title, content })
      .then((response) => {
        console.log(response.data);
        onSuccess(response.data.id);
      })
      .catch((error) => {
        console.log(error);
      });
    setTitle("");
    setContent("");
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
          placeholder="Enter Your Title"
          className="mt-1 block w-full p-2 bg-white rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
          placeholder="Type Your Content Here"
          className="mt-1 block w-full h-48 p-2 bg-white rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <button
        type="submit"
        className="w-full px-3 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
      >
        Create Blog Post
      </button>
    </form>
  );
}

export default CreateBlogPost;
