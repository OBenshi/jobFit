"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const datingTextsModel_1 = __importDefault(require("../../models/datingTextsModel"));
const usersModel_1 = __importDefault(require("../../models/usersModel"));
const commentsModel_1 = __importDefault(require("../../models/commentsModel"));
const context_1 = require("../../context");
exports.resolvers = {
    //* ---------------------------- // SECTION Query ---------------------------- */
    Query: {
        allComments: async () => {
            try {
                const comments = await datingTextsModel_1.default.find({});
                return comments;
            }
            catch (err) {
                console.error('¡error! : ', err);
                throw new apollo_server_express_1.ApolloError('Error retrieving all comments', '500');
            }
        },
        aComment: async (parent, args) => {
            try {
                const comment = await commentsModel_1.default
                    .findById(args)
                    .populate({ path: 'owner' })
                    .populate({ path: 'onText' });
                if (comment === null) {
                    return new apollo_server_express_1.ApolloError('Comment not found', '204');
                }
                return comment;
            }
            catch (err) {
                console.log(`err`, err);
                return new apollo_server_express_1.ApolloError('Error finding Comment', '500');
            }
        },
    },
    //* ----------------------------- !SECTION Query ----------------------------- */
    //* ---------------------------- SECTION Mutation ---------------------------- */
    Mutation: {
        //*--------------------------- SECTION DT MAINTENANCE -------------------------- */
        // UpdateAllUsers: async (parent, args) => {
        //   try {
        //     sendConfirmationEmail("bob", "benshi.code@gmail.com");
        //     // const users = await userModel.updateMany(
        //     //   {},
        //     //   { $set: { loggedIn: true } },
        //     //   { useFindAndModify: false }
        //     // );
        //     return { status: 200, msg: "update successful" };
        //   } catch (err) {
        //     console.log(`err`, err);
        //     throw new ApolloError("shit", "69");
        //   }
        // },
        //*-------------------------- !SECTION DT MAINTENANCE -------------------------- */
        //* ---------------------------- SECTION ADD COMMENT ---------------------------- */
        //todo  TODO ranking!!!
        addComment: async (parent, { comment: { text, onText, score } }, { auth }) => {
            try {
                const userAuth = await context_1.getUser(auth);
                console.log(`userAuth in addComment`, userAuth);
                if (userAuth === null) {
                    return new apollo_server_express_1.AuthenticationError('UNAUTHORIZED');
                }
                try {
                    const owner = userAuth.id;
                    const newComment = new commentsModel_1.default({
                        owner: owner,
                        onText,
                        postDate: new Date().toISOString(),
                        text,
                        score,
                        display: true,
                    });
                    if (newComment === null) {
                        return new apollo_server_express_1.ApolloError('failed to post comment', '502');
                    }
                    const savedComment = await newComment.save();
                    if (savedComment === null) {
                        return new apollo_server_express_1.ApolloError('failed to save text', '503');
                    }
                    const datingText = await datingTextsModel_1.default.findOneAndUpdate({ _id: onText }, { $addToSet: { comments: savedComment._id } }, { useFindAndModify: false, new: true });
                    // console.log(`datingText`, datingText);
                    if (datingText === null) {
                        return new apollo_server_express_1.ApolloError('failed to save comment to dating text', '504');
                    }
                    const user = await usersModel_1.default.findOneAndUpdate({ _id: owner }, { $addToSet: { comments: savedComment._id } }, { useFindAndModify: false });
                    if (user === null) {
                        return new apollo_server_express_1.ApolloError('failed to save comment to user', '504');
                    }
                    return savedComment;
                }
                catch (err) {
                    console.log(`err`, err);
                    throw new apollo_server_express_1.ApolloError('Could not create new Comment', '500');
                }
            }
            catch (err) {
                return new apollo_server_express_1.AuthenticationError('UNAUTHORIZED');
            }
        },
        //* ---------------------------- !SECTION ADD COMMENT --------------------------- */
        //* ---------------------------- SECTION EDIT TEXT --------------------------- */
        // editDatingText: async (
        //   parent: any,
        //   args: { input: datingTextNs.editText }
        // ) => {
        //   try {
        //     const { text, xprivate, _id, display } = args.input;
        //     const editDT = datingTextModel.findByIdAndUpdate(
        //       { _id: _id },
        //       {
        //         $set: {
        //           text: text,
        //           private: xprivate,
        //           display: display,
        //         },
        //       },
        //       { useFindAndModify: false, new: true }
        //     );
        //     if (editDT === null) {
        //       return new ApolloError("failed to edit text", "502");
        //     }
        //     return editDT;
        //   } catch (err) {
        //     console.log(`err`, err);
        //     throw new ApolloError("Could not edit Text", "500");
        //   }
        // },
        //* ------------------------- END !SECTION EDIT TEXT ------------------------- */
    },
    //* ---------------------------- !SECTION Mutation --------------------------- */
};
