import { Schema, model, connect } from "mongoose";
import { UserNs } from "../@types/index";

const userSchema = new Schema({
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthday: { type: Date, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  rank: { type: Number, required: true },
  avatar: { type: String, required: true },
  loggedIn: { type: Boolean, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "comment" }],
  datingTexts: [{ type: Schema.Types.ObjectId, ref: "datingText" }],
});
const userModel = model("user", userSchema);
export default userModel;
