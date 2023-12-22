"use client";

import React from "react";
import Link from "next/link";

export default function Profile({ data }) {
  return (
    <div className="flex sm:w-[80%] md:w-[50%]">
      <div className="w-full">
        <div className="text-center my-5">
          <p className="text-lg">Personal Info</p>
          <p className="text-xs text-[#BDBDBD]">
            Basic Info like name, age,etc.
          </p>
        </div>
        <div className="flex items-center">
          <div className="mx-4 sm:w-[70%] md:w-full border border-[#BDBDBD] rounded-md">
            <div className="p-4 flex justify-between">
              <div className="">
                <p>Profile</p>
                <p className="text-[#828282] text-xs">
                  Some info may be visible to other people
                </p>
              </div>
              <button className="border border-[#828282] text-[#828282] px-2 py-1 w-[70px] rounded-lg">
                <Link href="/profile/edit">Edit</Link>
              </button>
            </div>
            <hr />
            <div className="flex items-center p-4">
              <p className="flex-[0.3] text-[#BDBDBD]">Photo</p>
              <div className="flex-[0.7] ">
                {data?.image ? (
                  <img
                    src={data?.image}
                    alt="image"
                    className="w-[80px] h-[80px] rounded-md"
                  />
                ) : (
                  <p className="text-slate-500">No Image</p>
                )}
              </div>
            </div>
            <hr />
            <div className="flex items-center p-4">
              <p className="flex-[0.3] text-[#BDBDBD]">Name</p>
              <p
                className={`flex-[0.7] ${
                  data?.name ? "text-white" : "text-slate-500"
                }`}
              >
                {data?.name || "No Name"}
              </p>
            </div>
            <hr />
            <div className="flex items-center p-4">
              <p className="flex-[0.3] text-[#BDBDBD]">Bio</p>
              <p
                className={`flex-[0.7] ${
                  data?.bio ? "text-white" : "text-slate-500"
                }`}
              >
                {data?.bio || "No Bio"}
              </p>
            </div>
            <hr />
            <div className="flex items-center p-4">
              <p className="flex-[0.3] text-[#BDBDBD]">Email</p>
              <p className="flex-[0.7]">{data?.email}</p>
            </div>
            <hr />
            <div className="flex items-center p-4">
              <p className="flex-[0.3] text-[#BDBDBD]">Password</p>
              <p
                className={`flex-[0.7] ${
                  data?.password ? "text-white" : "text-slate-500"
                }`}
              >
                {data?.password ? "************" : "No Password set"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
