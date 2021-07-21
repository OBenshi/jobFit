// // // import { mongoURI } from "./config";
require("dotenv").config();
const mongoURI = require("./config.js").mongoURI;
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { ApolloServer, gql } from "apollo-server-express";
// // const { ApolloServer, gql } = require("apollo-server");
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// // Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};

// Additional middleware can be mounted at this point to run before Apollo.
// app.use("*", jwtCheck, requireAuth, checkScope);

// Mount Apollo middleware here.
//   server.applyMiddleware({ app, path: "/specialUrl" });

async function startApolloServer(typeDefs, resolvers) {
  try {
    const server = new ApolloServer({ typeDefs, resolvers });
    // console.log(`server.graphqlPath`, server.graphqlPath);
    await server.start();
    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors());

    server.applyMiddleware({ app });

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("Connection to Mongo DB established");
    //@ts-ignore
    await new Promise((resolve) => app.listen({ port: 4000 }, resolve));
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    );
    return { server, app };
  } catch (err) {
    console.log(`err`, err);
  }
}
startApolloServer(typeDefs, resolvers);
