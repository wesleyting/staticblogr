import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function BlogPost({ apiUrl }) {
  const [blogPost, setBlogPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${apiUrl}/blogposts/${id}`)
      .then((response) => {
        setBlogPost(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [apiUrl, id]);

  if (!blogPost) return <div>Loading...</div>;

  return (
    <div>
      <h2>{blogPost.title}</h2>
      <p>{blogPost.content}</p>
      <small>{new Date(blogPost.createdAt).toLocaleString()}</small>
    </div>
  );
}

export default BlogPost;
