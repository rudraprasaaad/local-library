const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const path = require("path");
const indexRouter = require("./routes/index.js");
const usersRouter = require("./routes/users.js");
const catalogRouter = require("./routes/catalog.js");
const app = express();
const mongoose = require("mongoose");
const { MongoOIDCError } = require("mongodb");
mongoose.set("strictQuery", "false");
const mongoDB =
  "mongodb+srv://rudra:rudra@cluster0.hvlfmqf.mongodb.net/local_library";

main().catch((err) => console.log(err));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
const port = 3000;

app.use(express.json());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/catalog", catalogRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});

async function main() {
  await mongoose.connect(mongoDB);
}
module.exports = app;
