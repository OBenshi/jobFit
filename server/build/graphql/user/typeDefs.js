"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = apollo_server_express_1.gql `
  type User {
    _id: ObjectID
    username: String
    firstName: String
    lastName: String
    birthday: DateTime
    email: EmailAddress
    password: String
    rank: Int
    # avatar: String
    loggedIn: Boolean
    comments: [comment]
    datingTexts: [datingText]
    token: String
  }
  input newUserInput {
    # _id: ObjectID
    username: String!
    firstName: String!
    lastName: String!
    birthday: DateTime
    email: EmailAddress!
    password: String!
    # rank: Int
    # avatar: String!
    # loggedIn: Boolean
    # comments: [comment]
    # datingTexts: [datingText]
  }
  input updateUserInput {
    # _id: ObjectID
    username: String
    firstName: String
    lastName: String
    email: EmailAddress
    password: String
    # avatar: String
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
    logOut: JSON!
    addUser(user: newUserInput!): User!
    UpdateAllUsers(input: String): JSON!
    updateUserProfile(user: updateUserInput!): User!
  }
`;
