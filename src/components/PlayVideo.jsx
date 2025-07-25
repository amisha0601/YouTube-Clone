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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVideoData = async () => {
    setLoading(true);
    setError(null);

    try {
      const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
      const res = await fetch(videoDetails_url);

      if (!res.ok) {
        throw new Error(`Failed to fetch video details: ${res.status}`);
      }
      const data = await res.json();

      if (data.items && data.items.length > 0) {
        setApiData(data.items[0]);
      } else {
        setError("Video not found or unavailable.");
        setApiData(null);
        setLoading(false);
        return;
      }

      const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
      const commentRes = await fetch(comment_url);

      if (!commentRes.ok) {
        console.warn(`Failed to fetch comments: ${commentRes.status}`);
        setCommentData([]);
      } else {
        const commentsJson = await commentRes.json();
        if (commentsJson.items) {
          setCommentData(commentsJson.items);
        } else {
          setCommentData([]);
        }
      }
    } catch (err) {
      console.error("Error in fetchVideoData:", err);
      setError("Failed to load video content. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const fetchOtherData = async () => {
    if (!apiData || !apiData.snippet?.channelId) {
      setChannelData(null);
      return;
    }

    try {
      const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
      const res = await fetch(channelData_url);

      if (!res.ok) {
        console.warn(`Failed to fetch channel details: ${res.status}`);
        setChannelData(null);
        return;
      }
      const data = await res.json();

      if (data.items && data.items.length > 0) {
        setChannelData(data.items[0]);
      } else {
        setChannelData(null);
      }
    } catch (err) {
      console.error("Error in fetchOtherData:", err);
      setChannelData(null);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchOtherData();
  }, [apiData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-700">
        Loading video details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-lg font-semibold text-center p-4">
        Error: {error}
      </div>
    );
  }

  if (!apiData) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg font-semibold">
        Video content could not be loaded. It might be private or deleted.
      </div>
    );
  }

  return (
    <div className="px-3 md:px-4 lg:px-8 py-4 bg-white text-gray-800">
      <div className="relative w-full pb-[56.25%] mb-4 rounded-lg overflow-hidden shadow-lg">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
          title={apiData.snippet.title || "YouTube Video"}
        ></iframe>
      </div>

      <h2 className="text-xl md:text-2xl font-semibold mt-4 mb-2 leading-tight text-gray-900">
        {apiData.snippet.title}
      </h2>

      <div className="flex justify-between flex-wrap gap-3 items-center text-sm text-gray-700 mb-4">
        <p>
          {value_converter(apiData.statistics.viewCount)} views ·{" "}
          {moment(apiData.snippet.publishedAt).fromNow()}
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors">
            <HandThumbUpIcon className="w-5 h-5" />
            {value_converter(apiData.statistics.likeCount)}
          </span>
          <span className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors">
            <HandThumbDownIcon className="w-5 h-5" />
          </span>
          <span className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors">
            <ShareIcon className="w-5 h-5" /> Share
          </span>
          <span className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors">
            <BookmarkIcon className="w-5 h-5" /> Save
          </span>
        </div>
      </div>

      <hr className="my-4 border-gray-300" />

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          {channelData?.snippet?.thumbnails?.default?.url && (
            <img
              src={channelData.snippet.thumbnails.default.url}
              alt={apiData.snippet.channelTitle}
              className="w-10 h-10 rounded-full object-cover shadow-sm"
            />
          )}
          <div>
            <p className="font-semibold text-gray-900">
              {apiData.snippet.channelTitle}
            </p>
            <p className="text-xs font-medium text-gray-800">
              {channelData
                ? value_converter(channelData.statistics.subscriberCount)
                : "N/A"}{" "}
              subscribers
            </p>
          </div>
        </div>
        <button className="bg-red-600 hover:bg-red-700 text-white text-sm px-5 py-2 rounded-full transition-colors duration-200 shadow-md">
          Subscribe
        </button>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-800 whitespace-pre-line shadow-inner">
        <p>
          {apiData.snippet.description
            ? apiData.snippet.description.slice(0, 450) +
              (apiData.snippet.description.length > 450 ? "..." : "")
            : "No description available for this video."}
        </p>
      </div>

      <hr className="my-5 border-gray-300" />

      <h4 className="text-lg font-semibold mb-3 text-gray-900">
        {apiData.statistics.commentCount
          ? value_converter(apiData.statistics.commentCount)
          : "0"}
        Comments
      </h4>

      {commentData.length > 0 ? (
        commentData.map((item) => {
          const comment = item.snippet.topLevelComment.snippet;
          return (
            <div
              key={item.id || comment.authorChannelId?.value || comment.authorDisplayName + comment.publishedAt}
              className="flex gap-3 mb-4 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <img
                src={comment.authorProfileImageUrl}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                alt={comment.authorDisplayName}
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/32x32/cccccc/000000?text=User"; }}
              />
              <div>
                <h3 className="font-medium text-xs text-gray-800">
                  {comment.authorDisplayName}
                  <span className="text-gray-500 text-xs ml-2">
                    {moment(comment.publishedAt).fromNow()}
                  </span>
                </h3>
                <p className="text-gray-800 text-sm mt-1">{comment.textDisplay}</p>
                <div className="flex gap-3 mt-2 text-xs text-gray-600">
                  <span className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors">
                    <HandThumbUpIcon className="w-4 h-4" />
                    {value_converter(comment.likeCount)}
                  </span>
                  <span className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors">
                    <HandThumbDownIcon className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-gray-500 text-sm italic">No comments to display.</p>
      )}
    </div>
  );
};

export default PlayVideo;
