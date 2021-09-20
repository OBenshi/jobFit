"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const schema_1 = require("./graphql/schema");
// import { context } from "./context";
const mongoURI = require('./config.js').mongoURI;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const apollo_server_express_1 = require("apollo-server-express");
// const userRoute = re './routes/users'
const corsOptions = {
    origin: '*',
    credentials: true,
};
async function startApolloServer() {
    try {
        const server = new apollo_server_express_1.ApolloServer({
            schema: schema_1.schema,
            context: ({ req }) => {
                const auth = req.headers.authorization || '';
                return {
                    auth,
                };
            },
        });
        await server.start();
        const app = express_1.default();
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use(express_1.default.json());
        app.use(cors_1.default());
        // app.use("/users", require("./routes/users"));
        server.applyMiddleware({
            app,
            cors: corsOptions,
        });
        await mongoose_1.default.connect(mongoURI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        });
        console.log('Connection to Mongo DB established');
        const port = process.env.PORT || 5000;
        //@ts-ignore
        await new Promise((resolve) => app.listen({ port: port }, resolve));
        // await new Promise((resolve) => app.listen(port));
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
        return { server, app };
    }
    catch (err) {
        console.log(`err`, err);
    }
}
startApolloServer();
