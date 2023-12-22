"use client";
import React, { useState } from "react";
import Image from "next/image";
import { avatars } from "./picsData";

export default function Popup({ onClose, handleSelect }) {
  const [selected, setSelected] = useState("");

  const handleAvatar = (pic) => {
    setSelected(pic);
    handleSelect(pic);
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 bg-slate-600 bg-opacity-60 w-full h-full flex items-center justify-center">
      <div className="absolute w-72 p-6 bg-white shadow-md rounded-md">
        <button
          className="absolute top-2 right-2 text-slate-900 font-bold"
          onClick={onClose}
        >
          &#10005;
        </button>
        <div className="w-full flex flex-wrap items-center justify-center gap-2 ">
          {avatars.map((pic) => (
            <div
              className={`w-[70px] ${
                selected === pic.url
                  ? "p-2 border-4 border-blue-600 rounded-full"
                  : ""
              }`}
              onClick={() => handleAvatar(pic?.url)}
            >
              <Image
                src={pic?.pic}
                alt="pic"
                width="100"
                height="100"
                style={{ width: "100%" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
    // <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
    //   <div className="bg-white p-3 max-w-md mx-auto rounded shadow-lg">
    //     <div className="relative">
    //       <button
    //         onClick={onClose}
    //         className="absolute top-1 right-2 text-gray-500 hover:text-gray-700"
    //       >
    //         &#10005;
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
}
