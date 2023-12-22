import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

export const POST = async (req) => {
  const { email, password } = await req.json();
  console.log(email, password);
  const { data } = await supabase.from("profiles").select().eq("email", email);
  console.log(data);
  if (data.length > 0) {
    return new NextResponse("Email is already in use", { status: 400 });
  }
  const hashedPassword = await bcrypt.hash(password, 7);
  const newUser = {
    name: "",
    bio: "",
    image: "",
    email: email,
    password: hashedPassword,
  };
  try {
    const { data, error } = await supabase
      .from("profiles")
      .insert(newUser)
      .select();
    if (error) {
      console.log(error);
    }
    return new NextResponse("user is registered", { data, status: 200 });
  } catch (err) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
