import express from "express";
// import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/users", require("./routes/users"));
app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});
