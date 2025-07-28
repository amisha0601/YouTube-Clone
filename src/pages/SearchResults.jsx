import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { API_KEY } from "../data";
import moment from "moment";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSearchResults() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&regionCode=IN&key=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const filteredResults = data.items.filter(
          (item) => item.id.kind === "youtube#video"
        );

        setSearchResults(filteredResults);
      } catch (err) {
        console.error("Error fetching search results:", err);
        setError("Failed to load search results. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    if (query) {
      fetchSearchResults();
    } else {
      setSearchResults([]);
      setLoading(false);
    }
  }, [query]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-700 dark:text-gray-300">
        Loading search results...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600 dark:text-red-400 text-lg font-semibold text-center p-4">
        Error: {error}
      </div>
    );
  }

  if (!searchResults.length && query) {
    return (
      <div className="p-4 text-center text-gray-600 dark:text-gray-400 text-lg">
        No videos found for "{query}". Try a different search term.
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-zinc-900 dark:text-white transition-colors duration-300">
      <h1 className="text-lg md:text-xl font-bold mb-6 text-gray-800 dark:text-white text-center sm:text-left pl-14">
        Search Results for "{query}"
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-7 px-14 py-4">
        {searchResults.map((item) => (
          <Link
            key={item.id.videoId}
            to={`/video/${item.snippet.categoryId || "0"}/${item.id.videoId}`}
            className="rounded-md transition-all duration-150"
          >
            <img
              src={item.snippet.thumbnails.medium.url}
              alt={item.snippet.title}
              className="w-full h-[140px] object-cover rounded-md transition-transform duration-200 ease-in-out hover:scale-[1.01]"
            />
            <div className="mt-2 px-1 flex flex-col gap-[2px]">
              <h2 className="text-sm font-medium text-neutral-800 dark:text-neutral-200 line-clamp-2">
                {item.snippet.title}
              </h2>
              <h3 className="text-xs font-medium text-neutral-700 dark:text-neutral-300 line-clamp-1">
                {item.snippet.channelTitle}
              </h3>
              <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                {moment(item.snippet.publishedAt).fromNow()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;