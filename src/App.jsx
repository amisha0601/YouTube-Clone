import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Video from "./pages/Video";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/video/:categoryId/:videoId" element={<Video/>}></Route>
      </Routes>
    </div>
  );
}

export default App;