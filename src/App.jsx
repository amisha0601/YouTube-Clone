import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Video from "./pages/Video";
import { Route, Routes } from "react-router-dom";

function App() {
  const [sidebar, setSidebar] = useState(true);

  return (
    <div>
      <Navbar setSidebar={setSidebar} />
      <Routes>
        <Route path="/" element={<Home sidebar={sidebar} />}>
        </Route>

        <Route path="/video/:categoryId/:videoId" element={<Video />}>   
        </Route>
      </Routes>
    </div>
  );
}

export default App;
