import { ObjectID } from "mongodb";
import { gql } from "apollo-server-express";
// import { ObjectId } from "mongoose";
import { datingTextNs } from "../../@types";
import { DateTypeDefinition } from "graphql-scalars";
export default gql`
  type comment {
    _id: ObjectID
    owner: User
    text: String
    score: Int
    postDate: DateTime
    onText: datingText
    display: Boolean
  }
  input newComment {
    owner: ObjectID
    text: String
    score: Int
    onText: ObjectID
  }
  input editComment {
    _id: ObjectID
    text: String
    display: Boolean
    score: Int
  }

  extend type Query {
    allComments: [comment!]!
    aComment(_id: ObjectID): comment!
  }
  extend type Mutation {
    # logIn(input: logInInput): User!
    # logOut(input: logOutInput): JSON!
    addComment(comment: newComment): comment!
    editComment(input: editComment!): comment!
  }
`;
