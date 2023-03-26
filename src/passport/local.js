const { PrismaClient } = require("@prisma/client");
const { Strategy } = require("passport-local");
const { compareHash, generateHash } = require("../utils");
const passport = require("passport");

require("dotenv").config();

const prisma = new PrismaClient();
const options = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true
};

module.exports = function (passport) {
  passport.use(
    "signup",
    new Strategy(options, async (req, email, password, done) => {
      try {
        const emailExists = await prisma.user.findFirst({ where: { email } });
        if (emailExists) {
          return done(null, false, {
            message: "Email already exists",
            statusCode: 400
          });
        }

        // create new user
        const user = await prisma.user.create({
          data: {
            name: req.body.name,
            email,
            password: await generateHash(password)
          }
        });

        return done(null, user);
      } catch (e) {
        console.error(e.message);
        return done(null, e);
      }
    })
  );

  options.passReqToCallback = false;
  passport.use(
    "login",
    new Strategy(options, async (email, password, done) => {
      try {
        const user = await prisma.user.findFirst({ where: { email } });
        if (!user) {
          return done(null, false, {
            message: "No user found",
            statusCode: 400
          });
        }

        // else compare hash and password
        const isValidPassword = await compareHash(password, user.password);
        if (!isValidPassword) {
          return done(null, false, {
            message: "Incorrect password",
            statusCode: 401
          });
        }

        return done(null, user);
      } catch (e) {
        console.error(e.message);
        return done(null, e);
      }
    })
  );
};
