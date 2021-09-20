"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const datingTextsModel_1 = __importDefault(require("../../models/datingTextsModel"));
const usersModel_1 = __importDefault(require("../../models/usersModel"));
const context_1 = require("../../context");
const watson_1 = __importDefault(require("../../watson"));
exports.resolvers = {
    //* ---------------------------- // SECTION Query ---------------------------- */
    Query: {
        //* ---------------------------- SECTION ALL TEXTS --------------------------- */
        allTexts: async (a, b, { auth }) => {
            try {
                const userAuth = await context_1.getUser(auth);
                console.log(`userAuth in allTexts`, userAuth);
                if (userAuth === null) {
                    return new apollo_server_express_1.AuthenticationError('UNAUTHORIZED');
                }
                try {
                    console.log('you should not be seeing this');
                    const datingTexts = await datingTextsModel_1.default
                        .find({})
                        .populate({ path: 'owner' })
                        .sort({ postDate: -1 })
                        .populate({
                        path: 'comments',
                        options: { sort: { postDate: -1 } },
                        populate: { path: 'owner' },
                    });
                    return datingTexts;
                }
                catch (err) {
                    console.error('¡error! : ', err);
                    throw new apollo_server_express_1.ApolloError('Error retrieving all dating texts', '500');
                }
            }
            catch (err) {
                return new apollo_server_express_1.AuthenticationError('UNAUTHORIZED');
            }
            //* ------------------------- END !SECTION ALL TEXTS ------------------------- */
        },
        //* ----------------------------- SECTION A TEXT ----------------------------- */
        aText: async (parent, args, { auth }) => {
            try {
                const userAuth = await context_1.getUser(auth);
                console.log(`userAuth in aText`, userAuth);
                if (userAuth === null) {
                    return new apollo_server_express_1.AuthenticationError('UNAUTHORIZED');
                }
                try {
                    const datingText = await datingTextsModel_1.default
                        .findById(args)
                        .populate({ path: 'comments' });
                    if (datingText === null) {
                        return new apollo_server_express_1.ApolloError('Dating Text not found', '204');
                    }
                    return datingText;
                }
                catch (err) {
                    console.log(`err`, err);
                    return new apollo_server_express_1.ApolloError('Error finding Dating text', '500');
                }
            }
            catch (err) {
                return new apollo_server_express_1.AuthenticationError('UNAUTHORIZED');
            }
            //* --------------------------- END !SECTION A TEXT -------------------------- */
        },
        //* ----------------------------- SECTION A TONE ----------------------------- */
        aTone: async (parent, args, { auth }) => {
            try {
                const userAuth = await context_1.getUser(auth);
                console.log(`userAuth in aText`, userAuth);
                if (userAuth === null) {
                    return new apollo_server_express_1.AuthenticationError('UNAUTHORIZED');
                }
                try {
                    console.log(`args`, args);
                    const toneResult = await watson_1.default(args);
                    console.log('toneResult', toneResult);
                    return toneResult;
                }
                catch (err) {
                    return new apollo_server_express_1.ApolloError(err);
                }
            }
            catch (err) {
                return new apollo_server_express_1.AuthenticationError('UNAUTHORIZED');
            }
            //* --------------------------- END !SECTION A TONE -------------------------- */
        },
        //* --------------------------- SECTION SEARCH TEXT -------------------------- */
        searchText: async (parent, args, { auth }) => {
            try {
                const userAuth = await context_1.getUser(auth);
                console.log(`userAuth in search`, userAuth);
                if (userAuth === null) {
                    return new apollo_server_express_1.AuthenticationError('UNAUTHORIZED');
                }
                try {
                    const { searchTerm } = args;
                    console.log(`searchTerm`, searchTerm);
                    const datingTexts = await datingTextsModel_1.default
                        .find({ text: { $regex: searchTerm, $options: 'i' } })
                        .populate({ path: 'owner' })
                        .populate({ path: 'comments', populate: { path: 'owner' } });
                    return datingTexts;
                }
                catch (err) {
                    console.error('¡error! : ', err);
                    throw new apollo_server_express_1.ApolloError('Error retrieving all dating texts', '500');
                }
            }
            catch (err) {
                return new apollo_server_express_1.AuthenticationError('UNAUTHORIZED');
            }
            //* ------------------------ END !SECTION SEARCH TEXT ------------------------ */
        },
        //* --------------------------- END !SECTION Query --------------------------- */
    },
    //* ---------------------------- SECTION Mutation ---------------------------- */
    Mutation: {
        //*--------------------------- SECTION DT MAINTENANCE -------------------------- */
        textMaintenance: async (parent, args, { auth }) => {
            try {
                datingTextsModel_1.default.createIndexes({
                    text: 'text',
                });
                return { status: 200, msg: 'update successful' };
            }
            catch (err) {
                console.log(`err`, err);
                throw new apollo_server_express_1.ApolloError('shit', '69');
            }
        },
        //* ----------------------- END !SECTION DT MAINTENANCE ---------------------- */
        //* ---------------------------- SECTION ADD TEXT ---------------------------- */
        addDatingText: async (parent, args, { auth }) => {
            try {
                const userAuth = await context_1.getUser(auth);
                console.log(`userAuth in addText`, userAuth);
                if (userAuth === null) {
                    return new apollo_server_express_1.AuthenticationError('UNAUTHORIZED');
                }
                try {
                    const { postDate, text, toneResults, xprivate } = args.text;
                    console.log(`tones`, toneResults);
                    const newDT = new datingTextsModel_1.default({
                        owner: userAuth.id,
                        postDate,
                        text,
                        score: 0,
                        display: true,
                        private: xprivate,
                        comments: [],
                        toneResults: toneResults,
                    });
                    if (newDT === null) {
                        return new apollo_server_express_1.ApolloError('failed to post text', '502');
                    }
                    const savedText = await newDT.save();
                    if (savedText === null) {
                        return new apollo_server_express_1.ApolloError('failed to save text', '503');
                    }
                    const user = await usersModel_1.default.findByIdAndUpdate({ _id: userAuth.id }, { $addToSet: { datingTexts: savedText._id } }, { useFindAndModify: false });
                    if (user === null) {
                        return new apollo_server_express_1.ApolloError('failed to save text to user', '504');
                    }
                    return savedText;
                }
                catch (err) {
                    console.log(`err`, err);
                    throw new apollo_server_express_1.ApolloError('Could not create new Text', '500');
                }
            }
            catch (err) {
                return new apollo_server_express_1.AuthenticationError('UNAUTHORIZED');
            }
            //* -------------------------- END !SECTION ADD TEXT ------------------------- */
        },
        //* ---------------------------- SECTION EDIT TEXT --------------------------- */
        editDatingText: async (parent, { text, xprivate, display, _id }, { auth }) => {
            try {
                const userAuth = await context_1.getUser(auth);
                console.log(`userAuth in edit`, userAuth);
                if (userAuth === null) {
                    return new apollo_server_express_1.AuthenticationError('UNAUTHORIZED');
                }
                try {
                    const editDT = datingTextsModel_1.default
                        .findByIdAndUpdate({ _id: _id }, {
                        $set: {
                            text: text,
                            private: xprivate,
                            display: display,
                        },
                    }, { useFindAndModify: false, new: true })
                        .populate({ path: 'comments', populate: { path: 'owner' } });
                    if (editDT === null) {
                        return new apollo_server_express_1.ApolloError('failed to edit text', '502');
                    }
                    return editDT;
                }
                catch (err) {
                    console.log(`err`, err);
                    throw new apollo_server_express_1.ApolloError('Could not edit Text', '500');
                }
            }
            catch (err) {
                return new apollo_server_express_1.AuthenticationError('UNAUTHORIZED');
            }
        },
        //* ------------------------- END !SECTION EDIT TEXT ------------------------- */
    },
    //* -------------------------- END !SECTION Mutation ------------------------- */
};
