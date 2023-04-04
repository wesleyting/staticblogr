import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Blog from "./template/Blog";
import CreatePostPage from "./pages/CreatePostPage";
import BlogPostPage from "./pages/BlogPostPage";
import UpdatePostPage from "./pages/UpdatePostPage";
import BlogPostListPage from "./pages/BlogPostListPage";
import { useState, useEffect } from "react";
import { API_URL } from "./globals/config";
import BottomBar from "./components/BottomBar";
import StopEditing from "./components/StopEditing";

function App() {
  const [editingMode, setEditingMode] = useState(false);

  const handleStartEditing = () => {
    setEditingMode(true);
  };

  useEffect(() => {
    const editingModeFromStorage = localStorage.getItem("editingMode");
    if (editingModeFromStorage) {
      setEditingMode(true);
    }
  }, []);

  useEffect(() => {
    if (editingMode) {
      localStorage.setItem("editingMode", "true");
    }
  }, [editingMode]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Blog />} />
          <Route
            path="/create-post"
            element={<CreatePostPage apiUrl={API_URL} />}
          />
          <Route path="/blog/:postId" element={<BlogPostPage />} />
          <Route
            path="/edit-post/:postId"
            element={<UpdatePostPage apiUrl={API_URL} />}
          />
          <Route
            path="/blog-posts"
            element={<BlogPostListPage apiUrl={API_URL} />}
          />
        </Routes>
        {editingMode && (
          <div className="fixed bottom-28 right-12">
            <StopEditing setEditingMode={setEditingMode} />
          </div>
        )}
        {!editingMode && (
          <div className="fixed bottom-20 right-12">
            <button
              className="bg-green-500 hover:bg-green-700 text-white text-2xl font-bold py-4 px-6 rounded"
              onClick={handleStartEditing}
            >
              Start Editing
            </button>
          </div>
        )}
        {editingMode && <BottomBar />}
      </div>
    </Router>
  );
}

export default App;
