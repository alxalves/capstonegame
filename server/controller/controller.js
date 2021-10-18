const express = require("express");
const router = express.Router();
const urlParser = express.urlencoded({ extended: false });
const { check, validationResult } = require('express-validator');


const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/" + "capstonegame";
const db = mongoose.connection;
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const bcrypt = require("bcrypt");
const user = require("../models/user");

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

router.post("/register", 
[
    check('username')
    .not()
    .isEmpty()
    .isLength({ min: 3})
    .withMessage('Username must be at least 3 characters long'),
    
    check('password', 'Password should be 5-10 characters long.')
    .not()
    .isEmpty()
    .isLength({ min: 5, max: 10})
],
    (req, res, next) => {
        const errs = validationResult(req);
        if(!errs.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        }
        else {
            bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = new userSchema({ 
                    username: req.body.username,
                    password: hash,
                    score: 0,
                })
            })
                user.save()
                .then((response) => {
                    res.status(201).json({ mesage: 'User created successfully', result: response });
                })
                .catch(error => {
                    res.status(500).json({
                        error: error
                })
            })

        }
    }
)

router.post("/login", (req, res, next) => {
    let u;
    userSchema.findOne({ username: req.body.username })
    .then(user => {
        if(!user) {
            return res.status(401).json({ message: "Authentication failed"});
        }

        u = user;

        return bcrypt.compare(req.body.password, user.password);
    })
    .then(response => {
        if(!response) {
            return res.status(401).json({ message: 'Authentication failed'})
        }

        let userToken = jwt.sign(
            {
                username: u.username,
                id: u._id,
                score: u.score
            },
                "batsecret", //changing this later
                { expiresIn: "1h" },
        );

        res.status(200).json({
            token: userToken,
            expiresIn: 3600,
            _id: u._id
        })
    })
    .catch(error => {
        return(res.status(401).json({
            message: "Authentication failed"
        }))
    })
})

module.exports = router