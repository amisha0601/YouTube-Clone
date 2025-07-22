import React from "react";
import thumbnails from "./Thumbnails"; // 12 thumbnail objects exported from here

const Recommended = () => {
  return (
    <div className="space-y-4">
      {thumbnails.slice(0, 12).map((video, index) => (
        <div key={index} className="flex gap-3 cursor-pointer">
          {/* Thumbnail Image */}
          <img
            src={video.thumbnail}
            alt={`Thumbnail ${index + 1}`}
            className="w-40 h-24 rounded-lg object-cover"
          />

          {/* Video Info */}
          <div className="flex flex-col">
            <h4 className="text-sm font-semibold text-black line-clamp-2">
              {video.title}
            </h4>
            <p className="text-sm text-gray-600">{video.channel}</p>
            <p className="text-sm text-gray-400">{video.stats}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recommended;
