import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import Image from "next/image";
import { groupChats } from "../../context/data";
import { getInitials } from "@/lib/helpers";
import pic1 from "/public/pic1.png";

export default function Channel({
  selectedGroup,
  setSelectedGroup,
  members,
  userData,
}) {
  const handleGoBack = () => {
    setSelectedGroup(null);
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-[0.9] py-2">
        <div className="flex items-center px-4 gap-2 shadow-md shadow-black py-4">
          <button className="text-white text-xl" onClick={handleGoBack}>
            <IoIosArrowBack />
          </button>
          <p className="text-[#E0E0E0]">All Channels</p>
        </div>
        <div className="p-4 space-y-3">
          <p className="uppercase font-[700]">{selectedGroup?.name}</p>
          <p className="text-sm text-[#E0E0E0]">{selectedGroup?.description}</p>
        </div>
        <div className="space-y-4 mt-3 px-4">
          <p>MEMBERS</p>
          {members?.map((member, index) => (
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
          <Image
            src={userData?.image || pic1}
            alt="pic"
            width="40"
            height="40"
          />
          <p>{userData?.name}</p>
        </div>
        <button>
          <FaAngleDown />
        </button>
      </div>
    </div>
  );
}
