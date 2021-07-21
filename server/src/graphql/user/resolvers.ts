import { ApolloError } from "apollo-server-express";
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
    user: async () => {
      const thing = await userModel.find({ _id: "60f6ac4045262f2d01903ad3" });
      return thing;
    },
    zhz: async (parent, args) => {
      try {
        console.log(`args`, args);
        const user = await userModel.findById({ _id: args._id });
        console.log(`user`, user);
        return user;
      } catch (err) {
        console.log(`err`, err);
      }
    },
  },
};
