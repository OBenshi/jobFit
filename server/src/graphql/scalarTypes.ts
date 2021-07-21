import { Kind, GraphQLScalarType } from "graphql";
import { DateTimeResolver } from "graphql-scalars";

export const scalarResolverMap = {
  DateTime: DateTimeResolver,
  //? room for more
};
