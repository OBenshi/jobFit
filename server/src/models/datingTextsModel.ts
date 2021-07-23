import mongoose, { Schema, connect, Model } from "mongoose";
import { datingTextNs } from "../@types/index";

const datingTextSchema: Schema = new Schema({
  owner: { type: Schema.Types.ObjectId, required: true },
  postDate: { type: Date, required: true },
  text: { type: String, required: true },
  score: { type: Number, required: true },
  display: { type: Boolean, required: true },
  private: { type: Boolean, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "comment" }],
});
const datingTextModel: Model<datingTextNs.datingTextSchemaData> =
  mongoose.model("datingText", datingTextSchema);
export default datingTextModel;
