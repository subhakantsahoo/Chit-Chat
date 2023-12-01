const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const Usermodel = require("../model/user.js");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { json } = require("express");
passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "user",
      passwordField: "password",
    },
    async (user, password, done) => {
      try {
        const Username = await Usermodel.findOne({ user });
        if (!Username) {
          return done(null, false, { message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, Username.password);
        if (!isMatch) {
          return done(null, false, { message: "Wrong Password" });
        }
        return done(null, JSON.parse(JSON.stringify(Username)), {
          message: "Logged in Successfully",
        });
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  new JWTstrategy(
    {
      secretOrKey: "SECRET_KEY",
      jwtFromRequest: () => ExtractJWT.fromAuthHeader("token"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
