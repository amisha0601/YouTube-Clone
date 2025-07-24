import React, { useEffect, useState } from "react";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  ShareIcon,
  BookmarkIcon,
} from "@heroicons/react/24/solid";
import { API_KEY, value_converter } from "../data";
import moment from "moment";
import { useParams } from "react-router-dom";

const PlayVideo = () => {
  const { videoId } = useParams();
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  const fetchVideoData = async () => {
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    const res = await fetch(videoDetails_url);
    const data = await res.json();
    if (data.items && data.items.length > 0) {
      setApiData(data.items[0]);
    }

    const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
    const commentRes = await fetch(comment_url);
    const commentData = await commentRes.json();
    if (commentData.items) setCommentData(commentData.items);
  };

  const fetchOtherData = async () => {
    if (!apiData || !apiData.snippet?.channelId) return;

    const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
    const res = await fetch(channelData_url);
    const data = await res.json();
    if (data.items && data.items.length > 0) {
      setChannelData(data.items[0]);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchOtherData();
  }, [apiData]);

  return (
    <div className="px-3 md:px-4 lg:px-8 py-4 bg-white text-gray-800">
      <div className="relative w-full pb-[56.25%]">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full rounded-lg"
        ></iframe>
      </div>

      <h2 className="text-xl md:text-2xl font-semibold mt-4 mb-2 leading-tight">
        {apiData?.snippet?.title || "Title Here"}
      </h2>

      <div className="flex justify-between flex-wrap gap-3 items-center text-sm text-gray-800 mb-4">
        <p>
          {apiData ? value_converter(apiData.statistics.viewCount) : "16K"} views ·{" "}
          {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="flex items-center gap-1">
            <HandThumbUpIcon className="w-5 h-5" />
            {apiData ? value_converter(apiData.statistics.likeCount) : 155}
          </span>
          <span className="flex items-center gap-1">
            <HandThumbDownIcon className="w-5 h-5" />
          </span>
          <span className="flex items-center gap-1">
            <ShareIcon className="w-5 h-5" /> Share
          </span>
          <span className="flex items-center gap-1">
            <BookmarkIcon className="w-5 h-5" /> Save
          </span>
        </div>
      </div>

      <hr className="my-4 border-gray-300" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {channelData?.snippet?.thumbnails?.default?.url && (
            <img
              src={channelData.snippet.thumbnails.default.url}
              alt="publisher"
              className="w-10 h-10 rounded-full"
            />
          )}
          <div>
            <p className="font-semibold text-gray-900">
              {apiData?.snippet?.channelTitle || ""}
            </p>
            <p className="text-xs font-medium text-gray-800">
              {channelData
                ? value_converter(channelData.statistics.subscriberCount)
                : "1M"}{" "}
              subscribers
            </p>
          </div>
        </div>
        <button className="bg-red-600 hover:bg-red-700 text-white text-sm px-5 py-2 rounded-full transition">
          Subscribe
        </button>
      </div>

      <div className="mt-4 text-sm text-gray-800 whitespace-pre-line">
        <p>
          {apiData?.snippet?.description
            ? apiData.snippet.description.slice(0, 450)
            : "Description Here"}
        </p>
      </div>

      <hr className="my-5 border-gray-300" />

      <h4 className="text-lg font-semibold mb-3">
        {apiData ? value_converter(apiData.statistics.commentCount) : 102} Comments
      </h4>

      {commentData?.map((item, index) => {
        const comment = item.snippet.topLevelComment.snippet;
        return (
          <div key={index} className="flex gap-3 mb-2">
            <img
              src={comment.authorProfileImageUrl}
              className="w-8 h-8 rounded-full"
              alt="commenter"
            />
            <div>
              <h3 className="font-medium text-xs text-gray-800">
                {comment.authorDisplayName}
                <span className="text-gray-500 text-xs ml-2">1 day ago</span>
              </h3>
              <p className="text-gray-800 text-sm mt-1">{comment.textDisplay}</p>
              <div className="flex gap-3 mt-2 text-xs text-gray-600">
                <span className="flex items-center gap-1">
                  <HandThumbUpIcon className="w-4 h-4" />
                  {value_converter(comment.likeCount)}
                </span>
                <span>
                  <HandThumbDownIcon className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlayVideo;

