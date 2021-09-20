"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = apollo_server_express_1.gql `
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
    searchText(searchTerm: String!): [datingText]
  }
  extend type Mutation {
    textMaintenance: JSON!
    addDatingText(text: newDTI!): datingText!
    editDatingText(input: editText!): datingText!
  }
`;
