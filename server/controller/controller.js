const express = require("express");
const router = express.Router();
const urlParser = express.urlencoded({ extended: false });
const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/" + "capstonegame";
const db = mongoose.connection;
