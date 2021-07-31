import { UserInputError, AuthenticationError } from "apollo-server-express";
require("dotenv").config();
import jwt from "jsonwebtoken";

export const getUser = async (auth) => {
  if (!auth) throw new AuthenticationError("you must be logged in!");

  const token = auth.split("Bearer ")[1];
  if (!token) throw new AuthenticationError("you should provide a token!");

  const user = await jwt.verify(token, process.env.WOJCIECH, (err, decoded) => {
    if (err) throw new AuthenticationError("invalid token!");
    return decoded;
  });
  return user;
};
