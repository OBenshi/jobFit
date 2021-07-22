import { Kind, GraphQLScalarType } from "graphql";
import { DateTimeResolver } from "graphql-scalars";
import { GeneralNs } from "../@types";
import { gql } from "apollo-server-express";

export const scalarResolverMap = {
  DateTime: DateTimeResolver,
  //? room for more
};
