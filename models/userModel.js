const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please insert email"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    Select: false,
  },
});
//hash password between getting data and saving it to db
userSchema.pre("save", async function (next) {
  //hash password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  //return true if passwords are the same
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
