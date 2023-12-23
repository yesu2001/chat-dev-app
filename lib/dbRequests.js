import { supabase } from "./supabase/client";

export const createUser = async () => {};

export const getUser = async (id) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", id);
    if (error) {
      console.log("Error fetching User from DB :-", error);
      throw new Error("Error fetching user from DB :-", error);
    }
    if (data.length === 0) {
      console.log("No User found");
      return false;
    }
    return data[0];
  } catch (error) {
    console.log("Error found :-", error);
    return false;
  }
};

export const updateUser = async (userData, id) => {
  console.log(id);
  const profileData = {
    name: userData.name,
    email: userData.email,
    image: userData.image,
    bio: userData.bio,
    paswword: userData.paswword,
  };
  try {
    const { data, error } = await supabase
      .from("profiles")
      .update(profileData)
      .eq("id", id)
      .select();
    if (error) {
      console.log("Error", error);
      throw new Error("error", error);
    }
    if (data) {
      console.log("data", data);
    }
    if (data.length > 0) {
      console.log("data:-", data);
    }
  } catch (error) {
    console.log("error:-", error);
  }
};

// Messages Handlers --------------------------------
// Fetch Messages
export const fetchMessages = async (id) => {
  try {
    const { data, error } = await supabase
      .from("messages")
      .select()
      .eq("group_id", id);
    if (error) {
      console.log("Error adding  to DB :-", error);
      throw new Error("Error adding to DB :-", error);
    }
    console.log("add new channel data", data);
    if (data.length === 0) {
      console.log("some");
      return [];
    }
    return data;
  } catch (error) {
    console.log("Error found :-", error);
    return false;
  }
};
// send message
// export const fetchMessages = () =>{};

// Groups handlers --------------------------------
// Fecth Groups
export const fetchGroups = async () => {
  try {
    const { data, error } = await supabase.from("groups").select();
    if (error) {
      console.log("Error adding  to DB :-", error);
      throw new Error("Error adding to DB :-", error);
    }
    console.log("add new channel data", data);
    if (data.length === 0) {
      console.log("some");
      return false;
    }
    return data;
  } catch (error) {
    console.log("Error found :-", error);
    return false;
  }
};

// add new Group
export const addNewGroup = async (channelData) => {
  console.log(channelData);

  try {
    const { data, error } = await supabase
      .from("groups")
      .insert(channelData)
      .select();
    if (error) {
      console.log("Error adding  to DB :-", error);
      throw new Error("Error adding to DB :-", error);
    }
    console.log("add new channel data", data);
    if (data.length === 0) {
      console.log("some");
      return false;
    }
    return data[0];
  } catch (error) {
    console.log("Error found :-", error);
    return false;
  }
};

// fetch all groups
// export const fetchMessages = () =>{};

// fetch all members of the group
export const fetchMemberoftheGroup = async (id) => {
  try {
    const { data, error } = await supabase
      .from("members")
      .select()
      .eq("group_id", id);
    if (error) {
      console.log("Error adding  to DB :-", error);
      throw new Error("Error adding to DB :-", error);
    }
    console.log("add new channel data", data);
    if (data.length === 0) {
      console.log("some");
      return false;
    }
    return data;
  } catch (error) {
    console.log("Error found :-", error);
    return false;
  }
};

// export const fetchMessages = () =>{};
