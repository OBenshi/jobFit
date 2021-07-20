// import { mongoURI } from "./config";
require("dotenv").config();
const mongoURI = require("./config.js").mongoURI;
import express from "express";
import cors from "cors";
import { connect } from "mongoose";
const app = express();
const port = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


connect(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connection to Mongo DB established"))
  .catch((err) => console.log(err));

app.use("/users", require("./routes/users"));

app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});
