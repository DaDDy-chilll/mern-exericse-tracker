require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const port = process.env.PORT || 8000;
const url = process.env.MONGO_URL;
const connection = mongoose.connection;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.once("open", () => {
  console.log("Mongodb is connected");
});

connection.on("error", (error) => {
  console.log(error);
});

app.use(cors());
app.use(express.json());

const exerciesRouter = require("./routes/exercises.router");
const usersRouter = require("./routes/users.router");

app.use("/exercise", exerciesRouter);
app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.send("this is home page");
});

app.listen(port, () => {
  console.log(`server is running on port:${port}`);
});
