"use client";
import React, { useEffect, useMemo, useState } from "react";
import Channel from "./Channel";
import Channels from "./Channels";
import {
  addNewGroup,
  fetchGroups,
  fetchMemberoftheGroup,
  fetchMessages,
} from "@/lib/dbRequests";

export default function SideBar({ userData, selectedGroup, setSelectedGroup }) {
  const [groups, setGroups] = useState([]);
  const [members, setMembers] = useState([]);

  const handleSelectGroup = async (group) => {
    console.log(group);
    setSelectedGroup(group);
    const membersData = await fetchMemberoftheGroup(group.id);
    console.log(membersData);

    if (membersData) {
      setMembers(membersData);
    }
  };

  useEffect(() => {
    async function getChannels() {
      const { data, error } = await fetchGroups(userData?.id);
      console.log(data);
      if (error) {
        alert(`Something went wrong : ${error?.message}`);
      }
      if (data) {
        setGroups(data);
      }
    }

    getChannels();
  }, []);

  const handleCreateChannel = async (formData) => {
    const channelName = formData.get("name");
    const channelDescription = formData.get("description");
    const channel = {
      created_by: userData.id,
      name: channelName,
      description: channelDescription,
    };
    const userProfile = {
      id: userData?.id,
      name: userData?.name,
    };
    const { data, error } = await addNewGroup(channel, userProfile);
    if (error) {
      alert(error.message);
    }
    setGroups((prevState) => [...prevState, data]);
    alert("Successfully added New group");
  };

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
          createChannel={handleCreateChannel}
        />
      )}
    </div>
  );
}
