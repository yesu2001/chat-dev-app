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
export const getAllMessages = async (id) => {
  console.log(id);
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
    return { data, error: null };
  } catch (error) {
    console.log("Error found :-", error);
    return { data: null, error };
  }
};
// send message
export const createMessage = async (messageData) => {
  try {
    const { data, error } = await supabase
      .from("messages")
      .insert(messageData)
      .select();
    if (error) {
      console.log("Error adding  to DB :-", error);
      throw new Error("Error adding to DB :-", error);
    }
    console.log("add new channel data", data);
    return {
      data: data[0],
      error: null,
    };
  } catch (error) {
    console.log("Error found :-", error);
    return {
      data: null,
      error,
    };
  }
};

// Groups handlers --------------------------------
// Fecth Groups
export const fetchGroups = async (id) => {
  try {
    const { data, error } = await supabase
      .from("groups")
      .select()
      .eq("created_by", id);
    if (error) {
      console.log("Error adding  to DB :-", error);
      throw new Error("Error adding to DB :-", error);
    }
    console.log("add new channel data", data);
    if (data.length === 0) {
      console.log("some");
      return {
        data,
        error: null,
      };
    }
    return {
      data,
      error: null,
    };
  } catch (error) {
    console.log("Error found :-", error);
    return {
      data: null,
      error,
    };
  }
};

// add new Group
export const addNewGroup = async (channelData, userProfile) => {
  console.log(channelData);

  try {
    const { data, error } = await supabase
      .from("groups")
      .insert(channelData)
      .select();
    if (error) {
      console.log("Error adding  to DB :-", error);
      return {
        data: null,
        error,
      };
    }
    console.log("add new channel data", data);
    if (data.length === 0) {
      console.log("some");
      return {
        data: data[0],
        error: null,
      };
    }

    if (data.length > 0) {
      await addNewMember(userProfile, data[0].id);
    }

    return {
      data: data[0],
      error: null,
    };
  } catch (error) {
    console.log("Error found :-", error);
    return {
      data: null,
      error,
    };
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

// add new Member
export const addNewMember = async (userData, groupId) => {
  try {
    const memberData = {
      user_id: userData.id,
      user_name: userData.name,
      group_id: groupId,
    };

    const { data, error } = await supabase
      .from("members")
      .insert(memberData)
      .select();
    if (error) {
      console.log("Error adding member  DB :-", error);
      throw new Error("Error adding member to DB :-", error);
    }
    console.log("member data", data);
    if (data.length === 0) {
      console.log("some error");
      return false;
    }
    return data;
  } catch (error) {
    console.log("Error found :-", error);
    return false;
  }
};
