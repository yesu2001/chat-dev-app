"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { ImFilePicture } from "react-icons/im";
import Popup from "./Popup";

export default function EditProfile({ data, handleUpdate }) {
  console.log(data);

  const [profile, setProfile] = useState({
    image: data?.image,
    name: data?.name,
    email: data?.email,
    bio: data?.bio,
    password: data?.password,
  });

  const [open, setOpen] = useState(false);

  const handleSelect = (pic) => {
    setProfile((prevState) => ({
      ...prevState,
      image: pic,
    }));
  };

  const handleChange = (e) => {
    const textValue = e.target.value;
    setProfile((prevState) => ({
      ...prevState,
      [e.target.name]: textValue,
    }));
  };

  const handleSubmit = () => {
    handleUpdate(profile);
  };

  return (
    <div className="flex flex-col lg:mx-[300px] space-y-8">
      <Link href="/profile" className="flex items-center">
        <IoIosArrowBack />
        <p>Back</p>
      </Link>
      <form action={handleSubmit}>
        <div className="flex items-center w-full">
          <div className="flex items-center w-full">
            <div className="mx-4 w-full border border-[#BDBDBD] rounded-md">
              <div className="p-4 flex justify-between">
                <div className="">
                  <p>Change Info</p>
                  <p className="text-[#828282] text-xs">
                    Changes will be reflected to every services
                  </p>
                </div>
              </div>
              <hr />
              <div className="flex items-center p-4">
                <p className="flex-[0.3] text-[#BDBDBD]">Photo</p>
                {profile.image ? (
                  <div className="flex-[0.7] flex items-center gap-4">
                    <img
                      src={profile.image}
                      alt={profile.name}
                      style={{ width: "80px" }}
                    />
                    <div
                      class="flex items-center gap-2 bg-slate-300 p-2 rounded-md"
                      onClick={() => setOpen(true)}
                    >
                      <ImFilePicture style={{ flex: 0.3, color: "#252329" }} />
                      <p class="flex-[0.7] text-sm font-semibold text-gray-700">
                        Select another Avatar
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex-[0.7] flex items-center">
                    <label
                      htmlFor="doc"
                      className="flex items-center p-2 gap-3 rounded-lg  bg-gray-50 cursor-pointer"
                    >
                      <div
                        class="flex items-center gap-2"
                        onClick={() => setOpen(true)}
                      >
                        <ImFilePicture style={{ color: "#252329" }} />
                        <h4 class="text-md font-semibold text-gray-700">
                          Select An Avatar
                        </h4>
                      </div>
                    </label>
                  </div>
                )}
                {open && (
                  <Popup
                    onClose={() => setOpen(false)}
                    handleSelect={handleSelect}
                  />
                )}
              </div>
              <hr />
              <div className="flex items-center p-4">
                <p className="flex-[0.3] text-[#BDBDBD]">Name</p>
                <input
                  name="name"
                  type="text"
                  placeholder=""
                  value={profile.name}
                  onChange={handleChange}
                  className="flex-[0.7] bg-[#bdbdbd] text-slate-950 outline-none rounded-md px-2 py-1"
                />
              </div>
              <hr />
              <div className="flex items-center p-4">
                <p className="flex-[0.3] text-[#BDBDBD]">Bio</p>
                <input
                  name="bio"
                  type="text"
                  placeholder=""
                  value={profile.bio}
                  onChange={handleChange}
                  className="flex-[0.7] bg-[#bdbdbd] text-slate-950 outline-none rounded-md px-2 py-1"
                />
              </div>
              <hr />
              <div className="flex items-center p-4">
                <p className="flex-[0.3] text-[#BDBDBD]">Email</p>
                <input
                  name="email"
                  type="text"
                  placeholder=""
                  value={profile.email}
                  onChange={handleChange}
                  className="flex-[0.7] bg-[#bdbdbd] text-slate-950 outline-none rounded-md px-2 py-1"
                />
              </div>
              <hr />
              <div className="flex items-center p-4">
                <p className="flex-[0.3] text-[#BDBDBD]">Password</p>
                <input
                  name="password"
                  type="password"
                  placeholder=""
                  value={profile.password}
                  onChange={handleChange}
                  className="flex-[0.7] bg-[#bdbdbd] text-slate-950 outline-none rounded-md px-2 py-1"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end my-3 mx-4">
          <input
            type="submit"
            value="Save"
            className="w-[80px] bg-[#2F80ED] px-3 rounded-md py-1 cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
}
