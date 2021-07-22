import { gql } from "apollo-server-express";
import { ObjectId } from "mongoose";
import { GeneralNs } from "../../@types";
import { DateTypeDefinition } from "graphql-scalars";
export default gql`
  type User {
    _id: ID
    username: String
    firstName: String
    lastName: String
    birthday: Date
    email: String
    password: String
    rank: Int
    avatar: String
    loggedIn: Boolean
    comments: [ObjectID]
    datingTexts: [ObjectID]
  }
  input newUserInput {
    _id: ID
    username: String
    firstName: String
    lastName: String
    birthday: DateTime
    email: String
    password: String
    rank: Int
    avatar: String
    loggedIn: Boolean
    comments: [ObjectID]
    datingTexts: [ObjectID]
  }

  input logInInput {
    email: String
    password: String
  }

  input logOutInput {
    _id: ObjectID
  }

  extend type Query {
    users: [User]
    user(_id: String): User
  }
  extend type Mutation {
    logIn(input: logInInput): User!
    logOut(input: logOutInput): JSON!
    addUser(input: newUserInput!): User!
  }
`;
