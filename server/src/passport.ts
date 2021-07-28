const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
require("dotenv").config();

const WOJCIECH = require("./config.js").secretOrKey;
import { UserNs } from "./@types";
import userModel from "./models/usersModel";

export const jwtOptions = {
  secretOrKey: process.env.WOJCIECH,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

export const jwtVerify = async (
  payload: { id: any },
  next: (arg0: any, arg1: boolean | UserNs.userSchemaData) => void
) => {
  try {
    const user = await userModel.findById(payload.id);
    console.log("user :>> ", user);
    if (!user) {
      return next(null, false);
    }
    next(null, user);
  } catch (error) {
    next(error, false);
  }
};

export const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
  jwtVerify,
  jwtOptions,
};
