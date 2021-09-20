"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_tools_1 = require("graphql-tools");
const lodash_1 = require("lodash");
const typeDefs_1 = __importDefault(require("./comments/typeDefs"));
const resolvers_1 = require("./comments/resolvers");
const typeDefs_2 = __importDefault(require("./user/typeDefs"));
const resolvers_2 = require("./user/resolvers");
const typeDefs_3 = __importDefault(require("./datingText/typeDefs"));
const resolvers_3 = require("./datingText/resolvers");
const apollo_server_express_1 = require("apollo-server-express");
const scalarTypes_1 = require("./scalarTypes");
const graphql_scalars_1 = require("graphql-scalars");
const Query = apollo_server_express_1.gql `
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
  #   type Subscription {
  #     _empty: String
  #   }
`;
const typeDefs = [...graphql_scalars_1.typeDefs, typeDefs_2.default, typeDefs_1.default, typeDefs_3.default, Query];
const resolvers = lodash_1.merge(graphql_scalars_1.resolvers, resolvers_2.resolvers, resolvers_1.resolvers, resolvers_3.resolvers, scalarTypes_1.scalarResolverMap);
exports.schema = graphql_tools_1.makeExecutableSchema({ typeDefs, resolvers });
