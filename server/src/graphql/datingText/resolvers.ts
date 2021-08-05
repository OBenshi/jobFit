import {
  ApolloError,
  ApolloServer,
  AuthenticationError,
} from "apollo-server-express";
import { datingTextNs, UserNs } from "../../@types";
import datingTextModel from "../../models/datingTextsModel";
import { ObjectID } from "mongodb";
import userModel from "../../models/usersModel";
import { getUser } from "../../context";
import watsonTA from '../../watson';


export const resolvers = {
  //* ---------------------------- // SECTION Query ---------------------------- */

  Query: {
    allTexts: async (a, b, { auth }) => {
      try {
        const userAuth = await getUser(auth);
        console.log(`userAuth in allTexts`, userAuth);
        if (userAuth === null) {
          return new AuthenticationError("UNAUTHORIZED");
        }
        try {
          console.log("you should not be seeing this");
          const datingTexts = await datingTextModel
            .find({})
            .populate({ path: "comments", populate: { path: "owner" } });
          return datingTexts;
        } catch (err) {
          console.error("¡error! : ", err);
          throw new ApolloError("Error retrieving all dating texts", "500");
        }
      } catch (err) {
        return new AuthenticationError("UNAUTHORIZED");
      }
    },
    aText: async (parent: any, args: ObjectID, { auth }) => {
      try {
        const userAuth = await getUser(auth);
        console.log(`userAuth in aText`, userAuth);
        try {
          const datingText = await datingTextModel
            .findById(args)
            .populate({ path: "comments" });
          if (datingText === null) {
            return new ApolloError("Dating Text not found", "204");
          }
          return datingText;
        } catch (err) {
          console.log(`err`, err);
          return new ApolloError("Error finding Dating text", "500");
        }
      } catch (err) {
        return new AuthenticationError("UNAUTHORIZED");
      }
    },
  },

  //* ----------------------------- !SECTION Query ----------------------------- */

  //* ---------------------------- SECTION Mutation ---------------------------- */
  Mutation: {
    //*--------------------------- SECTION DT MAINTENANCE -------------------------- */
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
    //*-------------------------- !SECTION DT MAINTENANCE -------------------------- */

    //* ---------------------------- SECTION ADD TEXT ---------------------------- */
    addDatingText: async (
      parent,
      { text: { owner, postDate, text, xprivate } },
      { auth }
    ) => {
      try {
        
        const toneResult: string[] = await watsonTA(text);
        console.log('toneResult', toneResult);
        const userAuth = await getUser(auth);
        console.log(`userAuth in addText`, userAuth);
        
        try {
          console.log(`owner`, owner);
          const newDT: datingTextNs.datingTextSchemaData = new datingTextModel({
            owner,
            postDate,
            text,
            score: 0,
            display: true,
            private: xprivate,
            comments: [],
          });
          if (newDT === null) {
            return new ApolloError("failed to post text", "502");
          }
          const savedText = await newDT.save();
          if (savedText === null) {
            return new ApolloError("failed to save text", "503");
          }
          const user = await userModel.findByIdAndUpdate(
            { _id: userAuth.id },
            { $addToSet: { datingTexts: savedText._id } },
            { useFindAndModify: false }
          );
          if (user === null) {
            return new ApolloError("failed to save text to user", "504");
          }
          console.log("saved Text is...", savedText);
          return savedText;
        } catch (err) {
          console.log(`err`, err);
          throw new ApolloError("Could not create new Text", "500");
        }
      } catch (err) {
        return new AuthenticationError("UNAUTHORIZED");
      }
    },
    //* ---------------------------- !SECTION ADD TEXT --------------------------- */

    //* ---------------------------- SECTION EDIT TEXT --------------------------- */

    editDatingText: async (
      parent: any,
      { text, xprivate, display, _id }: datingTextNs.editText,
      { auth }
    ) => {
      try {
        const userAuth = await getUser(auth);
        console.log(`userAuth in edit`, userAuth);
        try {
          const editDT = datingTextModel
            .findByIdAndUpdate(
              { _id: _id },
              {
                $set: {
                  text: text,
                  private: xprivate,
                  display: display,
                },
              },
              { useFindAndModify: false, new: true }
            )
            .populate({ path: "comments", populate: { path: "owner" } });
          if (editDT === null) {
            return new ApolloError("failed to edit text", "502");
          }
          return editDT;
        } catch (err) {
          console.log(`err`, err);
          throw new ApolloError("Could not edit Text", "500");
        }
      } catch (err) {
        return new AuthenticationError("UNAUTHORIZED");
      }
    },

    //* ------------------------- END !SECTION EDIT TEXT ------------------------- */
  },
  //* ---------------------------- !SECTION Mutation --------------------------- */
};
