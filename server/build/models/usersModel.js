const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        unique: false,
    },
    lastName: {
        type: String,
        required: true,
        unique: false,
    },
    birthday: {
        type: Date,
        required: true,
        unique: false,
    },
    reviews: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "review" }],
    },
    own_parties: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "party" }],
    },
    loggedIn: {
        type: Boolean,
    },
});
module.exports = mongoose.model("user", userSchema);
