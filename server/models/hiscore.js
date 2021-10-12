const { Mongoose } = require("mongoose");

const scoreSchema = new Mongoose.Schema({
  score: {
    type: Number,
    required: true,
  }
});

const score = Mongoose.model("score", scoreSchema);
module.exports = score;
