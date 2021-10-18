const express = require("express");
const router = express.Router();
const urlParser = express.urlencoded({ extended: false });
const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/" + "capstonegame";
const db = mongoose.connection;

router.get("/", (req, res) => {
    res.send("... Dinkleberg...")
})

router.get("/highscores", (req, res) => {
    let hs = [
      {
        username: "God",
        score: 696969,
      },
      {
        username: "Satan",
        score: 666666,
      },
      {
        username: "Alex",
        score: 55555,
      },
      {
        username: "Yo Mamma",
        score: 55554,
      },
      {
        username: "Daddy",
        score: 6620,
      },
      {
          username: "Test",
          score: 6601
      },
      {
          username: "Test2",
          score: 6601
      },
      {
          username: "Test3",
          score: 5999
      },
      {
          username: "Test4",
          score: 4888
      },
      {
          username: "Test5",
          score: 4333
      },
    ];

    res.json(hs);
})



module.exports = router