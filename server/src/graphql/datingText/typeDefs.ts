import { ObjectID } from "mongodb";
import { gql } from "apollo-server-express";
// import { ObjectId } from "mongoose";
import { datingTextNs } from "../../@types";
import { DateTypeDefinition } from "graphql-scalars";
export default gql`
  type id {
    _id: ObjectID
  }
  type datingText {
    _id: ID
    owner: ObjectID
    text: String
    score: Int
    postDate: Date
    comments: [ObjectID]
    display: Boolean
  }
  input newDTInput {
    owner: ID
    text: String
    postDate: Date
    display: Boolean
    private: Boolean
  }

  input showHideInput {
    user: ID
    datingText: ObjectID
  }

  extend type Query {
    allTexts: [datingText!]!
    aText(_id: ID): datingText!
  }
  #   extend type Mutation {
  # logIn(input: logInInput): User!
  # logOut(input: logOutInput): JSON!
  # addDatingText(input: newDTInput!): datingText!
  # UpdateAllUsers(input: String): JSON!
  #   }
`;
