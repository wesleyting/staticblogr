import React, { useState, useEffect } from "react";
import BlogPostPreview from "../components/BlogPostPreview";
import axios from "axios";
import { API_URL } from "../globals/config";

function HomePage() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    async function fetchBlogPosts() {
      const response = await axios.get(`${API_URL}/blogposts`);
      setBlogPosts(response.data);
    }

    fetchBlogPosts();
  }, []);

  return (
    <div>
      {blogPosts.map((blogPost) => (
        <BlogPostPreview
          key={blogPost.id}
          title={blogPost.title}
          content={blogPost.content}
          imagePath={blogPost.imagePath}
          createdAt={blogPost.createdAt}
          id={blogPost.id}
        />
      ))}
    </div>
  );
}

export default HomePage;
