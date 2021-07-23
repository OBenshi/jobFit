import { ApolloError, ApolloServer } from "apollo-server-express";
import { datingTextNs } from "../../@types";
// import { ObjectId } from "mongoose";
// import { ObjectID } from "mongodb";

import { sendConfirmationEmail } from "../../mailer/mailer";
import datingTextModel from "../../models/datingTextsModel";
import usersModel from "../../models/usersModel";

import { ObjectID } from "mongodb";
export const resolvers = {
  //* ---------------------------- // SECTION Query ---------------------------- */

  Query: {
    allTexts: async () => {
      try {
        const datingTexts = await datingTextModel.find({});
        return datingTexts;
      } catch (err) {
        console.error("¡error! : ", err);
        throw new ApolloError("Error retrieving all dating texts", "500");
      }
    },
    aText: async (parent, args: ObjectID) => {
      try {
        const datingText = await datingTextModel.findById(args);
        if (datingText === null) {
          return new ApolloError("Dating Text not found", "204");
        }
        return datingText;
      } catch (err) {
        console.log(`err`, err);
        return new ApolloError("Error finding Dating text", "500");
      }
    },
  },

  //* ----------------------------- !SECTION Query ----------------------------- */

  //* ---------------------------- SECTION Mutation ---------------------------- */
  Mutation: {
    //*--------------------------- SECTION MAINTENANCE -------------------------- */
    // UpdateAllUsers: async (parent, args) => {
    //   try {
    //     sendConfirmationEmail("bob", "benshi.code@gmail.com");
    //     // const users = await userModel.updateMany(
    //     //   {},
    //     //   { $set: { loggedIn: true } },
    //     //   { useFindAndModify: false }
    //     // );
    //     return { status: 200, msg: "update successful" };
    //   } catch (err) {
    //     console.log(`err`, err);
    //     throw new ApolloError("shit", "69");
    //   }
    // },
    //*-------------------------- !SECTION MAINTENANCE -------------------------- */
    //* ------------------------------ SECTION LogIn ----------------------------- */
    // logIn: async (parent, args) => {
    //   //?STUB imput from args
    //   const { input }: { input: UserNs.logInInput } = args;
    //   console.log(`input`, input);
    //   try {
    //     //?STUB email&password from input
    //     const { email, password } = input;
    //     console.log(`email`, email);
    //     //?STUB connecting to mongoDB
    //     const user = await userModel.findOneAndUpdate(
    //       {
    //         email: email,
    //         password: password,
    //       },
    //       { $set: { loggedIn: true } },
    //       { useFindAndModify: false }
    //     );
    //     console.log(`user`, user);
    //     if (user === null || !user) {
    //       throw new ApolloError("User not found", "204");
    //     } else {
    //       //TODO token
    //       return user;
    //     }
    //   } catch (err) {
    //     console.log(err);
    //     throw new ApolloError("error", "500");
    //   }
    // },
    //* ----------------------------- !SECTION LogIn ----------------------------- */
    //* ----------------------------- SECTION LogOut ----------------------------- */
    // logOut: async (parent, args) => {
    //   const { input }: { input: UserNs.logOutInput } = args;
    //   try {
    //     const { _id } = input;
    //     const user = await userModel.findByIdAndUpdate(
    //       { _id: _id },
    //       { $set: { loggedIn: false } },
    //       { useFindAndModify: false }
    //     );
    //     if (user === null || !user) {
    //       throw new ApolloError("User not found", "204");
    //     } else {
    //       return { status: 200, msg: "LogOut successful" };
    //     }
    //   } catch (err) {
    //     console.log(err);
    //     return new ApolloError("LogOut Failed", "501");
    //   }
    // },
    //* ----------------------------- !SECTION LogOut ---------------------------- */
    //* ---------------------------- SECTION ADD USER ---------------------------- */
    // addUser: async (parent, args) => {
    //   const { input }: { input: UserNs.newUser } = args;
    //   try {
    //     const {
    //       email,
    //       password,
    //       username,
    //       birthday,
    //       firstName,
    //       lastName,
    //       avatar,
    //     } = input;
    //     const existingUser = JSON.parse(
    //       JSON.stringify(
    //         await userModel.findOne({
    //           $or: [{ username: username }, { email: email }],
    //         })
    //       )
    //     );
    //     if (existingUser !== null) {
    //       if (existingUser.username === username)
    //         return new ApolloError("Username already exists", "409");
    //       else if (existingUser.email === email) {
    //         return new ApolloError("Email already exists", "409");
    //       }
    //     } else {
    //       const comments = [],
    //         datingTexts = [];
    //       console.log(`username`, username);
    //       const newUser: UserNs.userSchemaData = new userModel({
    //         email,
    //         username,
    //         password,
    //         firstName,
    //         lastName,
    //         birthday,
    //         loggedIn: false,
    //         comments: [],
    //         datingTexts: [],
    //         rank: 1,
    //         avatar,
    //       });
    //       const savedUser = await newUser.save();
    //       //TODO email validation
    //       return savedUser;
    //     }
    //   } catch (err) {
    //     console.log(`err`, err);
    //     throw new ApolloError("Could not create user", "400");
    //   }
    // },
    //* ---------------------------- !SECTION ADD USER --------------------------- */
  },
  //* ---------------------------- !SECTION Mutation --------------------------- */
};
