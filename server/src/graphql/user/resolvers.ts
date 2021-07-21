import { ApolloError } from "apollo-server-express";
import { UserNs } from "../../@types";
import userModel from "../../models/usersModel";

// const userModel = require("../../models/usersModel");
export const resolvers = {
  Query: {
    users: async () => {
      try {
        const users = await userModel.find({});
        return users;
      } catch (err) {
        console.error("users error", err);
        throw new ApolloError("Error retrieving all users", "400");
      }
    },
    user: async (parent, args) => {
      try {
        console.log(`args`, args);
        const user = await userModel.findById({ _id: args._id });
        return user;
      } catch (err) {
        console.log(`err`, err);
      }
    },
  },
  Mutation: {
    logIn: async (parent, args) => {
      const { input }: { input: UserNs.logInInput } = args;
      console.log(`input`, input);
      try {
        const { email, password } = input;
        console.log(`email`, email);
        const user = await userModel.findOneAndUpdate(
          {
            email: email,
            password: password,
          },
          { $set: { loggedIn: true } },
          { useFindAndModify: false }
        );
        console.log(`user`, user);
        if (user === null || !user) {
          throw new ApolloError("User not found", "404");
        } else {
          return user;
        }
      } catch (err) {
        console.log(err);
        throw new ApolloError("User not found", "404");
      }
    },
  },
};
