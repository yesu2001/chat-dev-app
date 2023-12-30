"use client";
import React, { useEffect, useState } from "react";
import Messages from "@/components/chat/Messages";
import SideBar from "@/components/chat/SideBar";
import { getAllMessages } from "@/lib/dbRequests";
import { supabase } from "@/lib/supabase/client";

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

  useEffect(() => {
    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          const newMessage = payload.new;
          if (!messages.find((message) => message.id === newMessage.id)) {
            setMessages([...messages, newMessage]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [messages, supabase]);

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
