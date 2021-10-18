const controller = require("./controller/controller.js")
const db = require("./db/db.js")
const express = require("express");
const app = express()
const cors = require('cors')
// const bodyParser = require('body-parser');

app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(cors());
app.use("/", controller)
const port = 3000;


app.listen(port, () => {
  console.log("yeesh");
});

