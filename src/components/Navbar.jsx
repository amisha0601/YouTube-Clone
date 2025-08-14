import React, { useState, useRef, useEffect } from "react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  VideoCameraIcon,
  BellIcon,
  MicrophoneIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { useNavigate, Link } from "react-router-dom";

import profile_icon from "../assets/clone_assets/amishapfp.jpg";
import logo from "../assets/clone_assets/YouTube_Logo.svg";
import logo2 from "../assets/clone_assets/Youtube_Dark_Logo.svg";

const Navbar = ({ setSidebar, currentTheme, onThemeToggle }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [cameraStatus, setCameraStatus] = useState("");
  const [showCameraFeed, setShowCameraFeed] = useState(false);
  const videoRef = useRef(null);
  const currentStream = useRef(null);
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const dummyNotifications = [
    { id: 1, message: "New video from WeAllCode!! 'React Basics'" },
    { id: 2, message: "Your comment on 'JS Tutorial' received 8 likes." },
    {
      id: 3,
      message: "Live: Coding Stream by CodeWithAmisha is starting soon!",
    },
  ];
  const notificationsRef = useRef(null);

  const [showZoomedPfp, setShowZoomedPfp] = useState(false);
  const pfpZoomRef = useRef(null);


  useEffect(() => {
    const handleClickOutsideNotifications = (event) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };
    const handleClickOutsidePfpZoom = (event) => {
      if (pfpZoomRef.current && !pfpZoomRef.current.contains(event.target)) {
        setShowZoomedPfp(false);
      }
    };

    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutsideNotifications);
    } else {
      document.removeEventListener(
        "mousedown",
        handleClickOutsideNotifications
      );
    }

    if (showZoomedPfp) {
      document.addEventListener("mousedown", handleClickOutsidePfpZoom);
    } else {
      document.removeEventListener("mousedown", handleClickOutsidePfpZoom);
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutsideNotifications
      );
      document.removeEventListener("mousedown", handleClickOutsidePfpZoom);
    };
  }, [showNotifications, showZoomedPfp]);

  useEffect(() => {
    const startCamera = async () => {
      if (showCameraFeed) {
        setCameraStatus("Requesting camera access...");
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          currentStream.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
          setCameraStatus("Camera active!");
         
          setTimeout(() => setCameraStatus(""), 3000);
        } catch (error) {
          console.error("Error accessing camera:", error);
          if (error.name === "NotAllowedError") {
            setCameraStatus(
              "Camera access denied. Please allow in browser settings."
            );
          } else if (error.name === "NotFoundError") {
            setCameraStatus("No camera found.");
          } else {
            setCameraStatus("Failed to access camera.");
          }
          setShowCameraFeed(false);
          setTimeout(() => setCameraStatus(""), 5000);
        }
      } else {
       
        if (currentStream.current) {
          currentStream.current.getTracks().forEach((track) => track.stop());
          currentStream.current = null;
        }
      }
    };

    startCamera();
    
    
    return () => {
      if (currentStream.current) {
        currentStream.current.getTracks().forEach((track) => track.stop());
        currentStream.current = null;
      }
    };
  }, [showCameraFeed]); 
  
  const handleVideoCameraClick = () => {
    setShowCameraFeed(!showCameraFeed);
    if(showCameraFeed) {
      setCameraStatus("Camera closed.");
      setTimeout(() => setCameraStatus(""), 2000);
    }
  };

  const handleSearch = (queryToSearch = searchQuery) => {
    if (queryToSearch.trim()) {
      navigate(`/search?q=${encodeURIComponent(queryToSearch.trim())}`);
      setSearchQuery("");
    }
  };

  const handleVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("Voice search not supported by this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

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

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  const handlePfpClick = () => {
    setShowZoomedPfp(true);
  };

  const closePfpZoom = () => {
    setShowZoomedPfp(false);
  };

  return (
    <nav
      className="flex items-center justify-between px-4 py-2 h-14 sm:h-16 w-full sticky top-0 shadow-sm
                  bg-white text-gray-800 dark:bg-zinc-900 dark:text-white dark:shadow-lg dark:shadow-zinc-950/20 z-50 transition-colors duration-300"
    >
      <div className="flex items-center space-x-4 min-w-[130px]">
        <Link to="/">
          <Bars3Icon
            data-testid="menu-icon"
            className="h-6 w-6 cursor-pointer"
            onClick={() => setSidebar((prev) => !prev)}
          />
        </Link>

        <Link to="/">
          {currentTheme === "light" ? (
            <img src={logo} alt="YouTube" className="h-6 sm:h-6 w-auto" />
          ) : (
            <img
              src={logo2}
              alt="YouTube Dark Mode"
              className="h-26 sm:h-26 w-auto"
            />
          )}
        </Link>
      </div>

      <div className="flex-grow mx-4 max-w-[600px] hidden sm:flex items-center justify-center relative">
        <div className="flex w-full max-w-[500px] h-10 border border-gray-300 dark:border-zinc-700 rounded-full overflow-hidden">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-grow px-4 text-sm focus:outline-none bg-white text-gray-800 dark:bg-zinc-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          <button
            onClick={() => handleSearch()}
            className="bg-gray-100 dark:bg-zinc-700 px-4 flex items-center justify-center border-l border-gray-300 dark:border-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-600 transition-colors"
          >
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <button
          onClick={handleVoiceSearch}
          className={`ml-3 p-2 rounded-full cursor-pointer transition-colors duration-200
                      ${
                        isVoiceListening
                          ? "bg-red-200 text-red-700 dark:bg-red-800 dark:text-red-200"
                          : "bg-gray-100 text-gray-600 dark:bg-zinc-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-600"
                      }`}
        >
          <MicrophoneIcon className="h-5 w-5" />
        </button>
        {cameraStatus && (
          <div className="absolute top-full mt-2 p-2 bg-white dark:bg-zinc-700 text-black dark:text-white text-xs rounded shadow-md z-5 whitespace-nowrap">
            {cameraStatus}
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4 min-w-[130px] justify-end relative">
        <button
          onClick={handleVoiceSearch}
          className={`p-2 rounded-full cursor-pointer transition-colors duration-200 block sm:hidden
                      ${
                        isVoiceListening
                          ? "bg-red-200 text-red-700 dark:bg-red-800 dark:text-red-200"
                          : "bg-gray-100 text-gray-600 dark:bg-zinc-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-600"
                      }`}
        >
          <MicrophoneIcon className="h-5 w-5" />
        </button>

        <VideoCameraIcon
          className={`h-6 w-6 cursor-pointer hidden sm:inline transition-colors duration-200
                      ${
                        showCameraFeed
                          ? "text-red-500"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
          onClick={handleVideoCameraClick}
        />

        <div className="relative hidden sm:block">
          <BellIcon
            className="h-6 w-6 text-gray-700 dark:text-gray-300 cursor-pointer"
            onClick={toggleNotifications}
          />
          {dummyNotifications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs/tight font-semibold rounded-full h-3.5 w-3.5 flex items-center justify-center">
              {dummyNotifications.length}
            </span>
          )}
        </div>

        {showNotifications && (
          <div
            ref={notificationsRef}
            className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-zinc-800 rounded-lg shadow-2xl/80 z-50
                        border border-gray-300 dark:border-zinc-700 overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-gray-200 dark:border-zinc-700 flex justify-between items-center shadow-lg">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Notifications
              </h3>
            </div>
            {dummyNotifications.length > 0 && (
              <ul className="divide-y divide-gray-200 dark:divide-zinc-700">
                {dummyNotifications.map((notif) => (
                  <li
                    key={notif.id}
                    className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-zinc-700 cursor-pointer shadow-lg"
                  >
                    <p className="text-sm text-gray-800 dark:text-gray-200 line-clamp-2 ">
                      {notif.message}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <button
          onClick={onThemeToggle}
          className="p-2 rounded-full cursor-pointer text-gray-700 dark:text-gray-300
                      hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors duration-200"
          aria-label={
            currentTheme === "light"
              ? "Switch to Dark Mode"
              : "Switch to Light Mode"
          }
        >
          {currentTheme === "light" ? (
            <MoonIcon className="h-6 w-6" />
          ) : (
            <SunIcon className="h-6 w-6" />
          )}
        </button>

        <img
          src={profile_icon}
          alt="User Profile"
          className="h-8 w-8 rounded-full object-cover cursor-pointer"
          onClick={handlePfpClick}
        />
      </div>

     {showCameraFeed && (
  <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
    <div className="relative w-full h-full ">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
      ></video>
      <button
        onClick={handleVideoCameraClick}
        className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white px-2 py-1.5 rounded-md  z-10"
      >
        Close Camera
      </button>
    </div>
  </div>
)}

      {showZoomedPfp && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[100] cursor-pointer"
          onClick={closePfpZoom}
        >
          <div
            ref={pfpZoomRef}
            className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px]
                        rounded-full overflow-hidden shadow-2xl border-2 border-white dark:border-gray-700
                        transform scale-100 transition-transform duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={profile_icon}
              alt="Zoomed User Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;