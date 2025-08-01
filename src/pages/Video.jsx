import React from "react";
import PlayVideo from "../components/PlayVideo";
import Recommended from "../components/Recommended";
import { useParams } from "react-router-dom";

const Video = () => {

  const {videoId, categoryId} = useParams();

  return (
    <div className="flex flex-col lg:flex-row p-4 gap-4 bg-[#f9f9f9] dark:bg-zinc-900 dark:text-white transition-colors duration-300">
      <div className="flex-[3]">
        <PlayVideo videoId={videoId}/>
      </div>
      <div className="flex-[1]">
        <Recommended categoryId={categoryId}/>
      </div>
    </div>
  );
};

export default Video;