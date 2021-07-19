import { ObjectId } from "mongoose";

export namespace User {
  interface userProfile {
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
}
