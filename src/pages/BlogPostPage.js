import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL } from "../globals/config";
import Footer from "../template/Footer";
import Header from "../template/Header";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

import { presetBlogPosts } from "../template/Blog";

function BlogPostPage() {
  const [blogPost, setBlogPost] = useState({});
  const { postId } = useParams();

  useEffect(() => {
    const presetBlogPost = presetBlogPosts.find((post) => post.id === postId);

    if (presetBlogPost) {
      setBlogPost(presetBlogPost);
    } else {
      axios
        .get(`${API_URL}/blogposts/${postId}`)
        .then((response) => {
          setBlogPost(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [postId]);

  return (
    <>
      <Header sections={[]} title="Client Website" />
      <Container maxWidth="lg">
        <div style={{ margin: "0 auto", maxWidth: "800px" }}>
          <img
            src={blogPost.image || "https://source.unsplash.com/random/800x400"}
            alt={blogPost.imageText}
            style={{ width: "100%", display: "block", margin: "0 auto" }}
          />
          <div className="mx-auto py-12">
            <h1 className="text-4xl font-bold mb-4">{blogPost.title}</h1>
            <Typography
              variant="body1"
              gutterBottom
              sx={{ fontStyle: "italic", color: "text.secondary" }}
            >
              {new Date(blogPost.createdAt).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>

            <div className="prose prose-lg max-w-none">
              <p>{blogPost.content}</p>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default BlogPostPage;
