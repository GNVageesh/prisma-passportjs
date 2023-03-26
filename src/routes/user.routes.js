const router = require("express").Router();
const { tokensGen } = require("../utils");
const passport = require("passport");

router.post("/signup", (req, res, next) => {
  passport.authenticate("signup", { session: false }, (err, user, info) => {
    if (err) throw new Error(err);

    const token = tokensGen(user.id);
    return res.status(201).json({
      status: "success",
      data: {
        message: "Account Created",
        user,
        token
      },
      statusCode: res.statusCode
    });
  })(req, res, next);
});

router.post("/login", (req, res, next) => {
  passport.authenticate("login", { session: false }, (err, user, info) => {
    if (err) throw new Error(err);

    const token = tokensGen(user.id);

    return res.status(201).json({
      status: "success",
      data: {
        message: "Welcome back!",
        user,
        token
      },
      statusCode: res.statusCode
    });
  })(req, res, next);
});

module.exports = router;
