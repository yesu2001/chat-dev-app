"use client";

import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";

export default function Header() {
  const [open, setOpen] = useState(false);
  const handleLogout = () => signOut();

  return (
    <div className="flex items-center justify-end p-2 relative">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <IoMdPerson style={{ fontSize: 30 }} />
        {open ? <FaCaretUp /> : <FaCaretDown />}
      </div>
      <div
        className={`my-4 space-y-2 absolute top-8 right-3 p-2 px-4 rounded-md ${
          open ? "block opacity-100 bg-slate-500" : "hidden opacity-0"
        }`}
      >
        <p className="cursor-pointer">Profile</p>
        <p className="text-red-300 cursor-pointer" onClick={handleLogout}>
          Logout
        </p>
      </div>
    </div>
  );
}
