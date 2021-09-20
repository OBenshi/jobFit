"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
//* ----------------------------- SECTION IMPORTS ---------------------------- */
const apollo_server_express_1 = require("apollo-server-express");
require('dotenv').config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// import { sendConfirmationEmail } from "../../mailer/mailer";
const usersModel_1 = __importDefault(require("../../models/usersModel"));
const context_1 = require("../../context");
//* --------------------------  !SECTION IMPORTS -------------------------- */
//* ------------------------- SECTION USER RESOLVERS ------------------------- */
exports.resolvers = {
    //* ---------------------------- // SECTION Query ---------------------------- */
    Query: {
        //* ------------------------- SECTION ALL USERS Query ------------------------ */
        users: async (a, b, { auth }) => {
            try {
                const users = await usersModel_1.default.find({});
                return users;
            }
            catch (err) {
                console.error('users error', err);
                throw new apollo_server_express_1.ApolloError('Error retrieving all users', '400');
            }
        },
        //* ------------------------- END !SECTION ALL USERS ------------------------- */
        //* ----------------------------- SECTION A USER ----------------------------- */
        user: async (a, b, { auth }) => {
            try {
                const userAuth = await context_1.getUser(auth);
                console.log('auth is...', auth);
                console.log(`userAuth in user`, userAuth);
                if (userAuth === null) {
                    return new apollo_server_express_1.AuthenticationError('UNAUTHORIZED');
                }
                try {
                    const user = await usersModel_1.default
                        .findOne({ _id: userAuth.id })
                        .populate({
                        path: 'datingTexts',
                        populate: { path: 'comments', populate: { path: 'owner' } },
                        // populate: { path: 'owner' },
                    })
                        .populate({
                        path: 'datingTexts',
                        populate: { path: 'owner' },
                        // populate: { path: 'owner' },
                    })
                        .populate({ path: 'comments', populate: { path: 'owner' } });
                    return user;
                }
                catch (err) {
                    console.log(`err`, err);
                    return new apollo_server_express_1.ApolloError('Error retrieving user info', '501');
                }
            }
            catch (err) {
                return new apollo_server_express_1.AuthenticationError('UNAUTHORIZED');
            }
        },
        //* --------------------------- END !SECTION A USER -------------------------- */
    },
    //* ----------------------------- !SECTION Query ----------------------------- */
    //* ---------------------------- SECTION Mutation ---------------------------- */
    Mutation: {
        //*--------------------------- SECTION User MAINTENANCE -------------------------- */
        // UpdateAllUsers: async (parent, args) => {
        //   try {
        //     const users = await userModel.updateMany(
        //       {},
        //       { $set: { } },
        //       { useFindAndModify: false }
        //     );
        //     return { status: 200, msg: "LogOut successful" };
        //   } catch (err) {
        //     console.log(`err`, err);
        //     throw new ApolloError("shit", "69");
        //   }
        // },
        //set WATSON feature for all users
        // UpdateAllUsers: async (parent, args, { auth }) => {
        //   const userAuth = await getUser(auth);
        //   if (userAuth === null) {
        //     return new AuthenticationError("UNAUTHORIZED");
        //   }
        //   try {
        //     const password = await bcrypt.hash("testing1", 10);
        //     const users = await userModel.findByIdAndUpdate(
        //       { _id: "610688be5e49c31464c742d7" },
        //       { $set: { password: password } },
        //       { useFindAndModify: false }
        //     );
        //     return { status: 200, msg: "LogOut successful" };
        //   } catch (err) {
        //     console.log(`err`, err);
        //     throw new ApolloError("shit", "69");
        //   }
        // },
        //*-------------------------- !SECTION User MAINTENANCE -------------------------- */
        //* ------------------------------ SECTION LogIn ----------------------------- */
        logIn: async (_, args) => {
            const { email, password } = args;
            try {
                //?STUB connecting to mongoDB
                const user = await usersModel_1.default
                    .findOne({
                    email: email,
                })
                    .populate({ path: 'datingTexts', populate: { path: 'owner' } })
                    .populate({ path: 'comments', populate: { path: 'owner' } });
                console.log(`user`, user);
                if (user === null || !user) {
                    throw new apollo_server_express_1.ApolloError('User not found', '204');
                }
                else {
                    const match = await bcrypt_1.default.compare(password, user.password);
                    if (!match)
                        throw new apollo_server_express_1.AuthenticationError('wrong password!');
                    user.loggedIn = true;
                    user.save();
                    const token = jsonwebtoken_1.default.sign({
                        id: user._id,
                    }, process.env.WOJCIECH, {
                        expiresIn: '8d',
                    });
                    return {
                        ...user.toJSON(),
                        token,
                    };
                }
            }
            catch (err) {
                console.log(err);
                throw new apollo_server_express_1.ApolloError('error', '500');
            }
        },
        //* ----------------------------- !SECTION LogIn ----------------------------- */
        //* ----------------------------- SECTION LogOut ----------------------------- */
        logOut: async (parent, args, { auth }) => {
            const userAuth = await context_1.getUser(auth);
            if (userAuth === null) {
                return new apollo_server_express_1.AuthenticationError('UNAUTHORIZED');
            }
            try {
                const user = await usersModel_1.default.findByIdAndUpdate({ _id: userAuth.id }, { $set: { loggedIn: false } }, { useFindAndModify: false });
                if (user === null || !user) {
                    throw new apollo_server_express_1.ApolloError('User not found', '204');
                }
                else {
                    return { status: 200, msg: 'LogOut successful' };
                }
            }
            catch (err) {
                console.log(err);
                return new apollo_server_express_1.ApolloError('LogOut Failed', '501');
            }
        },
        //* ----------------------------- !SECTION LogOut ---------------------------- */
        //* ---------------------------- SECTION ADD USER ---------------------------- */
        addUser: async (_, { user: { email, password, username, birthday, firstName, lastName, avatar, }, }) => {
            if (password.length < 8)
                throw new apollo_server_express_1.UserInputError('Password must be at least 8 characters long');
            try {
                const existingUser = JSON.parse(JSON.stringify(await usersModel_1.default.findOne({
                    $or: [{ username: username }, { email: email }],
                })));
                if (existingUser !== null) {
                    if (existingUser.username === username)
                        return new apollo_server_express_1.ApolloError('Username already exists', '409');
                    else if (existingUser.email === email) {
                        return new apollo_server_express_1.ApolloError('Email already exists', '409');
                    }
                }
                else {
                    password = await bcrypt_1.default.hash(password, 10);
                    const comments = [], datingTexts = [];
                    console.log(`username`, username);
                    const newUser = new usersModel_1.default({
                        email,
                        username,
                        password,
                        firstName,
                        lastName,
                        birthday,
                        loggedIn: false,
                        comments: [],
                        datingTexts: [],
                        rank: 1,
                        avatar,
                    });
                    const savedUser = await newUser.save();
                    const token = jsonwebtoken_1.default.sign({
                        id: savedUser._id,
                    }, process.env.WOJCIECH, {
                        expiresIn: '8h',
                    });
                    return {
                        ...savedUser.toJSON(),
                        token,
                    };
                }
            }
            catch (err) {
                console.log(`err`, err);
                throw new apollo_server_express_1.ApolloError('Could not create user', '400');
            }
        },
        //* ---------------------------- !SECTION ADD USER --------------------------- */
        //* ----------------------- SECTION UPDATE USER PROFILE ---------------------- */
        updateUserProfile: async (_, args, { auth }) => {
            const userAuth = await context_1.getUser(auth);
            if (userAuth === null) {
                return new apollo_server_express_1.AuthenticationError('UNAUTHORIZED');
            }
            try {
                const token = auth.split('Bearer ')[1];
                console.log(`auth2`, token);
                const { user } = args;
                if (user.username) {
                    const existingUser = await usersModel_1.default.findOne({
                        username: user.username,
                    });
                    if (existingUser !== null) {
                        console.log(`existingUser`, existingUser);
                        const bob = new apollo_server_express_1.ApolloError('Username already taken', '950');
                        const bib = bob.code;
                        // console.log(bob.);
                        return bob;
                    }
                }
                if (user.password) {
                    user.password = await bcrypt_1.default.hash(user.password, 10);
                }
                const updatedUser = await usersModel_1.default
                    .findByIdAndUpdate({ _id: userAuth.id }, {
                    $set: user,
                }, { useFindAndModify: false, new: true })
                    .populate({ path: 'datingTexts' })
                    .populate({ path: 'comments' });
                if (updatedUser === null || !updatedUser) {
                    throw new apollo_server_express_1.ApolloError('User not found', '204');
                }
                else {
                    // return updatedUser;
                    return {
                        ...updatedUser.toJSON(),
                        token,
                    };
                }
            }
            catch (err) {
                return new apollo_server_express_1.ApolloError('Failed to update user', '69');
            }
        },
        //* -------------------- END !SECTION UPDATE USER PROFILE -------------------- */
    },
    //* ---------------------------- !SECTION Mutation --------------------------- */
};
//* -----------------------  !SECTION USER RESOLVERS ---------------------- */
