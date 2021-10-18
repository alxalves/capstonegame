const express = require("express");
const router = express.Router();
const urlParser = express.urlencoded({ extended: false });
const { check, validationResult } = require('express-validator');
const bodyParser = require('body-parser');

const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/" + "capstonegame";
const db = mongoose.connection;
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const bcrypt = require("bcrypt");
const userSchema = require("../models/user");

router.use(bodyParser.urlencoded({ extended: true}));

router.use(bodyParser.json());

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
        console.log(req.body);
        if (!errs.isEmpty()) {
          return res.status(422).jsonp(errs.array());
        } else {

        let un = req.body.username;
        let pw = req.body.password;
        // console.log(req.body);


          bcrypt.hash(req.body.password, 10).then((hash) => {
            const user = new userSchema({
              username: req.body.username,
              password: hash,
            });
            user
              .save()
              .then((response) => {
                res.status(201).json({
                  message: "User successfully created.",
                  result: response,
                });
              })
              .catch((error) => {
                res.status(500).json({
                  error: error,
                });
              });
          });
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
        res.status(401).json({
            message: "Authentication failed"
        })
    })
})

router.get('/user/:id', auth, (req, res) => {
    userSchema.findById(req.params.id, (error, data) => {
        if(error) {
            return(next(error));
        }
        else {
            res.status(200).json({ msg: data });
        }
    })
});

router.post('/score/update', auth, (req, res) => {
    userSchema.findByIdAndUpdate(req.params.id, {
        score: req.body.score
    },
        (error, data) => {
            if(error) {
                return(next(error))
            }
            else {
                res.json(data);
                console.log('user updated successfully');
            }
        }
    )
})
module.exports = router