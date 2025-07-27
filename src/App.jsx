import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SearchResults from "./pages/SearchResults";

function App() {
  const [sidebar, setSidebar] = useState(true);

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("youtube-clone-theme");

    return savedTheme === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("youtube-clone-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div>
      <Navbar
        setSidebar={setSidebar}
        currentTheme={theme}
        onThemeToggle={toggleTheme}
      />
      <Routes>
        <Route path="/" element={<Home sidebar={sidebar} />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/video/:categoryId/:videoId" element={<Video />} />
      </Routes>
    </div>
  );
}

export default App;
