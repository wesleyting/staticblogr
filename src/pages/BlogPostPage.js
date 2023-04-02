import React, { useEffect, useState } from "react";
import axios from "axios";

function BlogPostPage({ match }) {
  const [blogPost, setBlogPost] = useState({});

  useEffect(() => {
    axios
      .get(`${API_URL}/blogposts/${match.params.id}`)
      .then((response) => {
        setBlogPost(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [match.params.id]);

  return (
    <div>
      <h2>{blogPost.title}</h2>
      <p>{blogPost.content}</p>
    </div>
  );
}

export default BlogPostPage;
