"use client";
import React, { useState } from "react";
import Channel from "./Channel";
import Channels from "./Channels";

export default function SideBar() {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleSelectGroup = (group) => {
    console.log(group);
    setSelectedGroup(group);
  };

  return (
    <div className="flex-[0.25] bg-[#120F13]">
      {selectedGroup ? (
        <Channel
          setSelectedGroup={setSelectedGroup}
          groupData={selectedGroup}
        />
      ) : (
        <Channels handleSelectGroup={handleSelectGroup} />
      )}
    </div>
  );
}
