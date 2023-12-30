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

export const generateUniqueId = () => {
  // Get current time in milliseconds and convert to base 36 for a shorter string
  const timeString = Date.now().toString(36);

  // Generate a random string with 10 characters (letters and numbers)
  const randomString = Math.random().toString(36).substr(2, 10);

  // Combine time and random string, ensuring a total length of 16 characters
  const uniqueId = timeString.slice(0, 6) + randomString.slice(0, 10);

  return uniqueId;
};
