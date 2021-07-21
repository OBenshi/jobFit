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

  extend type Query {
    users: [User]
    user: User
    zhz(_id: String): User
  }
`;
