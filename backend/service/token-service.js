const User = require("../model/user");
const jwt = require("jsonwebtoken");
class Tokenservices {
  async get(req, res, next) {
    // console.log("Token Service Request*********** :", req);
    const token = req;
    if (token) {
      const authheader = token.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        error: "Not Authorize",
      });
    }
    try {
      const authheader = token.split(" ")[1];
      const decodeToken = jwt.verify(authheader, "SECRET_KEY");
      const userId = decodeToken.userDetails._id;
      const user = await User.findById(userId);
      // console.log("extracted user frpm Token: ", user);
      if (!user) {
        return res.status(401).json({
          error: "User not found***",
        });
      }

      return user;
    } catch (error) {
      if (res) {
        return res.status(401).json({
          error: "Invalid Token..!",
        });
      } else {
        console.error("Error in TokenServices.get:", error);
      }
    }
  }
}

module.exports = Tokenservices;
