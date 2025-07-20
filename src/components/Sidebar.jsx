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

const Sidebar = ({ isOpen }) => {
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
        isOpen ? "block" : "hidden"
      } sm:block w-64 bg-white border-r border-gray-200 text-gray-900 p-2 fixed sm:relative z-50`}
      style={{ overflow: "hidden" }} // 👈 No scroll
    >
      {/* Main Links */}
      <div className="space-y-[5px]"> {/* 👈 Reduced spacing */}
        {mainLinks.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center space-x-3 px-2 py-1.5 hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            <Icon className="h-5 w-5 text-gray-900" /> {/* 👈 Slightly smaller icon */}
            <span className="text-[14.5px]">{label}</span>
          </div>
        ))}
        <hr className="my-3 border-gray-300" />
      </div>

      {/* Subscribed */}
      <div>
        <h3 className="text-[15px] font-semibold text-gray-900 mb-2 px-2">
          Subscriptions
        </h3>
        <div className="space-y-[6px]"> {/* 👈 Reduced spacing */}
          {subscribed.map((sub, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 px-2 py-1.5 hover:bg-gray-100 rounded-lg cursor-pointer"
            >
              <img
                src={sub.img}
                alt={sub.name}
                className="h-6 w-6 rounded-full object-cover"
              />
              <span className="text-[14.5px]">{sub.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;