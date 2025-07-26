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

const Sidebar = ({ isSidebarOpen, category, setCategory }) => {
  const mainLinks = [
    { icon: HomeIcon, label: "Home", id: 0 },
    { icon: PuzzlePieceIcon, label: "Gaming", id: 20 },
    { icon: TruckIcon, label: "Automobiles", id: 2 },
    { icon: TrophyIcon, label: "Sports", id: 17 },
    { icon: FilmIcon, label: "Entertainment", id: 24 },
    { icon: CpuChipIcon, label: "Technology", id: 28 },
    { icon: MusicalNoteIcon, label: "Music", id: 10 },
    { icon: PencilSquareIcon, label: "Blogs", id: 22 },
    { icon: NewspaperIcon, label: "News", id: 25 },
  ];

  const subscribed = [
    { name: "MrBeast", img: simon },
    { name: "Tom Cruise", img: tom },
    { name: "Megan Fox", img: megan },
  ];

  return (
    <div
      className={`${
        isSidebarOpen ? "w-54" : "w-[72px]"
      } bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white h-screen fixed transition-all duration-300 pt-2`}
    >
      {/* Main Links */}
      <div className="space-y-2">
        {mainLinks.map(({ icon:Icon, label, id }) => (
          <div
            key={label}
            onClick={() => setCategory(id)}
            className={`flex items-center px-4 py-1 rounded-lg cursor-pointer transition-colors duration-150
                        hover:bg-gray-100 dark:hover:bg-zinc-800
                        ${category === id ? "bg-gray-200 dark:bg-zinc-800 font-semibold" : ""}`}
          >
            <Icon className="h-5 w-5 text-gray-900 dark:text-white flex-shrink-0" />
            {isSidebarOpen && (
              <span className="text-[14.5px] ml-4 whitespace-nowrap transition-opacity duration-300">
                {label}
              </span>
            )}
            {!isSidebarOpen && (
              <span className="text-[14.5px] ml-4 opacity-0 absolute pointer-events-none">
                {label}
              </span>
            )}
          </div>
        ))}
        {isSidebarOpen && <hr className="my-3 border-gray-300 dark:border-zinc-700" />}
      </div>

      <div className="space-y-[2px]">
        {isSidebarOpen && (
          <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white mb-2 px-4">
            Subscriptions
          </h3>
        )}
        {subscribed.map((sub, index) => (
          <div
            key={index}
            className="flex items-center px-4 py-2 rounded-lg cursor-pointer transition-colors duration-150
                        hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <img
              src={sub.img}
              alt={sub.name}
              className="h-6 w-6 rounded-full object-cover flex-shrink-0"
            />
            {isSidebarOpen && (
              <span className="text-[14.5px] ml-4 whitespace-nowrap transition-opacity duration-300">
                {sub.name}
              </span>
            )}
            {!isSidebarOpen && (
              <span className="text-[14.5px] ml-4 opacity-0 absolute pointer-events-none">
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