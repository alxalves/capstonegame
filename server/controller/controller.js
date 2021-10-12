const express = require("express");
const router = express.Router();
const urlParser = express.urlencoded({ extended: false });
const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/" + "capstonegame";
const db = mongoose.connection;

router.get("/", (req, res) => {
    res.send("I'm both respecting your privacy by knocking but asserting my authority as your father by coming in anyway!")
})



module.exports = router