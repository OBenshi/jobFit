"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtStrategy = exports.jwtVerify = exports.jwtOptions = void 0;
const JwtStrategy = require("passport-jwt").Strategy, ExtractJwt = require("passport-jwt").ExtractJwt;
require("dotenv").config();
const WOJCIECH = require("./config.js").secretOrKey;
const usersModel_1 = __importDefault(require("./models/usersModel"));
exports.jwtOptions = {
    secretOrKey: process.env.WOJCIECH,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};
const jwtVerify = async (payload, next) => {
    try {
        const user = await usersModel_1.default.findById(payload.id);
        console.log("user :>> ", user);
        if (!user) {
            return next(null, false);
        }
        next(null, user);
    }
    catch (error) {
        next(error, false);
    }
};
exports.jwtVerify = jwtVerify;
exports.jwtStrategy = new JwtStrategy(exports.jwtOptions, exports.jwtVerify);
module.exports = {
    jwtStrategy: exports.jwtStrategy,
    jwtVerify: exports.jwtVerify,
    jwtOptions: exports.jwtOptions,
};
