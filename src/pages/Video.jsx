import React from "react";
import PlayVideo from "../components/PlayVideo";
import Recommended from "../components/Recommended";

const Video = () => {
  return (
    <div className="flex flex-col lg:flex-row p-4 gap-4">
      <div className="flex-[3]">
        <PlayVideo />
      </div>
      <div className="flex-[1]">
        <Recommended />
      </div>
    </div>
  );
};

export default Video;
