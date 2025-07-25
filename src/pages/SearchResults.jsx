import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { API_KEY } from "../data";

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
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-700">
        Loading search results...
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

  if (!searchResults.length && query) {
    return (
      <div className="p-4 text-center text-gray-600 text-lg">
        No videos found for "{query}". Try a different search term.
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-4 max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
        Search Results for "{query}"
      </h1>
      {searchResults.map((item) => (
        <Link
          to={`/video/${item.snippet.categoryId || "0"}/${item.id.videoId}`}
          key={item.id.videoId}
          className="flex flex-col sm:flex-row gap-4 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer border-b border-gray-200 last:border-b-0"
        >
          {/* Video Thumbnail */}
          <img
            src={item.snippet.thumbnails.medium.url}
            alt={item.snippet.title}
            className="w-full sm:w-60 h-auto sm:h-36 object-cover rounded-lg flex-shrink-0 shadow-sm"
          />
          {/* Video Details */}
          <div className="flex flex-col text-center sm:text-left w-full">
            <h2 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-1">
              {item.snippet.title}
            </h2>
            <p className="text-gray-700 text-sm mb-1">
              {item.snippet.channelTitle}
            </p>
            <p className="text-gray-500 text-xs line-clamp-3">
              {item.snippet.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default SearchResults;
