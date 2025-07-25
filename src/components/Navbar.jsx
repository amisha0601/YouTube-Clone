import React, { useState, useRef, useEffect } from "react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  VideoCameraIcon,
  BellIcon,
  EllipsisVerticalIcon,
  MicrophoneIcon,
} from "@heroicons/react/24/outline";
import { useNavigate, Link } from "react-router-dom";

import profile_icon from "../assets/clone_assets/amisha.jpg";
import logo from "../assets/clone_assets/Youtube_Logo.svg";

const Navbar = ({ setSidebar }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [cameraStatus, setCameraStatus] = useState("");
  const [showCameraFeed, setShowCameraFeed] = useState(false); 
  const videoRef = useRef(null); 
  const currentStream = useRef(null); 
  const navigate = useNavigate();


  useEffect(() => {
    return () => {
      if (currentStream.current) {
        currentStream.current.getTracks().forEach(track => track.stop());
        currentStream.current = null;
      }
    };
  }, []);

  const handleSearch = (queryToSearch = searchQuery) => {
    if (queryToSearch.trim()) {
      navigate(`/search?q=${encodeURIComponent(queryToSearch.trim())}`);
      setSearchQuery("");
    }
  };

  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("Voice search not supported by this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsVoiceListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      handleSearch(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsVoiceListening(false);
    };

    recognition.onend = () => {
      setIsVoiceListening(false);
    };

    recognition.start();
  };

  const handleVideoCameraClick = async () => {
    if (showCameraFeed) {
    
      if (currentStream.current) {
        currentStream.current.getTracks().forEach(track => track.stop());
        currentStream.current = null;
      }
      setShowCameraFeed(false);
      setCameraStatus("Camera closed.");
      setTimeout(() => setCameraStatus(""), 2000);
      return;
    }

    setCameraStatus("Requesting camera access...");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      currentStream.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraStatus("Camera active!");
      setShowCameraFeed(true);
      setTimeout(() => setCameraStatus(""), 3000);
    } catch (error) {
      console.error("Error accessing camera:", error);
      if (error.name === "NotAllowedError") {
        setCameraStatus("Camera access denied. Please allow in browser settings.");
      } else if (error.name === "NotFoundError") {
        setCameraStatus("No camera found.");
      } else {
        setCameraStatus("Failed to access camera.");
      }
      setShowCameraFeed(false); 
      setTimeout(() => setCameraStatus(""), 5000);
    }
  };

  return (
    <nav className="flex items-center justify-between px-4 py-2 h-14 sm:h-16 w-full sticky top-0 bg-white z-50 shadow-sm">
      <div className="flex items-center space-x-4 min-w-[130px]">
        <Link to="/">
          <Bars3Icon
            className="h-6 w-6 text-gray-700 cursor-pointer"
            onClick={() => setSidebar((prev) => !prev)}
          />
        </Link>

        <Link to="/">
          <img src={logo} alt="YouTube" className="h-6 sm:h-6 w-auto" />
        </Link>
      </div>

      <div className="flex-grow mx-4 max-w-[600px] hidden sm:flex items-center justify-center relative">
        <div className="flex w-full max-w-[500px] h-10 border border-gray-300 rounded-full overflow-hidden">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-grow px-4 text-sm focus:outline-none"
          />
          <button
            onClick={() => handleSearch()}
            className="bg-gray-100 px-4 flex items-center justify-center"
          >
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        <button
          onClick={handleVoiceSearch}
          className={`ml-3 p-2 rounded-full cursor-pointer transition-colors duration-200 ${
            isVoiceListening ? "bg-red-200 text-red-700" : "bg-gray-100 text-gray-600"
          }`}
        >
          <MicrophoneIcon className="h-5 w-5" />
        </button>
        {cameraStatus && (
          <div className="absolute top-full mt-2 p-2  text-black text-xs rounded shadow-md z-5 whitespace-nowrap">
            {cameraStatus}
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4 min-w-[130px] justify-end">
        <VideoCameraIcon
          className={`h-6 w-6 cursor-pointer hidden sm:inline transition-colors duration-200 ${
            showCameraFeed ? "text-red-500" : "text-gray-700" 
          }`}
          onClick={handleVideoCameraClick}
        />
        <EllipsisVerticalIcon className="h-6 w-6 text-gray-700 cursor-pointer hidden sm:inline" />
        <BellIcon className="h-6 w-6 text-gray-700 cursor-pointer" />
        <img
          src={profile_icon}
          alt="User"
          className="h-8 w-8 rounded-full object-cover"
        />
      </div>

   
      {showCameraFeed && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative bg-white p-4 rounded-lg shadow-xl max-w-lg w-full">
            <h2 className="text-lg font-bold mb-3 text-gray-900">Live Camera Feed</h2>
            <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg border border-gray-300"></video>
            <button
              onClick={handleVideoCameraClick} 
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Close Camera
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
