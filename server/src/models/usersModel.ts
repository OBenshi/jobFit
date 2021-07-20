import { Schema, model, connect } from "mongoose";
import { User } from "../@types/index";

const userSchema = new Schema<User.userProfile>({
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthday: { type: Date, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  rank: { type: Number, required: true },
  avatar: { type: String, required: true },
  loggedIn: { type: Boolean, required: true },
});
const UserModel = model<User.userProfile>("User", userSchema);
