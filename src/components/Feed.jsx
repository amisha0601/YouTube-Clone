import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_KEY } from "../data";
import { value_converter } from "../data";
import moment from "moment";

const Feed = ({ category }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}`;
    await fetch(videoList_url)
      .then((response) => response.json())
      .then((data) => setData(data.items));
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-8 px-5 py-6">
      {data.map((item, index) => (
        <Link
          key={index}
          to={`video/${item.snippet.categoryId}/${item.id}`}
          className="rounded-md transition-all duration-150"
        >
          <img
            src={item.snippet.thumbnails.medium.url}
            alt={item.snippet.title}
            className="w-full h-[140px] object-cover rounded-md transition-transform duration-200 ease-in-out hover:scale-[1.01]"
          />
          <div className="mt-2 px-1 flex flex-col gap-[2px]">
            
            <h2 className="text-sm font-medium text-neutral-800 dark:text-neutral-200 line-clamp-2 ">
              {item.snippet.title}
            </h2>
            <h3 className="text-xs font-medium text-neutral-700 dark:text-neutral-300 line-clamp-1">
              {item.snippet.channelTitle}
            </h3>
            <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
              {value_converter(item.statistics.viewCount)} views •{" "}
              {moment(item.snippet.publishedAt).fromNow()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Feed;