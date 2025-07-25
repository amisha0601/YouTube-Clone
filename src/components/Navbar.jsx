import React, { useState } from "react";
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
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className="flex items-center justify-between px-4 py-2 h-14 sm:h-16 w-full sticky top-0 bg-white z-50 shadow-sm">
      {/* LEFT SECTION */}
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

      {/* MIDDLE SECTION - SEARCH BAR */}
      <div className="flex-grow mx-4 max-w-[600px] hidden sm:flex items-center justify-center">
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
            onClick={handleSearch}
            className="bg-gray-100 px-4 flex items-center justify-center"
          >
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        <div className="ml-3 bg-gray-100 p-2 rounded-full cursor-pointer">
          <MicrophoneIcon className="h-5 w-5 text-gray-600" />
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center space-x-4 min-w-[130px] justify-end">
        <VideoCameraIcon className="h-6 w-6 text-gray-700 cursor-pointer hidden sm:inline" />
        <EllipsisVerticalIcon className="h-6 w-6 text-gray-700 cursor-pointer hidden sm:inline" />
        <BellIcon className="h-6 w-6 text-gray-700 cursor-pointer" />
        <img
          src={profile_icon}
          alt="User"
          className="h-8 w-8 rounded-full object-cover"
        />
      </div>
    </nav>
  );
};

export default Navbar;
