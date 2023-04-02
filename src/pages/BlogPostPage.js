import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL } from "../globals/config"; // Import the API_URL

function BlogPostPage() {
  const [blogPost, setBlogPost] = useState({});
  const { postId } = useParams(); // Use useParams to get the postId

  useEffect(() => {
    axios
      .get(`${API_URL}/blogposts/${postId}`)
      .then((response) => {
        setBlogPost(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postId]);

  return (
    <div>
      <h2>{blogPost.title}</h2>
      <p>{blogPost.content}</p>
    </div>
  );
}

export default BlogPostPage;
