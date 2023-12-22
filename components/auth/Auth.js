"use client";

import React, { useState, useEffect } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Auth() {
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/profile");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!login) {
      if (!isValidEmail(email)) {
        setError("Email is invalid");
        return;
      }

      if (!password || password.length < 8) {
        setError("Password is invalid");
        return;
      }

      try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
        if (res.status === 400) {
          setError("This email is already registered");
        }
        if (res.status === 200) {
          setError("");
          setLogin(true);
        }
      } catch (error) {
        setError("Error, try again");
        console.log(error);
      }
    } else {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: `${window.location.origin}/profile`,
      });
      console.log(res);
    }
  };

  const handleGithubAuth = () => {
    signIn("github");
  };
  const handleGoogleAuth = () => {
    signIn("google");
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="p-8 rounded-lg border border-[#BDBDBD] xs:w-[90%] md:w-[350px]">
      {login ? (
        <p>Login</p>
      ) : (
        <>
          <p className="font-bold text-[#E0E0E0] w-[80%]">
            Join thousands of learners from around the world
          </p>
          <p className="text-xs text-[#E0E0E0] w-[85%] my-2">
            Master web development by making real-life projects. There are
            multiple paths for you to choose
          </p>
        </>
      )}
      <form className="my-5 flex flex-col space-y-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-[#BDBDBD] bg-transparent p-2 rounded-md text-white outline-none"
        />
        <input
          type="Password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-[#BDBDBD] bg-transparent p-2 rounded-md text-white outline-none"
        />
        <input
          type="submit"
          value={login ? "Login" : "Start Now"}
          className="p-2 bg-[#2F80ED] text-white rounded-md text-md mt-4"
        />
      </form>
      <p className="text-red-600 text-md my-2 text-center">{error && error}</p>
      <p className="text-xs text-[#828282] text-center">
        or continue with these social profile
      </p>
      <div className="my-3 flex gap-2 items-center justify-center">
        <button
          className="border  border-[#BDBDBD] rounded-full p-2"
          onClick={handleGoogleAuth}
        >
          <FaGoogle style={{ color: "#BDBDBD" }} />
        </button>
        <button
          className="border  border-[#BDBDBD] rounded-full p-2"
          onClick={handleGithubAuth}
        >
          <FaGithub style={{ color: "#BDBDBD" }} />
        </button>
      </div>
      <p className="text-xs text-[#828282] text-center">
        {login ? "Don't have an account yet?" : "Already a member?"}{" "}
        <span
          className="text-[#2D9CDB] cursor-pointer"
          onClick={() => setLogin(!login)}
        >
          {login ? "Register" : " Login"}
        </span>
      </p>
    </div>
  );
}
