const passport = require("passport");
const User = require("../model/user.js");
const bcrypt = require("bcrypt");
class UserService {
  create(request, response) {
    const user = new User(request.body);
    user
      .save()
      .then((savedUser) => {
        response.json(savedUser);
      })
      .catch((error) => {
        console.error("Error saving user:", error);
        response.status(500).send(error);
      });
  }

  get(req, res) {
    User.find()
      .then((resp) => {
        // console.log("****", resp[0].password);
        res.send(resp);
      })
      .catch((err) => res.send(err));
    // console.log(req.body);
  }

  getbyid(req, res) {
    User.findById(req.params.id)
      .then((respond) => res.send(respond))
      .catch((error) => res.send(error));
    // console.log(req.body);
  }

  checkLogin(request, response) {
    const { user, password } = request.body;
    User.findOne({ user })
      .then(async (res) => {
        if (res) {
          const isPasswordValid = await res.isValidPassword(password);
          if (isPasswordValid) {
            response.status(200).send(res);
          } else {
            response.status(400).send("Invalid password.");
          }
        } else {
          response.status(401).send({ message: "Invalid userName" });
        }
      })
      .catch((err) => {
        console.error(err);
        response.status(500).send("Internal server error");
      });
  }

  update(req, res) {
    const userId = req.params.id;
    const updatedData = req.body;

    if (updatedData.password) {
      // Hash the new password before updating
      bcrypt.hash(updatedData.password, 10, (error, hash) => {
        if (error) {
          return res.status(500).send(error);
        }
        updatedData.password = hash;
        // Update the user with the hashed password
        User.findByIdAndUpdate(userId, updatedData, { new: true })
          .then((updatedUser) => {
            if (!updatedUser) {
              return res.status(404).json({ message: "User not found" });
            }
            return res.json(updatedUser);
          })
          .catch((err) => {
            console.error("Error:", err);
            res.status(500).send(err);
          });
      });
    }
  }

  delete(req, res) {
    // console.log(req.params);
    User.findByIdAndDelete(req.params.id)
      .then((resp) => res.send(resp))
      .catch((err) => res.send(err));
    // console.log(req.body);
  }
}
// User.post("/",async(req,res)=>{
//     const{user,password}=req.body
//     try {
//       const check=await collection.findById({user:user})
//       if(check){
//         res.json("exist")
//       }
//       else{
//         res.json("not exist")
//       }
//     } catch (e) {
//      res.json("notexist")
//     }
//   })

module.exports = UserService;
