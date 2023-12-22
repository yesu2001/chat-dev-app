import React from "react";
import Profile from "@/components/profile/Profile";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getUser } from "@/lib/dbRequests";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const data = await getUser(session?.user?.id);

  return (
    <div className="flex w-full justify-center">
      <Profile data={data} />
    </div>
  );
}
