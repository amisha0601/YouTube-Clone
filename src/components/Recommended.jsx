import React, { useEffect, useState } from "react";
import { API_KEY } from "../data";
import { value_converter } from "../data";
import { Link } from "react-router-dom";

const Recommended = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${categoryId}&key=${API_KEY}`;
    const res = await fetch(relatedVideo_url);
    const data = await res.json();
    setApiData(data.items);
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  return (
    <div className="flex flex-col gap-4">
      {apiData.map((item, index) => (
        <Link
          to={`/video/${item.snippet.categoryId}/${item.id}`}
          key={index}
          className="flex gap-2 w-full hover:bg-gray-100 p-2 rounded-sm transition-all duration-150"
        >
          <img
            src={item.snippet.thumbnails.medium.url}
            alt={item.snippet.title}
            className="w-44 h-25 object-cover rounded-sm flex-shrink-0"
          />
          <div className="flex flex-col justify-between overflow-hidden">
            <h4 className="text-sm font-semibold text-neutral-700 line-clamp-3">
              {item.snippet.title}
            </h4>
            <p className="text-xs -mt-1 text-neutral-600 line-clamp-1">
              {item.snippet.channelTitle}
            </p>
            <p className="text-xs font-semibold text-neutral-600 -mt-1">
              {value_converter(item.statistics.viewCount)} views
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Recommended;
