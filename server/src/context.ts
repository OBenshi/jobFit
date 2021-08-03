import { UserInputError, AuthenticationError } from "apollo-server-express";
require("dotenv").config();
import jwt from "jsonwebtoken";
import { UserNs } from "./@types";

export const getUser: any = async (auth) => {
  try {
    if (!auth) return new AuthenticationError("you must be logged in!");
    const token = auth.split("Bearer ")[1];
    if (!token) throw new AuthenticationError("you should provide a token!");
    const user = await jwt.verify(
      token,
      process.env.WOJCIECH,
      (err, decoded) => {
        if (err) return new AuthenticationError("invalid token!");
        return decoded;
      }
    );
    return user;
  } catch (err) {
    return new AuthenticationError("something went wrong");
  }

  //   console.log(`user from con`, user);
};
