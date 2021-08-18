import {
  ApolloError,
  ApolloServer,
  AuthenticationError,
} from 'apollo-server-express';
import { commentsNs, datingTextNs, UserNs } from '../../@types';
import datingTextModel from '../../models/datingTextsModel';
import { ObjectID } from 'mongodb';
import userModel from '../../models/usersModel';
import commentsModel from '../../models/commentsModel';
import { getUser } from '../../context';
export const resolvers = {
  //* ---------------------------- // SECTION Query ---------------------------- */

  Query: {
    allComments: async () => {
      try {
        const comments = await datingTextModel.find({});
        return comments;
      } catch (err) {
        console.error('¡error! : ', err);
        throw new ApolloError('Error retrieving all comments', '500');
      }
    },
    aComment: async (parent, args: ObjectID) => {
      try {
        const comment = await commentsModel
          .findById(args)
          .populate({ path: 'owner' })
          .populate({ path: 'onText' });
        if (comment === null) {
          return new ApolloError('Comment not found', '204');
        }
        return comment;
      } catch (err) {
        console.log(`err`, err);
        return new ApolloError('Error finding Comment', '500');
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
    addComment: async (
      parent: any,
      { comment: { text, onText, score } },
      { auth }
    ) => {
      try {
        const userAuth = await getUser(auth);
        console.log(`userAuth in addComment`, userAuth);
        if (userAuth === null) {
          return new AuthenticationError('UNAUTHORIZED');
        }
        try {
          const owner = userAuth.id;
          const newComment: commentsNs.commentsSchemaData = new commentsModel({
            owner: owner,
            onText,
            postDate: new Date().toISOString(),
            text,
            score,
            display: true,
          });
          if (newComment === null) {
            return new ApolloError('failed to post comment', '502');
          }
          const savedComment = await newComment.save();

          if (savedComment === null) {
            return new ApolloError('failed to save text', '503');
          }
          const datingText = await datingTextModel.findOneAndUpdate(
            { _id: onText },
            { $addToSet: { comments: savedComment._id } },
            { useFindAndModify: false, new: true }
          );

          // console.log(`datingText`, datingText);
          if (datingText === null) {
            return new ApolloError(
              'failed to save comment to dating text',
              '504'
            );
          }
          const user = await userModel.findOneAndUpdate(
            { _id: owner },
            { $addToSet: { comments: savedComment._id } },
            { useFindAndModify: false }
          );
          if (user === null) {
            return new ApolloError('failed to save comment to user', '504');
          }
          return savedComment;
        } catch (err) {
          console.log(`err`, err);
          throw new ApolloError('Could not create new Comment', '500');
        }
      } catch (err) {
        return new AuthenticationError('UNAUTHORIZED');
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
