import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
  const payload = {
    userId: user.id,
    name: user.name,
    email: user.email,
  };
  const secret = process.env.ACCESS_TOKEN_SECRET;
  const options = {
    expiresIn: "7d", // Adjust expiration as needed
  };
  return jwt.sign(payload, secret, options);
};

export const getInitials = (str) => {
  // Split the string into words
  const words = str.split(" ");

  // Extract the first letter from each word
  const firstLetters = words.map((word) => word[0]);

  // Join the first letters and return the result
  return firstLetters.join("");
};

export const handleAddNewChannel = async (channel) => {
  console.log(channel);
};
