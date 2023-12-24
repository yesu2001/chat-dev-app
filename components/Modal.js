import { addNewGroup } from "@/lib/dbRequests";
import React from "react";

export default function Modal({ onClose, createChannel }) {
  const handleNewChannel = async (formData) => {
    createChannel(formData);
    onClose();
  };
  return (
    <div className="fixed top-0 left-0 bg-slate-800 bg-opacity-60 w-full h-full flex items-center justify-center">
      <div className="absolute w-100 p-8 bg-[#0B090C] shadow-md rounded-[24px]">
        <button
          className="absolute top-4 right-6 text-slate-400 font-bold"
          onClick={onClose}
        >
          &#10005;
        </button>
        <div className="w-full flex flex-col gap-6">
          <p>NEW CHANNEL</p>
          <form
            className="space-y-3"
            action={(formData) => handleNewChannel(formData)}
          >
            <input
              name="name"
              type="text"
              placeholder="Channel Name"
              className="w-full bg-[#3C393F] outline-none rounded-md p-2 placeholder:text-sm"
            />
            <textarea
              name="description"
              type="text"
              placeholder="Channel Decsription"
              rows={4}
              className="resize-none w-full bg-[#3C393F] outline-none rounded-md p-2 placeholder:text-sm"
            />
            <div className="flex justify-end">
              <input
                type="submit"
                value="Save"
                className="w-15 bg-[#2F80ED] text-white px-2 py-1 rounded-md"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
