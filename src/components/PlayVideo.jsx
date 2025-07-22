import React from "react";
import videoFile from "../assets/clone_assets/video.mp4";
import like from "../assets/clone_assets/like.png";
import dislike from "../assets/clone_assets/dislike.png";
import share from "../assets/clone_assets/share.png";
import save from "../assets/clone_assets/save.png";
import jack from "../assets/clone_assets/jack.png";
import profile from "../assets/clone_assets/user_profile.jpg";

const PlayVideo = () => {
  return (
    <div>
      <video src={videoFile} controls autoPlay muted className="w-full rounded-lg" />
      <h2 className="text-xl font-semibold mt-4 mb-2">Best YouTube channel to learn web development</h2>

      <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
        <p>1,525 views · 2 days ago</p>
        <div className="flex gap-4">
          <span className="flex items-center gap-1"><img src={like} className="w-5" /> 125</span>
          <span className="flex items-center gap-1"><img src={dislike} className="w-5" /> 2</span>
          <span className="flex items-center gap-1"><img src={share} className="w-5" /> Share</span>
          <span className="flex items-center gap-1"><img src={save} className="w-5" /> Save</span>
        </div>
      </div>

      <hr className="my-3" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={jack} alt="publisher" className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-semibold">CodeWithAmisha</p>
            <p className="text-xs text-gray-500">1M subscribers</p>
          </div>
        </div>
        <button className="bg-red-600 text-white px-4 py-1 rounded">Subscribe</button>
      </div>

      <div className="mt-4 space-y-2 text-sm text-gray-700">
        <p>Channel that makes learning easy</p>
        <p>Subscribe to CodeWithAmisha for web development tutorials</p>
      </div>

      <hr className="my-4" />

      <h4 className="text-lg font-semibold mb-3">130 Comments</h4>

      {[1, 2].map((_, i) => (
        <div key={i} className="flex gap-3 mb-4">
          <img src={profile} className="w-10 h-10 rounded-full" />
          <div>
            <h3 className="font-semibold text-sm">
              Jack Nicolson <span className="text-gray-500 text-xs ml-2">1 day ago</span>
            </h3>
            <p className="text-gray-700 text-sm mt-1">
              A global computer network providing a variety of info and protocols.
            </p>
            <div className="flex gap-3 mt-2 text-sm text-gray-600">
              <span className="flex items-center gap-1"><img src={like} className="w-4" /> 244</span>
              <span><img src={dislike} className="w-4" /></span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayVideo;
