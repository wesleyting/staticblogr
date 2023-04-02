import React, { useState } from "react";
import axios from "axios";

function CreateBlogPost({ apiUrl }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${apiUrl}/blogposts`, { title, content })
      .then((response) => {
        console.log(response.data);
        window.location.reload(); // refresh the page
      })
      .catch((error) => {
        console.log(error);
      });
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button type="submit">Create Blog Post</button>
    </form>
  );
}

export default CreateBlogPost;
