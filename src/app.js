const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
require("dotenv").config();

const routes = require("./routes/routes");

const { DB_URL } = process.env;
mongoose.connect(DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { SESSION_SECRET } = process.env;
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/posts/:id", (req, res, next) => {
  req.postId = req.params.id;
  next();
});

app.use("/posts/:id/comments", routes.comments);
app.use("/posts", routes.posts);
app.use("/users", routes.users);
app.use("/", routes.index);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

module.exports = app;
