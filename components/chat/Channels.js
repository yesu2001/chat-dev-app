"use client";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import debounce from "lodash/debounce";
import { getInitials } from "@/lib/helpers";
import Modal from "../Modal";
import Settings from "./Settings";
import { searchGroup } from "@/lib/dbRequests";
import JoinModal from "./JoinModal";

export default function Channels({
  groups,
  handleSelectGroup,
  userData,
  createChannel,
}) {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchItems, setSearchItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectChannel = (chat) => {
    handleSelectGroup(chat);
  };

  const debouncedSearch = debounce((query) => {
    getGroups(query);
  }, 500);

  const getGroups = async (query) => {
    if (query.length === 0) {
      setSearchItems([]);
      return;
    }
    const { data, error } = await searchGroup(query);
    if (error) {
      alert(error);
    }
    setSearchItems(data);
  };

  const handleSearch = async (text) => {
    if (text === "") {
      setSearchItems([]);
    }
    setSearchValue(text);
    debouncedSearch(text);
  };

  const selectGroupForJoining = (data) => {
    setSelectedItem(data);
    setOpenModal(true);
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
        <div className="relative p-4">
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
          {searchItems.length > 0 && (
            <div className="absolute top-10 w-full my-2 bg-slate-800 p-2 rounded-md">
              {searchItems.map((item) => (
                <div
                  className="w-full my-1 hover:bg-slate-500 p-2 cursor-pointer"
                  onClick={() => selectGroupForJoining(item)}
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
          {openModal && (
            <JoinModal
              onClose={() => setOpenModal(false)}
              groupData={selectedItem}
              userData={userData}
            />
          )}
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
