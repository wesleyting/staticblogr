import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import UpdateBlogPost from "../components/UpdateBlogPost";

function UpdatePostPage({ apiUrl }) {
  const { postId } = useParams();
  const navigate = useNavigate();

  const handleSuccessfulPostUpdate = () => {
    navigate(`/blog/${postId}`);
  };

  return (
    <div className="max-w-3xl mx-auto my-8">
      <h1 className="text-4xl font-bold mb-8">Update Blog Post</h1>
      <div className="bg-white shadow-md rounded p-6">
        <UpdateBlogPost
          apiUrl={apiUrl}
          postId={postId}
          onSuccess={handleSuccessfulPostUpdate}
        />
      </div>
    </div>
  );
}

export default UpdatePostPage;
