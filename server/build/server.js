"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// // // import { mongoURI } from "./config";
require("dotenv").config();
const mongoURI = require("./config.js").mongoURI;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const apollo_server_express_1 = require("apollo-server-express");
// // const { ApolloServer, gql } = require("apollo-server");
const typeDefs = apollo_server_express_1.gql `
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
        const server = new apollo_server_express_1.ApolloServer({ typeDefs, resolvers });
        // console.log(`server.graphqlPath`, server.graphqlPath);
        await server.start();
        const app = express_1.default();
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use(express_1.default.json());
        app.use(cors_1.default());
        server.applyMiddleware({ app });
        await mongoose_1.default.connect(mongoURI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        });
        console.log("Connection to Mongo DB established");
        await new Promise((resolve) => app.listen({ port: 4000 }, resolve));
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
        return { server, app };
    }
    catch (err) {
        console.log(`err`, err);
    }
}
startApolloServer(typeDefs, resolvers);
