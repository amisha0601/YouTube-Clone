import React from "react";
import { Link } from "react-router-dom";
import thumbnails from "./Thumbnails";

const Feed = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {thumbnails.map((video, index) => (
        <Link
          key={index}
          to={`/video/yt/${index}`}
          className="cursor-pointer"
        >
          <img
            src={video.thumbnail}
            alt="thumbnail"
            className="rounded-xl mb-2 w-full"
          />
          <div className="px-1 space-y-1">
            <h2 className="text-sm font-semibold text-black line-clamp-2">
              {video.title}
            </h2>
            <h3 className="text-sm text-gray-700">{video.channel}</h3>
            <p className="text-sm text-gray-500">{video.stats}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Feed;
