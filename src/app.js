const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const cookies = require("cookie-parser");

require("dotenv").config();

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cors());

// SESSION CONFIG
app.use(
  session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: process.env.COOKIE_EXPIRE * 24 * 24 * 60 * 1000 }
  })
);
app.use(cookies());

// PASSPORTJS
// require("./passport/local")(passport);
app.use(passport.initialize());
app.use(passport.session());

// SERVER
app.listen(process.env.PORT || 3000, () => {
  console.log("[SERVER] Server started successfully 🚀");
});
