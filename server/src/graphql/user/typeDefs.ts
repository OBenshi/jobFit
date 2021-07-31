import { gql } from "apollo-server-express";
import { ObjectID } from "mongodb";
// import { ObjectId } from "mongoose";

import { GeneralNs, commentsNs } from "../../@types";
import { DateTypeDefinition } from "graphql-scalars";
export default gql`
  type User {
    _id: ObjectID
    username: String
    firstName: String
    lastName: String
    birthday: DateTime
    email: EmailAddress
    password: String
    rank: Int
    avatar: String
    loggedIn: Boolean
    comments: [comment]
    datingTexts: [datingText]
    token: String
  }
  input newUserInput {
    # _id: ObjectID
    username: String
    firstName: String
    lastName: String
    birthday: DateTime
    email: EmailAddress
    password: String
    # rank: Int
    avatar: String
    # loggedIn: Boolean
    # comments: [comment]
    # datingTexts: [datingText]
  }

  input logInInput {
    email: EmailAddress
    password: String
  }

  input logOutInput {
    _id: ObjectID
  }

  extend type Query {
    users: [User]
    user(_id: ObjectID): User
  }
  extend type Mutation {
    logIn(email: String, password: String): User!
    logOut(_id: ObjectID): JSON!
    addUser(user: newUserInput!): User!
    UpdateAllUsers(input: String): JSON!
  }
`;
