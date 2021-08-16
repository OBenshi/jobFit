import { ObjectID } from "mongodb";
import { gql } from "apollo-server-express";
// import { ObjectId } from "mongoose";
import { datingTextNs } from "../../@types";
import { DateTypeDefinition } from "graphql-scalars";
export default gql`
  type datingText {
    _id: ObjectID
    owner: User
    text: String
    score: Int
    postDate: DateTime
    comments: [comment]
    display: Boolean
    private: Boolean
    toneResults: JSON
  }
  input newDTI {
    # owner: ObjectID!
    text: String!
    postDate: DateTime!
    display: Boolean!
    xprivate: Boolean!
    toneResults: JSON!
  }
  input editText {
    _id: ObjectID
    text: String
    display: Boolean
    xprivate: Boolean
  }
  input showHideInput {
    user: ID
    datingText: ObjectID
  }
  extend type Query {
    allTexts: [datingText!]!
    aText(_id: ObjectID): datingText!
    aTone(text: String!): JSON!
  }
  extend type Mutation {
    # logIn(input: logInInput): User!
    # logOut(input: logOutInput): JSON!
    addDatingText(text: newDTI!): datingText!
    editDatingText(input: editText!): datingText!
  }
`;
