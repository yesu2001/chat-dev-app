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
