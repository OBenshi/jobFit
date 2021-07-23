import mongoose, { Schema, connect, Model } from "mongoose";
import { UserNs } from "../@types/index";

const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthday: { type: Date, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  rank: { type: Number, required: true },
  avatar: { type: String, required: false },
  loggedIn: { type: Boolean, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "comment" }],
  datingTexts: [{ type: Schema.Types.ObjectId, ref: "datingText" }],
});
const userModel: Model<UserNs.userSchemaData> = mongoose.model(
  "user",
  userSchema
);
export default userModel;
