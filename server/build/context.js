"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const apollo_server_express_1 = require("apollo-server-express");
require("dotenv").config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUser = async (auth) => {
    try {
        if (!auth)
            return null;
        //   new AuthenticationError("you must be logged in!");
        const token = auth.split("Bearer ")[1];
        if (!token)
            throw new apollo_server_express_1.AuthenticationError("you should provide a token!");
        const user = await jsonwebtoken_1.default.verify(token, process.env.WOJCIECH, (err, decoded) => {
            if (err)
                return new apollo_server_express_1.AuthenticationError("invalid token!");
            return decoded;
        });
        return user;
    }
    catch (err) {
        return new apollo_server_express_1.AuthenticationError("something went wrong");
    }
    //   console.log(`user from con`, user);
};
exports.getUser = getUser;
