import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateBlogPostForm from "./components/CreateBlogPostForm";
import BlogPostList from "./components/BlogPostList";
import BlogPost from "./components/BlogPost";
import { API_URL } from "./globals/config";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <CreateBlogPostForm apiUrl={API_URL} />
                <hr />
                <BlogPostList apiUrl={API_URL} />
              </>
            }
          />
          <Route
            path="/blogposts/:id"
            element={<BlogPost apiUrl={API_URL} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
