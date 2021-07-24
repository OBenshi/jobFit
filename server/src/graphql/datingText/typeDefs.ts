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
    _id: ObjectID
    owner: ObjectID
    text: String
    score: Int
    postDate: DateTime
    comments: [ObjectID]
    display: Boolean
    private: Boolean
  }
  input newDTI {
    owner: ObjectID
    text: String
    postDate: DateTime
    display: Boolean
    xprivate: Boolean
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
  }
  extend type Mutation {
    # logIn(input: logInInput): User!
    # logOut(input: logOutInput): JSON!
    addDatingText(input: newDTI): datingText!
    editDatingText(input: editText!): datingText!
  }
`;
