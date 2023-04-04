import React from "react";
import CreateBlogPost from "../components/CreateBlogPostForm";
import { useNavigate } from "react-router-dom";

function CreatePostPage({ apiUrl }) {
  const navigate = useNavigate();

  const handleSuccessfulPostCreation = (postId) => {
    navigate(`/blog/${postId}`);
  };

  return (
    <div className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Create a New Blog Post</h1>
      <div className="bg-white shadow-md rounded p-6">
        <CreateBlogPost
          apiUrl={apiUrl}
          onSuccess={handleSuccessfulPostCreation}
        />
      </div>
    </div>
  );
}

export default CreatePostPage;
