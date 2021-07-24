const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");

const authenticationMiddleware = require("./services/authentication-middleware");

// Routes:
const indexRouter = require("./routes/index");

// Login routes:
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const createAccountRouter = require("./routes/createAccount");

// Users routes:
const usersRouter = require("./routes/users");
const addUserRouter = require("./routes/add-user");

// Movies routes:
const moviesRouter = require("./routes/movies");
const addMovieRouter = require("./routes/add-movie");

// Members routes:
const membersRouter = require("./routes/members");
// const addMemberRouter = require("./routes/add-member");

// Configs:
require("dotenv").config();

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

require("./configs/dataBase");

app.use(express.static(path.join(__dirname, "public")));

app.use(authenticationMiddleware);

app.use("/", indexRouter);

app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/create-account", createAccountRouter);

app.use("/users/add", addUserRouter);
app.use("/users", usersRouter);

app.use("/movies/add", addMovieRouter);
app.use("/movies", moviesRouter);

// app.use("/members/add", addMemberRouter);
app.use("/members", membersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
