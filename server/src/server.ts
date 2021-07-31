require("dotenv").config();
import { schema } from "./graphql/schema";
// import { context } from "./context";
const mongoURI = require("./config.js").mongoURI;
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { ApolloServer, gql } from "apollo-server-express";
// const userRoute = re './routes/users'
async function startApolloServer() {
  try {
    const server = new ApolloServer({
      schema,
      context: ({ req }) => {
        const auth = req.headers.authorization || "";
        return {
          auth,
        };
      },
    });
    await server.start();
    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors());
    // app.use("/users", require("./routes/users"));
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
startApolloServer();
