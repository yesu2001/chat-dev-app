"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaAngleDown } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { signOut } from "next-auth/react";
import { MdLogout } from "react-icons/md";
import pic1 from "/public/pic1.png";

export default function Settings({ userData }) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex-[0.1] relative flex items-center justify-between px-4  bg-[#0B090C]">
      <div className="flex items-center gap-4">
        <Image src={userData.image || pic1} alt="pic" width="40" height="40" />
        <p>{userData?.name}</p>
      </div>
      <button onClick={() => setShow(!show)}>
        <FaAngleDown />
      </button>
      <div
        className={`my-4 space-y-2 absolute bottom-14 right-3 p-2 px-4 rounded-md ${
          show ? "block opacity-100 bg-[#3C393F]" : "hidden opacity-0"
        }`}
      >
        <Link href="/profile" className="flex items-center gap-4">
          <MdAccountCircle />
          <p className="cursor-pointer">Profile</p>
        </Link>
        <hr />
        <button className="flex items-center gap-4" onClick={() => signOut()}>
          <MdLogout className="text-red-400" />
          <p className="text-red-400 cursor-pointer">Logout</p>
        </button>
      </div>
    </div>
  );
}
