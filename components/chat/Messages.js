"use client";
import { groupChats } from "@/context/data";
import React, { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import Image from "next/image";
import pic1 from "/public/pic1.png";

export default function Messages({ group }) {
  const [messages, setMessages] = useState(chatMessages);
  const [message, setMessage] = useState("");
  const messageContainerRef = useRef(null);

  useEffect(() => {
    messageContainerRef.current.scrollTo({
      top: messageContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log(message);
    if (message.length === 0) {
      return;
    }
    console.log(message);
    // messages.push();
    setMessages((prevState) => [...prevState, { sender: "admin", message }]);
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
            className="flex-[1] py-5 px-12 space-y-4 overflow-y-auto scrollbar max-h-[calc(100vh-7rem)] mb-3"
            ref={messageContainerRef}
            style={{
              scrollbarWidth: "5px", // Optional: Customize scrollbar appearance
              scrollBehavior: "smooth", // Apply smooth scrolling behavior
            }}
          >
            {messages.map((message, index) => (
              <div key={index} className="flex gap-3">
                <div>
                  <Image src={pic1} alt="pic" width="40" height="40" />
                </div>
                <div>
                  <div>
                    <p className="text-[#828282] text-[14px]">
                      {message.sender}
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
          <div className="flex-[0.1] px-12 bg-[#252329]">
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

const chatMessages = [
  {
    sender: "Mia",
    message: "What's your go-to framework for building responsive web apps?",
  },
  {
    sender: "Nick",
    message: "React all the way! It makes UI development a breeze.",
  },
  { sender: "Olivia", message: "I'm exploring Vue.js. It's so intuitive!" },
  {
    sender: "Paul",
    message: "CSS Grid has been a game-changer for layout design.",
  },
  {
    sender: "Mia",
    message: "What's your go-to framework for building responsive web apps?",
  },
  {
    sender: "Nick",
    message: "React all the way! It makes UI development a breeze.",
  },
  { sender: "Olivia", message: "I'm exploring Vue.js. It's so intuitive!" },
  {
    sender: "Paul",
    message: "CSS Grid has been a game-changer for layout design.",
  },
  {
    sender: "Mia",
    message: "What's your go-to framework for building responsive web apps?",
  },
  {
    sender: "Nick",
    message: "React all the way! It makes UI development a breeze.",
  },
  { sender: "Olivia", message: "I'm exploring Vue.js. It's so intuitive!" },
  {
    sender: "Paul",
    message: "CSS Grid has been a game-changer for layout design.",
  },
];
