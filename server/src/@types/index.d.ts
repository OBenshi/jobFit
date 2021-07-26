import { ObjectID } from "mongodb";
// import { ObjectId } from "mongoose";
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
    datingTexts: Array<datingTextNs.datingText>;
    comments: Array<commentsNs.comment>;
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
    _id: ObjectID;
  }

  interface userSchemaData extends userProfile, Document {}
}
export namespace datingTextNs {
  interface datingText {
    text: string;
    score: number;
    postDate: Date;
    owner: ObjectID;
    comments: Array<ObjectID>;
    display: boolean;
    xprivate: boolean;
  }
  interface newText {
    text: string;
    postDate: Date;
    owner: ObjectID;
    xprivate: boolean;
  }
  interface editText {
    _id: ObjectID;
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

export namespace commentsNs {
  interface newComment {
    text: string;
    score: number;
    owner: ObjectID;
    onText: ObjectID;
  }
  interface comment extends newComment {
    display: boolean;
    postDate: Date;
  }
  interface commentsSchemaData extends comment, Document {}
}
