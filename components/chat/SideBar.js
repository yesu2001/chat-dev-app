"use client";
import React, { useEffect, useState } from "react";
import Channel from "./Channel";
import Channels from "./Channels";
import {
  fetchGroups,
  fetchMemberoftheGroup,
  fetchMessages,
} from "@/lib/dbRequests";

export default function SideBar({
  userData,
  setMessages,
  selectedGroup,
  setSelectedGroup,
}) {
  const [groups, setGroups] = useState([]);
  const [members, setMembers] = useState([]);

  const handleSelectGroup = async (group) => {
    console.log(group);
    setSelectedGroup(group);
    const membersData = await fetchMemberoftheGroup(group.id);
    const messagesData = await fetchMessages(group.id);
    console.log(membersData);
    console.log(messagesData);

    if (membersData) {
      setMembers(membersData);
    }
    if (messagesData) {
      setMessages(messagesData);
    }
  };

  useEffect(() => {
    async function getChannels() {
      const data = await fetchGroups();
      console.log(data);
      if (data) {
        setGroups(data);
      }
    }

    getChannels();
  }, []);

  return (
    <div className="flex-[0.25] bg-[#120F13]">
      {selectedGroup ? (
        <Channel
          setSelectedGroup={setSelectedGroup}
          selectedGroup={selectedGroup}
          members={members}
          userData={userData}
        />
      ) : (
        <Channels
          groups={groups}
          handleSelectGroup={handleSelectGroup}
          userData={userData}
        />
      )}
    </div>
  );
}
