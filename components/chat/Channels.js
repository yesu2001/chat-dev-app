"use client";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import { getInitials } from "@/lib/helpers";
import Modal from "../Modal";
import Settings from "./Settings";

export default function Channels({
  groups,
  handleSelectGroup,
  userData,
  createChannel,
}) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchItems, setSearchItems] = useState([{}, {}]);

  const handleSelectChannel = (chat) => {
    handleSelectGroup(chat);
    console.log(chat);
  };

  const handleSearch = (text) => {
    setSearchValue(text);
    console.log(text);
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-[0.9] py-2">
        <div className="flex justify-between items-center px-4 shadow-md shadow-black py-4">
          <p className="text-[#E0E0E0]">All Channels</p>
          <button
            className="bg-[#252329] p-1 rounded-md"
            onClick={() => setOpen(true)}
          >
            <IoMdAdd style={{ color: "white" }} />
          </button>
          {open && (
            <Modal
              onClose={() => setOpen(false)}
              createChannel={createChannel}
            />
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 bg-[#3C393F] rounded-md px-2 py-1">
            <IoMdSearch />
            <input
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              className="bg-transparent outline-none placeholder:text-xs"
            />
          </div>
        </div>
        <div className="space-y-4 mt-3 px-4">
          {groups?.length === 0 && (
            <p className="text-lg text-slate-400">No Channels Joined!</p>
          )}
          {groups?.map((chat, index) => (
            <div
              key={index}
              className="flex items-center justify-start gap-2 cursor-pointer hover:bg-slate-800 p-1 rounded-md"
              onClick={() => handleSelectChannel(chat)}
            >
              <p className="flex-[0.15] bg-[#252329] text-xs p-1 rounded-md text-center">
                {getInitials(chat?.name)}
              </p>
              <p className="flex-[0.85] text-[#BDBDBD]">{chat?.name}</p>
            </div>
          ))}
        </div>
      </div>

      <Settings userData={userData} />
    </div>
  );
}
