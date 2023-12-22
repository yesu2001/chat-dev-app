"use client";
import { SessionProvider } from "next-auth/react";

export default async function AuthProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
