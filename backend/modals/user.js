const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your name"],

    maxlength: [100, "name never pass 100 characters"],
  },

  email: {
    type: String,
    required: [true, "please enter your email"],
    unique: true, // must be unique
    validate: [validator.isEmail, "please enter a validate email"],
  },
  password: {
    type: String,
    required: [true, "please enter your password"],

    minlength: [6, "passoword  must be longuer then 6 characters"],
    select: false,
  },
  avatar: {
    public_id: { type: String, required: false },
    url: {
      type: String,
      required: false,
    },
  },
  role: {
    type: String,
    default: "user",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  ressetPasswordToken: String,
  ressetPasswordExpire: Date,
});
// encrypting password before saving user :
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
// comparing user password :
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
// return jasonwebtoken :
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

module.exports = mongoose.model("User", userSchema);
