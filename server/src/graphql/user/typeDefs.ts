import { gql } from "apollo-server-express";
import { DateTimeTypeDefinition } from "graphql-scalars";
export default gql`
  type User {
    _id: ID
    username: String
    firstName: String
    lastName: String
    birthday: DateTime
    email: String
    rank: Int
    avatar: String
    loggedIn: Boolean
    comments: [String]
    datingTexts: [String]
  }
  input userProfileInput {
    _id: ID
    username: String
    firstName: String
    lastName: String
    birthday: DateTime
    email: String
    rank: Int
    avatar: String
    loggedIn: Boolean
    comments: String
    datingTexts: String
  }

  input logInInput {
    email: String
    password: String
  }

  extend type Query {
    users: [User]
    user(_id: String): User
  }
  extend type Mutation {
    logIn(input: logInInput): User!
    # addUser(input: UserInput!): User!
  }
`;
