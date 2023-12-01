const mongoose = require("mongoose");
const crypto = require("crypto");
const Msgschema = mongoose.Schema({
  text: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
});

Msgschema.pre("save", async function (next) {
  try {
    const key = "SECRET_KEY";
    const cipher = crypto.createCipher("aes-256-cbc", key);
    let encryptedData = cipher.update(this.text, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    this.text = encryptedData;
    return next();
  } catch (error) {
    return next(error);
  }
});

Msgschema.methods.decrypt = function () {
  const key = "SECRET_KEY";
  const decipher = crypto.createDecipher("aes-256-cbc", key);
  let decryptedData = decipher.update(this.text, "hex", "utf-8");
  decryptedData += decipher.final("utf-8");

  this.text = decryptedData;
};
module.exports = mongoose.model("Messages", Msgschema);
