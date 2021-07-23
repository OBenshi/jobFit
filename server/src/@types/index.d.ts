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
/** @namespace UserNs a Namespace for user related types */
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

  interface comments {
    text: string;
    date: Date;
    user: ObjectId;
    onPost: ObjectId;
  }
  interface userSchemaData extends userProfile, Document {}
}
export namespace datingTextNs {
  interface datingText {
    text: string;
    score: number;
    postDate: Date;
    owner: ObjectId;
    comments: Array<ObjectId>;
    display: boolean;
    xprivate: boolean;
  }
  interface newText {
    text: string;
    postDate: Date;
    owner: ObjectId;
    xprivate: boolean;
  }
  interface editText {
    _id: ObjectId;
    text: string;
    display: boolean;
    xprivate: boolean;
  }
  /**
   *
   *
   * @interface datingTextSchemaData
   * @extends {datingText}
   * @extends {Document}{@link Document}
   */
  interface datingTextSchemaData extends datingText, Document {}
}
