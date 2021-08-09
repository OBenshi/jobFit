import mongoose, { Schema, connect, Model } from "mongoose";
import { commentsNs } from "../@types/index";

const commentsSchema: Schema = new Schema({
  owner: { type: Schema.Types.ObjectId, required: false },
  postDate: { type: Date, required: false },
  onText: { type: Schema.Types.ObjectId, required: false },
  text: { type: String, required: false },
  score: { type: Number, required: false },
  display: { type: Boolean, required: false },
});
const commentsModel: Model<commentsNs.commentsSchemaData> = mongoose.model(
  "comment",
  commentsSchema
);
export default commentsModel;
