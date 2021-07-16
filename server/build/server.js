"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file server file
 * @author FirstName LastName <optionalEmail@example.com>
 */
const express_1 = __importDefault(require("express"));
// import bodyParser from "body-parser";
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
const port = process.env.PORT || 5000;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(cors_1.default());
app.use("/users", require("./routes/users"));
app.listen(port, () => {
    console.log("Server is running on " + port + "port");
});
/**
 * @function bob
 * @summary takes two numbers and multiply the
 * @description sdkjaslkdjaslök
 * @tutorial {gettingstarteds} www.youtube.com
 * @param {number} x - first number
 * @param {number} y - the second number
 * @param {c} c callback
 * @return the result of x*y
 */
const bob = (x, y, c) => {
    return x * y;
};
bob(1, 2, console.log());
