import { Document, Model } from "mongoose";
export namespace user {
  interface userDetails {
    username: string;
    firstName: string;
    lastName: string;
    birthday: string;
    email: string;
    password: string;
    rank: number;
    avatar?: string;
    loggedIn: boolean;
  }
}
