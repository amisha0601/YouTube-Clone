import React from "react";
import thumbnail1 from "../assets/clone_assets/thumbnail1.png";
import thumbnail2 from "../assets/clone_assets/thumbnail2.png";
import thumbnail3 from "../assets/clone_assets/thumbnail3.png";
import thumbnail4 from "../assets/clone_assets/thumbnail4.png";
import thumbnail5 from "../assets/clone_assets/thumbnail5.png";
import thumbnail6 from "../assets/clone_assets/thumbnail6.png";
import thumbnail7 from "../assets/clone_assets/thumbnail7.png";
import thumbnail8 from "../assets/clone_assets/thumbnail8.png";

const videos = [
  {
    thumbnail: thumbnail1,
    title: "Exploring the Beauty of Nature in 4K | Travel Vlog",
    channel: "Nature Vlogs",
    stats: "2.4M views · 3 days ago",
  },
  {
    thumbnail: thumbnail2,
    title: "Mastering React in 2025: Full Crash Course",
    channel: "CodeWithAmisha",
    stats: "1.1M views · 1 week ago",
  },
  {
    thumbnail: thumbnail3,
    title: "Top 10 Mind-blowing Science Facts!",
    channel: "Science World",
    stats: "980K views · 2 days ago",
  },
  {
    thumbnail: thumbnail4,
    title: "5 Minute Crafts You Never Knew You Needed",
    channel: "Crafty Ideas",
    stats: "3.2M views · 5 days ago",
  },
  {
    thumbnail: thumbnail5,
    title: "India vs Pakistan Full Highlights | 2025",
    channel: "Cricket Central",
    stats: "4.8M views · 12 hours ago",
  },
  {
    thumbnail: thumbnail6,
    title: "How to Start Coding from Zero in 2025",
    channel: "Developer's Mind",
    stats: "856K views · 4 days ago",
  },
  {
    thumbnail: thumbnail7,
    title: "Making Street Food at Home! Mumbai Edition",
    channel: "Food Lover",
    stats: "2.7M views · 6 days ago",
  },
  {
    thumbnail: thumbnail8,
    title: "iPhone 17 Unboxing & First Impressions!",
    channel: "Techy Amisha",
    stats: "3.4M views · 2 days ago",
  },

  // 🔁 Reuse thumbnails + change title/channel for remaining 12 cards
  {
    thumbnail: thumbnail1,
    title: "Relaxing Piano Music to Sleep/Study",
    channel: "Peaceful Tunes",
    stats: "1.3M views · 2 weeks ago",
  },
  {
    thumbnail: thumbnail2,
    title: "Best Coding Laptops in 2025",
    channel: "TechReviews",
    stats: "745K views · 5 days ago",
  },
  {
    thumbnail: thumbnail3,
    title: "How Planets Were Formed | Space Docu",
    channel: "Astro Talk",
    stats: "634K views · 1 day ago",
  },
  {
    thumbnail: thumbnail4,
    title: "Creative DIY Wall Decor Ideas!",
    channel: "Decor Duniya",
    stats: "953K views · 3 days ago",
  },
  {
    thumbnail: thumbnail5,
    title: "Match Highlights: Final Over Thriller!",
    channel: "Sports Mania",
    stats: "2.1M views · 10 hours ago",
  },
  {
    thumbnail: thumbnail6,
    title: "Web Dev in 2025 - What's New?",
    channel: "CodeStack",
    stats: "678K views · 3 days ago",
  },
  {
    thumbnail: thumbnail7,
    title: "Exploring Delhi Street Food - Under ₹50",
    channel: "Bite India",
    stats: "3.9M views · 1 week ago",
  },
  {
    thumbnail: thumbnail8,
    title: "Samsung Fold 6 Unboxing & Review",
    channel: "GadgetPro",
    stats: "2.5M views · 3 days ago",
  },
  {
    thumbnail: thumbnail1,
    title: "Mountain Views & Snow Trek Vlog",
    channel: "Wander India",
    stats: "487K views · 2 days ago",
  },
  {
    thumbnail: thumbnail2,
    title: "JavaScript ES2025 Features Explained",
    channel: "Frontend Dose",
    stats: "340K views · 4 days ago",
  },
  {
    thumbnail: thumbnail3,
    title: "10 Weird Facts About The Ocean",
    channel: "NatureSphere",
    stats: "921K views · 5 days ago",
  },
  {
    thumbnail: thumbnail4,
    title: "DIY Gifts Under ₹100 - Last Minute Ideas",
    channel: "Giftastic",
    stats: "450K views · 6 hours ago",
  },
];

const Feed = () => {
  return (
    <div className="p-4 bg-white min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video, index) => (
          <div key={index} className="cursor-pointer">
            <img
              src={video.thumbnail}
              alt="Video thumbnail"
              className="w-full h-auto rounded-xl mb-2"
            />
            <div className="flex flex-col gap-[2px] px-[2px]">
              <h2 className="text-sm font-semibold text-black leading-snug line-clamp-2">
                {video.title}
              </h2>
              <h3 className="text-sm text-gray-700">{video.channel}</h3>
              <p className="text-sm text-gray-500">{video.stats}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
