"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import Image from "next/image";
import pic1 from "/public/pic1.png";
import { createMessage } from "@/lib/dbRequests";

export default function Messages({ chatMessages, group, userData }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messageContainerRef = useRef(null);

  useEffect(() => {
    setMessages(chatMessages);
  }, []);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTo({
        top: messageContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, messageContainerRef]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.length === 0) {
      return;
    }
    const newMessage = {
      message,
      group_id: group.id,
      user_id: userData.id,
      user_pic: userData.image,
      user_name: userData.name,
    };
    const { data, error } = await createMessage(newMessage);
    if (error) {
      alert(error.message);
    }
    setMessages((prevState) => [...prevState, data]);
    setMessage("");
  };

  return (
    <div className="flex-[0.75] min-h-full">
      <div className="h-full flex flex-col">
        {group?.name && (
          <div className="px-12 py-4 shadow-sm shadow-slate-950">
            <p className="uppercase text-lg">{group?.name}</p>
          </div>
        )}
        {group ? (
          <div
            className="flex-[1] relative py-5 px-12 space-y-4 overflow-y-auto scrollbar  mb-3"
            ref={messageContainerRef}
            style={{
              maxHeight: "calc(100vh - 120px)",
              scrollbarWidth: "5px",
              scrollBehavior: "smooth",
            }}
          >
            {chatMessages?.map((message, index) => (
              <div key={index} className="flex gap-3">
                <div>
                  <Image
                    src={message?.user_pic}
                    alt="pic"
                    width="40"
                    height="40"
                  />
                </div>
                <div>
                  <div>
                    <p className="text-[#828282] text-[14px]">
                      {message.user_name}
                    </p>
                  </div>
                  <p className="text-[#E0E0E0]">{message.message}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xl text-slate-400 text-center my-10">
            Select one of groups to start chatting! 😎
          </p>
        )}
        {group && (
          <div className="px-12 bg-[#252329]">
            <form onSubmit={handleSendMessage}>
              <div className="bg-[#3C393F] p-2 pl-5 rounded-md flex items-center">
                <input
                  name="message"
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="type something"
                  className="flex-[1] bg-transparent outline-none"
                />
                <button type="submit" className="bg-[#2F80ED] p-1 rounded-md">
                  <IoSend />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
