import React from "react";
import {
  HomeIcon,
  PuzzlePieceIcon,
  TruckIcon,
  TrophyIcon,
  FilmIcon,
  CpuChipIcon,
  MusicalNoteIcon,
  PencilSquareIcon,
  NewspaperIcon,
} from "@heroicons/react/24/outline";

import simon from "../assets/clone_assets/simon.png";
import tom from "../assets/clone_assets/tom.png";
import megan from "../assets/clone_assets/megan.png";


const Sidebar = ({ isSidebarOpen }) => {
  const mainLinks = [
    { icon: HomeIcon, label: "Home" },
    { icon: PuzzlePieceIcon, label: "Gaming" },
    { icon: TruckIcon, label: "Automobiles" },
    { icon: TrophyIcon, label: "Sports" },
    { icon: FilmIcon, label: "Entertainment" },
    { icon: CpuChipIcon, label: "Technology" },
    { icon: MusicalNoteIcon, label: "Music" },
    { icon: PencilSquareIcon, label: "Blogs" },
    { icon: NewspaperIcon, label: "News" },
  ];

  const subscribed = [
    { name: "MrBeast", img: simon },
    { name: "Tom Cruise", img: tom },
    { name: "Megan Fox", img: megan },
  ];

  return (
    <div
      className={`${
        isSidebarOpen ? "w-58" : "w-[72px]" 
      } bg-white border-r border-gray-200 text-gray-900 h-screen fixed transition-all duration-300 pt-2`}
    >
      {/* Main Links */}
      <div className="space-y-2">
        {mainLinks.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center px-4 py-1 hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            <Icon className="h-5 w-5 text-gray-900 flex-shrink-0" />
            {isSidebarOpen && (
              <span className="text-[14.5px] whitespace-nowrap ml-4 transition-opacity duration-300 opacity-100">
                {label}
              </span>
            )}
            {!isSidebarOpen && (
                <span className="text-[14.5px] whitespace-nowrap ml-4 transition-opacity duration-300 opacity-0 absolute pointer-events-none">
                    {label}
                </span>
            )}
          </div>
        ))}
        {isSidebarOpen && <hr className="my-3 border-gray-300" />}
      </div>

      {/* Subscribed Section */}
      <div className="space-y-[2px]">
        {isSidebarOpen && (
          <h3 className="text-[15px] font-semibold text-gray-900 mb-2 px-4">
            Subscriptions
          </h3>
        )}
        {subscribed.map((sub, index) => (
          <div
            key={index}
            className="flex items-center px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            <img
              src={sub.img}
              alt={sub.name}
              className="h-6 w-6 rounded-full object-cover flex-shrink-0" />
            {isSidebarOpen && (
              <span className="text-[14.5px] whitespace-nowrap ml-4 transition-opacity duration-300 opacity-100">
                {sub.name}
              </span>
            )}
            {!isSidebarOpen && (
                <span className="text-[14.5px] whitespace-nowrap ml-4 transition-opacity duration-300 opacity-0 absolute pointer-events-none">
                    {sub.name}
                </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;