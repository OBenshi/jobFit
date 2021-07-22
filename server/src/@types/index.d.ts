import { ObjectId } from "mongoose";
import { Document, Model } from "mongoose";

export namespace GeneralNs {
  interface Error {
    msg: string;
    code: number;
  }
  interface info {
    msg: string;
    code: number;
  }
}
/** @namespace UserNs */
export namespace UserNs {
  interface userProfile {
    // _id: ObjectId;
    username: string;
    firstName: string;
    lastName: string;
    birthday: string;
    email: string;
    password: string;
    rank: number;
    avatar?: string;
    loggedIn: boolean;
    datingTexts: Array<ObjectId>;
    comments: Array<ObjectId>;
  }
  interface newUser {
    username: string;
    firstName: string;
    lastName: string;
    birthday: string;
    email: string;
    password: string;
    // rank: number;
    avatar?: string;
    // loggedIn: boolean;
    // datingTexts: Array<ObjectId>;
    // comments: Array<ObjectId>;
  }
  interface logInInput {
    email: string;
    password: string;
  }
  interface logOutInput {
    _id: ObjectId;
  }

  interface userDatingText {
    text: string;
    date: Date;
    comments: Array<ObjectId>;
  }
  interface comments {
    text: string;
    date: Date;
    user: ObjectId;
    onPost: ObjectId;
  }
  interface userSchemaData extends userProfile, Document {}
}
