"use client";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import Image from "next/image";
import { groupChats } from "../../context/data";
import { getInitials } from "@/lib/helpers";
import pic1 from "/public/pic1.png";
import Modal from "../Modal";

export default function Channels({ handleSelectGroup }) {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  const handleSelectChannel = (chat) => {
    console.log(chat);
    handleSelectGroup(chat);
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
          {open && <Modal onClose={() => setOpen(false)} />}
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 bg-[#3C393F] rounded-md px-2 py-1">
            <IoMdSearch />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none placeholder:text-xs"
            />
          </div>
        </div>
        <div className="space-y-4 mt-3 px-4">
          {groupChats.map((chat, index) => (
            <div
              key={index}
              className="flex items-center justify-start gap-2 cursor-pointer hover:bg-slate-800 p-1 rounded-md"
              onClick={() => handleSelectChannel(chat)}
            >
              <p className="flex-[0.15] bg-[#252329] text-xs p-1 rounded-md text-center">
                {getInitials(chat.groupName)}
              </p>
              <p className="flex-[0.85] text-[#BDBDBD]">{chat.groupName}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-[0.1] relative flex items-center justify-between px-4  bg-[#0B090C]">
        <div className="flex items-center gap-4">
          <Image src={pic1} alt="pic" width="40" height="40" />
          <p>Xavier</p>
        </div>
        <button onClick={() => setShow(!show)}>
          <FaAngleDown />
        </button>
        <div
          className={`my-4 space-y-2 absolute bottom-14 right-3 p-2 px-4 rounded-md ${
            show ? "block opacity-100 bg-[#3C393F]" : "hidden opacity-0"
          }`}
        >
          <div className="flex items-center gap-4">
            <MdAccountCircle />
            <p className="cursor-pointer">Profile</p>
          </div>
          <hr />
          <div className="flex items-center gap-4">
            <MdLogout className="text-red-400" />
            <p className="text-red-400 cursor-pointer">Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
}
