const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    highscore: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator, {message: 'Username must be unique.'});
const user = mongoose.model('user', userSchema);
module.exports = user