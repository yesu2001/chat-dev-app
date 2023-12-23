"use client";
import React, { useState } from "react";
import Messages from "@/components/chat/Messages";
import SideBar from "@/components/chat/SideBar";

export default function ChatComponent({ userData }) {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [messages, setMessages] = useState([]);

  return (
    <div className="flex min-h-screen w-full">
      <SideBar
        userData={userData}
        setMessages={setMessages}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
      />
      <Messages messages={messages} group={selectedGroup} />
    </div>
  );
}
