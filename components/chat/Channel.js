import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import Image from "next/image";
import { groupChats } from "../../context/data";
import { getInitials } from "@/lib/helpers";
import pic1 from "/public/pic1.png";

export default function Channel() {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-[0.9] py-2 px-4">
        <div className="flex items-center gap-2 shadow-md shadow-black py-4">
          <button className="text-white text-xl">
            <IoIosArrowBack />
          </button>
          <p className="text-[#E0E0E0]">All Channels</p>
        </div>
        <div className="py-4 space-y-3">
          <p className="uppercase font-[700]">Front-End</p>
          <p className="text-sm text-[#E0E0E0]">
            Pellentesque sagittis elit enim, sit amet ultrices tellus accumsan
            quis. In gravida mollis purus, at interdum arcu tempor non
          </p>
        </div>
        <div className="space-y-4 mt-3">
          <p>MEMBERS</p>
          {groupChats[0].members.map((member, index) => (
            <div
              key={index}
              className="flex items-center justify-start gap-2 cursor-pointer"
            >
              <p className="flex-[0.15] bg-[#252329] text-xs p-1 rounded-md text-center">
                {getInitials(member)}
              </p>
              <p className="flex-[0.85] text-[#BDBDBD]">{member}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-[0.1] flex items-center justify-between px-4  bg-[#0B090C]">
        <div className="flex items-center gap-4">
          <Image src={pic1} alt="pic" width="40" height="40" />
          <p>Xavier</p>
        </div>
        <button>
          <FaAngleDown />
        </button>
      </div>
    </div>
  );
}
