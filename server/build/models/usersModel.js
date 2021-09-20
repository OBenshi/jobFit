"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthday: { type: Date, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    rank: { type: Number, required: true },
    // avatar: { type: String, required: false },
    loggedIn: { type: Boolean, required: true },
    comments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "comment" }],
    datingTexts: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "datingText" }],
});
const userModel = mongoose_1.default.model("user", userSchema);
exports.default = userModel;
