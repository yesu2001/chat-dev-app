import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

import { getUser } from "@/lib/dbRequests";
import ChatComponent from "@/components/chat/ChatComponent";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const userData = await getUser(session?.user?.id);

  return (
    <div>
      <ChatComponent userData={userData} />
    </div>
  );
}
