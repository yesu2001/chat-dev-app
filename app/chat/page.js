import Messages from "@/components/chat/Messages";
import SideBar from "@/components/chat/SideBar";
import React from "react";

export default function page() {
  return (
    <div className="flex min-h-screen w-full">
      <SideBar />
      <Messages />
    </div>
  );
}
