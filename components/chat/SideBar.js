"use client";
import React from "react";
import Channel from "./Channel";
import Channels from "./Channels";

export default function SideBar() {
  return (
    <div className="flex-[0.25] bg-[#120F13]">
      <Channels />
    </div>
  );
}
