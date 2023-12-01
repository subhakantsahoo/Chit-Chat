const router = require("express").Router();
const userrouter = require("./user-routes");
const authrouter = require("./auth-routes");
const msgrouter = require("./msg-routes");
// const tokenrouter = require("./token-routes");
router.use("/user", userrouter);
router.use("/auth", authrouter);
router.use("/msg", msgrouter);
// router.use("/token", tokenrouter);

module.exports = router;
