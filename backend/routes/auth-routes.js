const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const auth = require("../service/auth-service.js");
const User = require("../model/user.js");
const MsgService = require("../service/msg-service");
const Tokenservices = require("../service/token-service.js");
const router = express.Router();
const msgService = new MsgService();
const tokenService = new Tokenservices();
router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, userDetails, info) => {
    try {
      if (err || !userDetails) {
        const error = new Error("An error occurred.*******************");
        return next(error);
      }
      req.login(userDetails, { session: false }, async (error) => {
        if (error) return next(error);
        const user = await User.findById(userDetails._id);

        // console.log("userDetails=====*", userDetails);
        const token = jwt.sign({ userDetails }, "SECRET_KEY");
        // console.log("token===", token);
        return res.json({ Token: token, userId: user._id });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
