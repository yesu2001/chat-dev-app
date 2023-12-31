import { addNewGroup, addNewMember } from "@/lib/dbRequests";
import React from "react";

export default function JoinModal({ onClose, groupData, userData }) {
  const handleJoingroup = () => {
    const { data, error } = addNewMember(userData, groupData?.id);
    console.log(error);
    console.log(data);
  };

  return (
    <div className="fixed top-0 left-0 bg-slate-800 bg-opacity-60 w-full h-full flex items-center justify-center">
      <div className="absolute w-100 p-8 bg-[#0B090C] shadow-md rounded-md">
        <button
          className="absolute top-2 right-2 text-slate-400 font-bold"
          onClick={onClose}
        >
          &#10005;
        </button>
        <div>
          <p>{groupData?.name}</p>
          <p className="text-slate-500">{groupData?.description}</p>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="w-15 bg-[#2F80ED] text-white px-2 py-1 rounded-md"
            onClick={handleJoingroup}
          >
            Join Group
          </button>
        </div>
        {/* <div className="w-full flex flex-col gap-6">
          <p>NEW CHANNEL</p>
          <formbutton>
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
          </formbutton>
        </div> */}
      </div>
    </div>
  );
}
