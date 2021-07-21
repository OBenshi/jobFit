import { makeExecutableSchema } from "graphql-tools";
import { resolvers as userResolvers } from "./user/resolvers";
import { merge } from "lodash";
import User from "./user/typeDefs";
import { gql } from "apollo-server-express";
import { scalarResolverMap } from "./scalarTypes";
import {
  typeDefs as ScalarTypeDef,
  resolvers as ScalarResolvers,
} from "graphql-scalars";
const Query = gql`
  type Query {
    _empty: String
  }
  #   type Mutation {
  #     _empty: String
  #   }
  #   type Subscription {
  #     _empty: String
  #   }
`;
const typeDefs = [...ScalarTypeDef, User, Query];
const resolvers = merge(ScalarResolvers, userResolvers, scalarResolverMap);

export const schema = makeExecutableSchema({ typeDefs, resolvers });
