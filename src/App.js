import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Blog from "./template/Blog";
import CreatePostPage from "./pages/CreatePostPage";
import BlogPostPage from "./pages/BlogPostPage"; // Import the BlogPostPage component
import { API_URL } from "./globals/config";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Blog />} />
          <Route
            path="/create-post"
            element={<CreatePostPage apiUrl={API_URL} />}
          />
          <Route
            path="/blog/:postId" // Add the route for the BlogPostPage component
            element={<BlogPostPage />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
