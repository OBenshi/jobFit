import { ApolloError } from "apollo-server-express";
import { UserNs } from "../../@types";
import userModel from "../../models/usersModel";

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
          throw new ApolloError("User not found", "204");
        } else {
          return user;
        }
      } catch (err) {
        console.log(err);
        throw new ApolloError("error", "500");
      }
    },
    addUser: async (parent, args) => {
      const { input }: { input: UserNs.newUser } = args;
      // console.log(`input`, input);
      try {
        const {
          email,
          password,
          username,
          birthday,
          firstName,
          lastName,
          avatar,
        } = input;
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
          const comments = [],
            datingTexts = [];
          console.log(`username`, username);
          const newUser: UserNs.userSchemaData = new userModel({
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
          return savedUser;
        }
        return 9;
      } catch (err) {
        console.log(`err`, err);
        throw new ApolloError("Could not create user", "400");
      }
    },
  },
};
