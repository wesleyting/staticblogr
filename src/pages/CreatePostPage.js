import React from "react";
import CreateBlogPost from "../components/CreateBlogPostForm";
import { useNavigate } from "react-router-dom";

function CreatePostPage({ apiUrl }) {
  const navigate = useNavigate();

  const handleSuccessfulPostCreation = (postId) => {
    navigate(`/blog/${postId}`);
  };

  return (
    <div>
      <h1>Create a New Blog Post</h1>
      <CreateBlogPost
        apiUrl={apiUrl}
        onSuccess={handleSuccessfulPostCreation}
      />
    </div>
  );
}

export default CreatePostPage;
