"use client";
import React, { useEffect, useState } from "react";
import Messages from "@/components/chat/Messages";
import SideBar from "@/components/chat/SideBar";
import { getAllMessages } from "@/lib/dbRequests";

export default function ChatComponent({ userData }) {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchMessages() {
      if (!selectedGroup?.id) {
        return;
      }
      const { data, error } = await getAllMessages(selectedGroup?.id);
      if (error) {
        alert(error.message);
      }
      if (data) {
        setMessages(data);
      }
    }
    fetchMessages();
  }, [selectedGroup]);

  return (
    <div className="flex min-h-screen w-full">
      <SideBar
        userData={userData}
        setMessages={setMessages}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
      />
      <Messages
        chatMessages={messages}
        group={selectedGroup}
        userData={userData}
      />
    </div>
  );
}
