//* ----------------------------- SECTION IMPORTS ---------------------------- */
import {
  ApolloError,
  ApolloServer,
  UserInputError,
  AuthenticationError,
} from "apollo-server-express";
require("dotenv").config();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserNs } from "../../@types";
import { ObjectID } from "mongodb";
// import { sendConfirmationEmail } from "../../mailer/mailer";
import userModel from "../../models/usersModel";
import { getUser } from "../../context";

//* --------------------------  !SECTION IMPORTS -------------------------- */

//* ------------------------- SECTION USER RESOLVERS ------------------------- */
export const resolvers = {
  //* ---------------------------- // SECTION Query ---------------------------- */

  Query: {
    users: async (a, b, { auth }) => {
      try {
        const userAuth = await getUser(auth);
        try {
          const users = await userModel.find({});
          return users;
        } catch (err) {
          console.error("users error", err);
          throw new ApolloError("Error retrieving all users", "400");
        }
      } catch (err) {
        return new AuthenticationError("UNAUTHORIZED");
      }
    },
    user: async (a, b, { auth }) => {
      try {
        const userAuth = await getUser(auth);
        console.log(`userAuth`, userAuth);
        try {
          const user = await userModel
            .findOne({ _id: userAuth.id })
            .populate({ path: "datingTexts" })
            .populate({ path: "comments", populate: { path: "onText" } });
          return user;
        } catch (err) {
          console.log(`err`, err);
        }
      } catch (err) {
        return new AuthenticationError("UNAUTHORIZED");
      }
    },
  },

  //* ----------------------------- !SECTION Query ----------------------------- */

  //* ---------------------------- SECTION Mutation ---------------------------- */
  Mutation: {
    //*--------------------------- SECTION User MAINTENANCE -------------------------- */

    // UpdateAllUsers: async (parent, args) => {
    //   try {
    //     sendConfirmationEmail("bob", "benshi.code@gmail.com");
    //     // const users = await userModel.updateMany(
    //     //   {},
    //     //   { $set: { loggedIn: true } },
    //     //   { useFindAndModify: false }
    //     // );
    //     return { status: 200, msg: "LogOut successful" };
    //   } catch (err) {
    //     console.log(`err`, err);
    //     throw new ApolloError("shit", "69");
    //   }
    // },

    //*-------------------------- !SECTION User MAINTENANCE -------------------------- */

    //* ------------------------------ SECTION LogIn ----------------------------- */
    logIn: async (_: any, args: { email: string; password: string }) => {
      const { email, password } = args;
      try {
        //?STUB connecting to mongoDB
        const user = await userModel
          .findOne(
            {
              email: email,
              // password: password,
            }
            // { $set: { loggedIn: true } },
            // { useFindAndModify: false }
          )
          .populate({ path: "datingTexts" })
          .populate({ path: "comments" });
        console.log(`user`, user);
        if (user === null || !user) {
          throw new ApolloError("User not found", "204");
        } else {
          const match = await bcrypt.compare(password, user.password);
          if (!match) throw new AuthenticationError("wrong password!");
          user.loggedIn = true;
          user.save();
          const token = jwt.sign(
            {
              id: user._id,
            },
            process.env.WOJCIECH,
            {
              expiresIn: "8h",
            }
          );
          return {
            ...user.toJSON(),
            token,
          };
        }
      } catch (err) {
        console.log(err);
        throw new ApolloError("error", "500");
      }
    },
    //* ----------------------------- !SECTION LogIn ----------------------------- */

    //* ----------------------------- SECTION LogOut ----------------------------- */
    logOut: async (parent: any, args: any, { auth }) => {
      try {
        const userAuth = await getUser(auth);
        try {
          const user = await userModel.findByIdAndUpdate(
            { _id: userAuth.id },
            { $set: { loggedIn: false } },
            { useFindAndModify: false }
          );
          if (user === null || !user) {
            throw new ApolloError("User not found", "204");
          } else {
            return { status: 200, msg: "LogOut successful" };
          }
        } catch (err) {
          console.log(err);
          return new ApolloError("LogOut Failed", "501");
        }
      } catch (err) {
        return new AuthenticationError("UNAUTHORIZED");
      }
    },
    //* ----------------------------- !SECTION LogOut ---------------------------- */

    //* ---------------------------- SECTION ADD USER ---------------------------- */
    addUser: async (
      _: any,
      {
        user: {
          email,
          password,
          username,
          birthday,
          firstName,
          lastName,
          avatar,
        },
      }
    ) => {
      if (password.length < 8)
        throw new UserInputError("Password must be at least 8 characters long");
      try {
        const existingUser = JSON.parse(
          JSON.stringify(
            await userModel.findOne({
              $or: [{ username: username }, { email: email }],
            })
          )
        );
        if (existingUser !== null) {
          if (existingUser.username === username)
            return new ApolloError("Username already exists", "409");
          else if (existingUser.email === email) {
            return new ApolloError("Email already exists", "409");
          }
        } else {
          password = await bcrypt.hash(password, 10);
          const comments = [],
            datingTexts = [];
          console.log(`username`, username);
          const newUser = new userModel({
            email,
            username,
            password,
            firstName,
            lastName,
            birthday,
            loggedIn: false,
            comments: [],
            datingTexts: [],
            rank: 1,
            avatar,
          });
          const savedUser = await newUser.save();
          const token = jwt.sign(
            {
              id: savedUser._id,
            },
            process.env.WOJCIECH,
            {
              expiresIn: "8h",
            }
          );
          return {
            ...savedUser.toJSON(),
            token,
          };
        }
      } catch (err) {
        console.log(`err`, err);
        throw new ApolloError("Could not create user", "400");
      }
    },
    //* ---------------------------- !SECTION ADD USER --------------------------- */
  },
  //* ---------------------------- !SECTION Mutation --------------------------- */
};
//* -----------------------  !SECTION USER RESOLVERS ---------------------- */
