"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
const UserModel = mongoose_1.model("User", userSchema);
