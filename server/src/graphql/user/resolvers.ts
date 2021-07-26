import { ApolloError, ApolloServer } from "apollo-server-express";
import { UserNs } from "../../@types";
import { ObjectId, ObjectID } from "mongodb";

// import { sendConfirmationEmail } from "../../mailer/mailer";
import userModel from "../../models/usersModel";
export const resolvers = {
  //* ---------------------------- // SECTION Query ---------------------------- */

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
    user: async (parent: any, args) => {
      console.log(`args`, args._id);
      // const { id } = args;
      try {
        console.log(`args`, args);
        const user = await userModel
          .findById(args._id)
          .populate({ path: "datingTexts" })
          .populate({ path: "comments" });
        return user;
      } catch (err) {
        console.log(`err`, err);
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
    logIn: async (parent, args) => {
      //?STUB input from args
      const { input }: { input: UserNs.logInInput } = args;
      console.log(`input`, input);
      try {
        //?STUB email&password from input
        const { email, password } = input;
        console.log(`email`, email);
        //?STUB connecting to mongoDB
        const user = await userModel
          .findOneAndUpdate(
            {
              email: email,
              password: password,
            },
            { $set: { loggedIn: true } },
            { useFindAndModify: false }
          )
          .populate({ path: "datingTexts" })
          .populate({ path: "comments" });
        console.log(`user`, user);
        if (user === null || !user) {
          throw new ApolloError("User not found", "204");
        } else {
          //TODO token
          return user;
        }
      } catch (err) {
        console.log(err);
        throw new ApolloError("error", "500");
      }
    },
    //* ----------------------------- !SECTION LogIn ----------------------------- */

    //* ----------------------------- SECTION LogOut ----------------------------- */
    logOut: async (parent, args) => {
      const { input }: { input: UserNs.logOutInput } = args;
      try {
        const { _id } = input;
        const user = await userModel.findByIdAndUpdate(
          { _id: _id },
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
    },
    //* ----------------------------- !SECTION LogOut ---------------------------- */

    //* ---------------------------- SECTION ADD USER ---------------------------- */
    addUser: async (parent, args) => {
      const { input }: { input: UserNs.newUser } = args;
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
          //TODO email validation
          return savedUser;
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
