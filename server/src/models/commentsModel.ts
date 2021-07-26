import mongoose, { Schema, connect, Model } from "mongoose";
import { commentsNs } from "../@types/index";

const commentsSchema: Schema = new Schema({
  owner: { type: Schema.Types.ObjectId, required: true },
  postDate: { type: Date, required: true },
  onText: { type: Schema.Types.ObjectId, required: true },
  text: { type: String, required: true },
  score: { type: Number, required: true },
  display: { type: Boolean, required: true },
});
const commentsModel: Model<commentsNs.commentsSchemaData> = mongoose.model(
  "comment",
  commentsSchema
);
export default commentsModel;
